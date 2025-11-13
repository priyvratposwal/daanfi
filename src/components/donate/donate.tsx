
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import BN from 'bn.js';
import { AppHeader } from '../app-header';
import { useDonate } from './donate-data-access';
import { Button } from '../ui/button';



export default function Donate() {
    const [treasuryBalance, setTreasuryBalance] = useState(0)
    const wallet = useWallet()
    const publicKey = wallet.publicKey
    const { initializeProgram, donate, getTreasuryBalance } = useDonate()
    const [donationInput, setDonationInput] = useState(0.5);
    
    // useEffect(() => {
    //     const fetchTreasuryBalance = async () => {
    //         const programId = getBasicProgramId(cluster.network as Cluster)
    //         const program = getBasicProgram(provider, programId)
        
        
    //     // PDAs
    //     const config = PublicKey.findProgramAddressSync(
    //         [Buffer.from('config')],
    //         program.programId
    //       )[0]
        
    //       const treasury = PublicKey.findProgramAddressSync(
    //         [Buffer.from('treasury'), config.toBuffer()],
    //         program.programId
    //       )[0]
        
    //         const balance = await connection.getBalance(treasury as PublicKey)
    //         setTreasuryBalance(balance)
    //     }
    //     fetchTreasuryBalance()
    // }, [connection, cluster, provider])

    useEffect(() => {
        console.log('getTreasuryBalance.data', getTreasuryBalance.data)
        if (getTreasuryBalance.data) {
            setTreasuryBalance(getTreasuryBalance.data / LAMPORTS_PER_SOL);
        }
    }, [getTreasuryBalance.data])

    if (!publicKey) {
        return <div>
            
               <AppHeader links={[{ label: 'Donate', path: '/donate' }]} />
                </div>
    }

    const handleDonate = () => {
        const amountInLamports = new BN(donationInput * LAMPORTS_PER_SOL);
        donate.mutate({ amount: amountInLamports });
    }

    const handleInitializeProgram = () => {
        initializeProgram.mutate();
    }

    // const handleDonate = async () => {
    //     const programId = getBasicProgramId(cluster.network as Cluster)
    //     const program = getBasicProgram(provider, programId)
    //     const donationAmount = new BN(LAMPORTS_PER_SOL * 0.5);
    //     const tx = await program.methods
    //   .donate(donationAmount)
    //   .accounts({
    //     donor: publicKey,
    //   })
    //   .rpc()
    // console.log('Donation transaction:', tx)
    // }

    // const initializeProgram = async () => {
    //     const programId = getBasicProgramId(cluster.network as Cluster)
    //     const program = getBasicProgram(provider, programId)
    //     const tx = await program.methods.initialize().rpc()
    //     console.log('Program initialized:', tx)
    // }
  return (
    <main className="grow container mx-auto p-4">
        <AppHeader links={[{ label: 'Donate', path: '/donate' }]} />


    {/* ... Initialize Button ... */}
    <Button onClick={handleInitializeProgram}>Initialize Program</Button>
    
    <h1 className="text-2xl font-bold mt-4">Donate</h1>
    
    {/* Input Field for Amount */}
    {/* <input 
        type="number" 
        step="0.01" 
        value={donationInput} 
        onChange={(e) => setDonationInput(parseFloat(e.target.value) || 0)}
        placeholder="SOL amount"
        className="border p-2 rounded block mb-4"
    /> */}
    
    <p>Treasury Balance: {treasuryBalance} SOL ~ (${treasuryBalance * 184.99} ~ ₹{treasuryBalance * 16457.52} // hardcoded values) </p>
    
    <Button 
        onClick={handleDonate}
        // Disable the button while the transaction is processing
        disabled={donate.isPending} 
        className="p-2 bg-green-500 text-white rounded mt-2"
    >
        {/* Dynamic Button Text */}
        {donate.isPending 
            ? 'Processing Donation...' 
            : `Donate ${donationInput} SOL`}
    </Button>
    
    {/* Optional: Show loading state */}
    {donate.isPending && <p>Waiting for transaction confirmation...</p>}
</main>
)
}