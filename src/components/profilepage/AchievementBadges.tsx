import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap, Crown, Star, Award } from "lucide-react";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const BadgeCard = ({
  icon: Icon,
  title,
  description,
  rarity,
  unlocked = true,
}: {
  icon: any;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked?: boolean;
}) => {
  const rarityColors = {
    common: "from-lime-300 to-lime-400",      // soft green
    rare: "from-emerald-400 to-lime-500",     // bright balanced
    epic: "from-green-500 to-emerald-600",    // deeper tone
    legendary: "from-lime-400 to-emerald-500", // premium green glow
  };

  const rarityBadge = {
    common: "bg-lime-100 text-lime-700 border border-lime-300",
    rare: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    epic: "bg-green-100 text-green-700 border border-green-300",
    legendary: "bg-gradient-to-r from-lime-300 to-emerald-300 text-emerald-800 border border-lime-400",
  };

  return (
    <Card
      className={`bg-white/80 border border-lime-200 rounded-2xl p-6 group hover:scale-105 hover:shadow-md transition-all duration-300 ${
        !unlocked ? "opacity-60 grayscale" : ""
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`p-4 rounded-2xl bg-gradient-to-br ${rarityColors[rarity]} ${
            unlocked ? "shadow-lg" : ""
          } transition-shadow group-hover:shadow-2xl`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-neutral-800">{title}</h4>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
        <Badge className={'${rarityBadge[rarity]} rounded-full px-3 py-1 text-xs font-medium'}>
          {rarity.toUpperCase()}
        </Badge>
      </div>
    </Card>
  );
};

export const AchievementBadges = ({reputationScore, totalDonations}: {reputationScore: number, totalDonations:  BN}) => {
  // const totalDonationsInSOL = totalDonations.div(LAMPORTS_PER_SOL).toNumber();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-1">Achievements</h2>
          <p className="text-neutral-600">28 / 50 Badges Unlocked</p>
        </div>
        <div className="bg-lime-50 border border-lime-200 px-6 py-3 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm text-neutral-500">Reputation Score</p>
          <p className="text-2xl font-bold text-emerald-700">{reputationScore} </p>
        </div>
      </div>

      {/* Level Progress */}
      {/* <Card className="bg-white/70 border border-lime-200 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">Level 15</span>
          <span className="text-sm text-neutral-500">84% to Level 16</span>
        </div>
        <div className="w-full h-3 bg-lime-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 rounded-full transition-all duration-500"
            style={{ width: "84%" }}
          />
        </div>
      </Card> */}

      {/* Unlocked Badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <BadgeCard
          icon={Crown}
          title="First Blood"
          description="Made your first donation"
          rarity="legendary"
        />
        <BadgeCard
          icon={Trophy}
          title="Generous Giver"
          description="Donated over 10 ETH"
          rarity="epic"
        />
        <BadgeCard
          icon={Zap}
          title="Lightning Fast"
          description="Made 10 donations in 24h"
          rarity="rare"
        />
        <BadgeCard
          icon={Target}
          title="Sharpshooter"
          description="Supported 25+ causes"
          rarity="epic"
        />
        <BadgeCard
          icon={Star}
          title="Rising Star"
          description="Reached Level 10"
          rarity="rare"
        />
        <BadgeCard
          icon={Award}
          title="Community Champion"
          description="Invited 5 friends"
          rarity="common"
        />
      </div>

      {/* Locked (Upcoming) Badges */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-800">Next Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BadgeCard
            icon={Trophy}
            title="Diamond Hands"
            description="Donate 50 ETH total"
            rarity="legendary"
            unlocked={false}
          />
          <BadgeCard
            icon={Zap}
            title="Speed Demon"
            description="100 donations in 1 month"
            rarity="epic"
            unlocked={false}
          />
          <BadgeCard
            icon={Crown}
            title="Philanthropist"
            description="Support 100 causes"
            rarity="legendary"
            unlocked={false}
          />
          <BadgeCard
            icon={Star}
            title="Level 20"
            description="Reach level 20"
            rarity="epic"
            unlocked={false}
          />
        </div>
      </div>
    </div>
  );
};