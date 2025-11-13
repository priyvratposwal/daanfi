import { getBasicProgram, getBasicProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, PublicKey, SystemProgram } from '@solana/web3.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { useTransactionToast } from '@/components/use-transaction-toast'
import { toast } from 'sonner'
import { useAnchorProvider } from '@/components/solana/use-anchor-provider.tsx'
import BN from 'bn.js' // Assuming BN is needed for campaign/donation amounts
import axios from 'axios'


export function useDonate() {
    const { connection } = useConnection()
  const { cluster } = useCluster()
  const wallet = useWallet(); // Get wallet for PublicKey access
  const queryClient = useQueryClient() // For invalidating related queries
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBasicProgramId(cluster.network as Cluster), [cluster])
  
  // Cast to your program's type (replace 'Basic' with your actual program type if different)
  const program = useMemo(() => getBasicProgram(provider, programId), [provider, programId])
  


  const [config, configBump] = PublicKey.findProgramAddressSync([Buffer.from("config")], program.programId)
  const [treasury, treasuryBump] = PublicKey.findProgramAddressSync([Buffer.from("treasury"), config.toBuffer()], program.programId)

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

    // 1. Initialize Program (Creates config and treasury accounts)
  const initializeProgram = useMutation({
    mutationKey: ['daanfi', 'initialize', { cluster }],
    mutationFn: () => program.methods
        .initialize()
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      toast.success('Program initialized successfully!')
      queryClient.invalidateQueries({ queryKey: ['daanfi', 'initialized'] })
    },
    onError: (error) => {
      toast.error('Failed to initialize program.')
      console.error('Initialize Error:', error)
    },
  })

  const getTreasuryBalance = useQuery({
    queryKey: ['daanfi', 'treasury-balance', { cluster, treasury: treasury.toBase58() }],
    queryFn: () => connection.getBalance(treasury),
    // You might want to enable refreshing or set a stale time:
    staleTime: 5000, // Data considered fresh for 5 seconds
    enabled: !!treasury, // Only run the query if the treasury PDA is derived
  })

  const donate = useMutation({
    mutationKey: ['daanfi', 'donate', { cluster }],
    mutationFn: ({ amount }: { amount: BN }) => program.methods
        .donate(new BN(amount))
        .accounts({
            donor: wallet.publicKey as PublicKey,
        })
        .rpc(),


    onSuccess: async (signature, {amount}: {amount: BN}) => {
      try {
        console.log("amount", amount.toString())
     const response = await axios.post('http://localhost:3000/api/transactions/create', {
      walletAddress: wallet.publicKey?.toBase58(),
      amount: Number(amount.toString()),
      transactionType: 'in',
      transactionSignature: signature,
     })
     if (!response.data) {
      throw new Error('Failed to create transaction')
     }

        
      
      transactionToast(signature)
      toast.success('Donation successful!')
      queryClient.invalidateQueries({ queryKey: ['daanfi', 'treasury-balance'] })
    } catch (error) {
      toast.error('Failed to create transaction')
      console.error('Transaction creation error:', error)
    }
  },
    onError: (error) => {
      toast.error('Failed to donate.')
      console.error('Donate Error:', error)
    },
  })


  return {
    program,
    programId,
    configPda: config,
    treasuryPda: treasury,
    getProgramAccount,
    initializeProgram,
    donate,
    getTreasuryBalance,
  }
}