import { BN } from "@coral-xyz/anchor";
import { useParams } from "react-router";
import { useCampaigns } from "./campaigns-data-access";
import { PublicKey } from "@solana/web3.js";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { MilestoneCard } from "./MilestoneCard";

type Status = {
  ongoing?: Record<string, never>;
  completed?: Record<string, never>;
  cancelled?: Record<string, never>;
};

type Milestone = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  status: Status;
};

export default function CampaignDetail() {
    
    const { publicKey } = useWallet()
    const { sponsor, id } = useParams()
  
    if (!sponsor || !id) return <div>Invalid campaign URL</div>
  
    const bnId = new BN(Number(id))
    const { getSingleCampaign, recordVote, useVoteReceipt } = useCampaigns({
      beneficiary: new PublicKey('4rAvATEgWMVGjrxiF1AiY6qn4SCCEg92EgURySVfxcP2'),
      id: bnId,
      sponsor: new PublicKey(sponsor),
    })
  
    const { data: campaign, isLoading, error } = getSingleCampaign
    if (isLoading) return <div>Loading campaign...</div>
    if (error) return <div>Error loading campaign: {(error as Error).message}</div>
    if (!campaign) return <div>Campaign not found</div>
  
    const sponsorPk = campaign.sponsor as PublicKey
    const milestones: Milestone[] = campaign.milestones as any
  
    const canVoteMilestone = (m: Milestone) => !!m.status?.ongoing && !!publicKey
  
    
  
    return (
      <div className="space-y-6">
        {/* ... campaign header ... */}
  
        <section className="space-y-4">
          <h2 className="text-xl font-medium">Milestones</h2>
          {milestones.map((m) => (
            <MilestoneCard key={m.order} milestone={m} sponsorPk={sponsorPk} publicKey={publicKey} recordVote={recordVote} canVoteMilestone={canVoteMilestone}  />
          ))}
        </section>
      </div>
    )
  }
