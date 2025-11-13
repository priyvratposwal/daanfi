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


export function useCampaigns({  id, sponsor }: { beneficiary: PublicKey, id: BN, sponsor: PublicKey }) {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const wallet = useWallet(); // Get wallet for PublicKey access
  const queryClient = useQueryClient() // For invalidating related queries
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBasicProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getBasicProgram(provider, programId), [provider, programId])

  const [config, configBump] = PublicKey.findProgramAddressSync([Buffer.from("config")], program.programId)

  const pdaForCampaign = (sp: PublicKey, id: BN) =>
    PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), config.toBuffer(), sp.toBuffer(), id.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )[0];




const idStr = useMemo(() => (id ? id.toString() : ''), [id])
const sponsorStr = useMemo(() => (sponsor ? sponsor.toBase58() : ''), [sponsor])






  const totalAmount = new BN(6000)
  const title = 'Test Campaign'
  const description = 'This is a test campaign'

    // const milestones = [
    //   { id: new BN(1), amount: new BN(2000), order: 0, totalVotes: new BN(0), totalAgreedVotes: new BN(0), totalDisagreedVotes: new BN(0), status: { ongoing: {} } },
    //   { id: new BN(2), amount: new BN(2000), order: 1, totalVotes: new BN(0), totalAgreedVotes: new BN(0), totalDisagreedVotes: new BN(0), status: { ongoing: {} } },
    //   { id: new BN(3), amount: new BN(2000), order: 2, totalVotes: new BN(0), totalAgreedVotes: new BN(0), totalDisagreedVotes: new BN(0), status: { ongoing: {} } },
    // ]

    const formMilestones = (totalAmount: BN) => {
      const total = totalAmount.toNumber();
      const base = Math.floor(total / 3);
      const remainder = total - base * 2; // ensures total == sum of 3
    
      const amounts = [base, base, remainder]; // last milestone gets the remainder

      console.log(amounts);
    
      return amounts.map((amt, index) => ({
        id: new BN(index + 1),
        amount: new BN(amt),
        order: index,
        totalVotes: new BN(0),
        totalAgreedVotes: new BN(0),
        totalDisagreedVotes: new BN(0),
        status: index === 0 ? { ongoing: {} } : { pending: {} },
      }));
    };


  const getCampaigns = useQuery({
    queryKey: ['campaigns', { cluster }],
    queryFn: () => program.account.campaign.all(),
    enabled: !!program,
  })

  const getSingleCampaign = useQuery({
    queryKey: ['campaign', { cluster, id: idStr, sponsor: sponsorStr }],
    queryFn: async () => {
      //     if (!sponsor) {
      //         throw new Error("Wallet must be connected to fetch single campaign.");
      //     }

      // // 1. Derive the specific Campaign PDA address
      // const [campaignKey] = PublicKey.findProgramAddressSync(
      //     [
      //         Buffer.from("campaign"), 
      //         config.toBuffer(), 
      //         sponsor.toBuffer(), // Assuming sponsor's key is used in PDA seeds
      //         id.toArrayLike(Buffer, 'le', 8) // Campaign ID used as a unique seed
      //     ], 
      //     program.programId
      // );

      const campaignPda = pdaForCampaign(sponsor, id);
      try {
        return await program.account.campaign.fetch(campaignPda);
      } catch (e: any) {
        // Gracefully show "not found" instead of a hard error
        if (/Account does not exist/i.test(e?.message)) return null;
        throw e;
      }

      // 2. Use Anchor's .fetch() method to retrieve the single account data



      // return program.account.campaign.fetch(campaignKey);


    },



    // Only run the query if the ID is valid (non-zero) and the sponsor key is present
    enabled: !!program && !!id.toNumber() && !!sponsor,
    retry: false,


  })

  const createCampaign = useMutation({

    mutationKey: ['create-campaign', { cluster }],
    mutationFn: ({ title, description, totalAmount, beneficiary }: { title: string, description: string, totalAmount: BN, beneficiary: PublicKey }) =>{
      const milestones = formMilestones(totalAmount);
      const id = new BN(Math.floor(Math.random() * 1000000));
      return program.methods.createCampaign(id, totalAmount, milestones, beneficiary, title, description).accounts({
        sponsor: wallet.publicKey as PublicKey,
      }).rpc();
    },
    onSuccess: () => {
      console.log("campaign created successfully");
      queryClient.invalidateQueries({ queryKey: ['campaigns', { cluster }] })
    },
    onError: (error) => {
      toast.error(error.message)
      console.log("campaign creation failed",error);
    },
  })

  const recordVote = useMutation({
    mutationKey: ['record-vote', { cluster }],
    mutationFn: async ({ milestoneIndex, isAgreed, sponsor }: { milestoneIndex: number; isAgreed: boolean, sponsor: PublicKey }) => {


      const [campaignPda, campaignBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("campaign"), config.toBuffer(), sponsor.toBuffer(), id.toArrayLike(Buffer, 'le', 8)],
        program.programId
      );

      console.log(campaignPda.toBase58());

      const [userProfilePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("user_profile"), config.toBuffer(), sponsor.toBuffer()],
        program.programId
      );



      return program.methods
        .recordVote(milestoneIndex, isAgreed)
        .accountsPartial({
          voter: wallet.publicKey as PublicKey,
          campaign: campaignPda,

        })
        .rpc();
    },
    onSuccess: () => {
      toast.success('Vote recorded successfully');
      queryClient.invalidateQueries({ queryKey: ['campaign', { cluster, id: idStr }] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', { cluster }] });
    },
    onError: (error: any) => console.log(error),
  });



   // ❗ Turn vote-receipt into a per-milestone hook
   const useVoteReceipt = (milestoneIndex: number) => {
    const voter = wallet.publicKey // the connected wallet

    return useQuery({
      queryKey: [
        'vote-receipt',
        {
          cluster,
          id: idStr,
          sponsor: sponsorStr,
          voter: voter?.toBase58() ?? '',
          milestoneIndex,
        },
      ],
      queryFn: async () => {
        if (!voter) throw new Error('Wallet not connected')
        const campaignKey =  pdaForCampaign(sponsor, id)
        const voteReceiptPda = PublicKey.findProgramAddressSync(
          [
            Buffer.from('vote_reciept'),
            config.toBuffer(),
            voter.toBuffer(),           // voter
            campaignKey.toBuffer(),     // campaign identity
            Buffer.from(Uint8Array.of(milestoneIndex)), // u8 (order/index you use on-chain)
          ],
          program.programId
        )[0]
        try {
          return await program.account.voteReciept.fetch(voteReceiptPda)
        } catch (e: any) {
          if (/Account does not exist/i.test(e?.message)) return null
          throw e
        }
      },
      enabled:
        !!program &&
        !!wallet.publicKey &&
        !!id?.toNumber?.() &&
        !!sponsor &&
        milestoneIndex >= 0,
      retry: false,
      staleTime: 15_000,
    })
  }

  const completeMilestone = useMutation({

    mutationKey: ['complete-milestone', { cluster }],
    mutationFn: async ({ milestoneIndex, id, sponsor, beneficiary }: { milestoneIndex: number, id: BN, sponsor: PublicKey, beneficiary: PublicKey }) => {
      const campaignPda = pdaForCampaign(sponsor, id);
      console.log("campaignPda", campaignPda.toBase58());
      const [treasuryPda, treasuryBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("treasury"), config.toBuffer()],
        program.programId
      );
      console.log("beneficiary", beneficiary.toBase58());
      
      return program.methods.completeMilestone(milestoneIndex).accountsStrict({
        sponsor: sponsor,
        beneficiary: beneficiary,
        campaign: campaignPda,
        config: config,
        treasury: treasuryPda,
        systemProgram: SystemProgram.programId,
      }).rpc();
    },
    onSuccess: async () => {
      
      console.log("milestone completed successfully");
      toast.success('Milestone completed successfully');
      queryClient.invalidateQueries({ queryKey: ['campaign', { cluster, id: idStr }] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', { cluster }] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("milestone completion failed",error);
    },
    
  });

  return {
    createCampaign,
    recordVote,
    useVoteReceipt,
    completeMilestone,
    getCampaigns,
    getSingleCampaign,
  }
}