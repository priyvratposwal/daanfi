import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router";

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


export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
    const navigate = useNavigate();
    return (
        <div className="border border-gray-300 rounded-md p-4 cursor-pointer" onClick={() => {
            navigate(`/campaign/${campaign.sponsor}/${campaign.id}`);
        }}>
            <h1>Campaign Card</h1>
            <p>Sponsor: {campaign.sponsor}</p>
            <p>Total Amount: {campaign.totalAmount.toString()}</p>
            <p>Milestones: {campaign.milestones.map((milestone) => milestone.amount.toString()).join(', ')}</p>
        </div>
    )
}