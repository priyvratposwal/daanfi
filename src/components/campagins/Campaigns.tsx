// src/components/Campaigns.tsx

import { useWallet } from '@solana/wallet-adapter-react';
import { useCampaigns } from './campaigns-data-access';
import { useState } from 'react'; // Keep useState if used elsewhere, though not visible here
import BN from 'bn.js';
import { CampaignCard } from './CampaignCard';
import { Button } from '../ui/button';
import { PublicKey } from '@solana/web3.js';

// Define the structure of the data returned by Anchor's ProgramAccount
type AnchorMilestoneData = {
    id: BN;
    amount: BN;
    order: number;
    totalVotes: BN;
    totalAgreedVotes: BN;
    totalDisagreedVotes: BN;
    status: { ongoing?: {}; completed?: {}; cancelled?: {}; }; // Must match Anchor's return type
}

type AnchorProgramAccount = {
    account: {
        id: BN;
        sponsor: PublicKey;
        totalAmount: BN;
        milestones: AnchorMilestoneData[];
        beneficiary: PublicKey;
    }
}

// Your clean display type (using the imported Status type)
type Status = {
    ongoing?: Record<string, never>;
    completed?: Record<string, never>;
    cancelled?: Record<string, never>;
}

type Milestone = {
    id: BN;
    amount: BN;
    order: number;
    totalVotes: BN;
    totalAgreedVotes: BN;
    totalDisagreedVotes: BN;
    isCompleted: boolean;
    status: Status;
}

export type Campaign = {
    id: BN;
    sponsor: string;
    totalAmount: BN;
    milestones: Milestone[];
    beneficiary: string;
}
export const Campaigns = () => {
    const [id, setId] = useState(new BN(1))
    const wallet = useWallet()
    const publicKey = wallet.publicKey
    
    // NOTE: Hardcoded beneficiary key is used here. In production, this should be dynamic input.
    const { getCampaigns, createCampaign } = useCampaigns({beneficiary: new PublicKey("4rAvATEgWMVGjrxiF1AiY6qn4SCCEg92EgURySVfxcP2"), id: id, sponsor: publicKey as PublicKey});
    if (!publicKey) {
        return <div>Connect your wallet to view campaigns</div>;
    }
    const { data: campaigns, isLoading, error } = getCampaigns; 

    // Handle initial loading and error states
    if (isLoading) {
        return <div>Loading campaigns...</div>;
    }

    if (error) {
        return <div>Error loading campaigns: {error.message}</div>; 
    }
    
    // --- Data Mapping and Transformation ---
    const campaignList: Campaign[] = (campaigns as AnchorProgramAccount[] || [])
    .map(programAccount => ({
        id: programAccount.account.id,
        totalAmount: programAccount.account.totalAmount,
        
        // 🔑 Map Milestones: Extracting data and deriving 'isCompleted'
        milestones: programAccount.account.milestones.map(milestone => ({
            id: milestone.id,
            amount: milestone.amount,
            order: milestone.order,
            totalVotes: milestone.totalVotes,
            totalAgreedVotes: milestone.totalAgreedVotes,
            totalDisagreedVotes: milestone.totalDisagreedVotes,
            
            // FIX: Simplifies boolean check based on the completed variant's presence
            isCompleted: !!milestone.status.completed, 
            
            // Use of 'unknown' is necessary here to map the dynamic JS object back to the static TS type
            status: milestone.status as unknown as Status, 
        })),
        beneficiary: programAccount.account.beneficiary.toBase58(),
        sponsor: programAccount.account.sponsor.toBase58(), 
    }));

    // console.log(campaignList); // Enable if you need to debug the final structure

    const handleCreateCampaign = () => {
        // Automatically disables button if creation is pending (via disabled={createCampaign.isPending})
        createCampaign.mutate();
        if (createCampaign.isSuccess) {
            setId(id.add(new BN(1)));
        }
    }
    
    return (
        <div>
            <h1>Campaigns</h1>
            <Button 
                onClick={handleCreateCampaign}
                // Good practice: disable button while a transaction is pending
                disabled={createCampaign.isPending} 
            >
                {createCampaign.isPending ? "Creating..." : "Create Campaign"}
            </Button>
            
            {campaignList.length === 0 && (
                <p>No campaigns found. Be the first to create one!</p>
            )}

            <div className='flex flex-col gap-4'>
                {campaignList.map((campaign, idx) => (
                    <CampaignCard key={idx} campaign={campaign} />
                ))}
            </div>
        </div>
    );
};