import { Button } from "../ui/button";
import type { PublicKey } from "@solana/web3.js";
import type { BN } from "@coral-xyz/anchor";
import { toast } from "sonner";

export type Status = {
  ongoing?: Record<string, never>;
  completed?: Record<string, never>;
  cancelled?: Record<string, never>;
};

export type Milestone = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  status: Status;
};

type MilestoneCardProps = {
  milestone: Milestone;
  sponsorPk: PublicKey;
  publicKey: PublicKey | null;
  recordVote: any; // from your mutation
  canVoteMilestone: (m: Milestone) => boolean;
  alreadyVoted?: boolean;
  receiptLoading?: boolean;
};

export function MilestoneCard({
  milestone: m,
  sponsorPk,
  publicKey,
  recordVote,
  canVoteMilestone,
  alreadyVoted = false,
  receiptLoading = false,
}: MilestoneCardProps) {
  const ongoing = !!m.status?.ongoing;

  const handleVote = (isAgreed: boolean) => {
    if (!publicKey) {
      toast.error("Connect wallet to vote");
      return;
    }
    if (!m?.status?.ongoing) {
      toast.error("This milestone is not open for voting");
      return;
    }
    const t = toast.loading(isAgreed ? "Casting YES vote..." : "Casting NO vote...");
    recordVote.mutate(
      { milestoneIndex: m.order, isAgreed, sponsor: sponsorPk },
      {
        onSuccess: () => toast.success("Vote recorded", { id: t }),
        onError: (e: any) => toast.error(e?.message ?? "Failed to record vote", { id: t }),
      }
    );
  };

  return (
    <div className="rounded-xl border p-4 flex items-center justify-between">
      <div className="space-y-1">
        <div className="font-medium">Milestone #{m.order}</div>
        <div>Amount: {m.amount.toString()}</div>
        <div>Votes: {m.totalVotes.toString()}</div>
        <div>
          Agreed: {m.totalAgreedVotes.toString()} | Disagreed: {m.totalDisagreedVotes.toString()}
        </div>
        <div>
          Status:{" "}
          {ongoing
            ? "Ongoing"
            : m.status?.completed
            ? "Completed"
            : m.status?.cancelled
            ? "Cancelled"
            : "Unknown"}
        </div>
        {alreadyVoted && (
          <div className="text-sm text-muted-foreground">
            You voted {alreadyVoted ? "Yes ✅" : "No ❌"}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => handleVote(true)}
          disabled={!canVoteMilestone(m) || recordVote.isPending || alreadyVoted || receiptLoading}
        >
          Vote Yes
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleVote(false)}
          disabled={!canVoteMilestone(m) || recordVote.isPending || alreadyVoted || receiptLoading}
        >
          Vote No
        </Button>
      </div>
    </div>
  );
}
