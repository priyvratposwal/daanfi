import { TrendingUp, Users, Sparkles, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  gradient,
}: {
  icon: any;
  label: string;
  value: string;
  subtext?: string;
  gradient: string;
}) => (
  <Card className="bg-white/80 backdrop-blur-sm border border-lime-200 p-6 rounded-2xl shadow-sm hover:shadow-md group hover:scale-105 transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className={"p-3 rounded-xl ${gradient} group-hover:shadow-lg transition-shadow"}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-neutral-800">{value}</p>
        {subtext && (
          <p className="text-xs text-neutral-500 mt-1">{subtext}</p>
        )}
      </div>
    </div>
  </Card>
);

export const DonationSummary = () => {
  return (
    <div className="space-y-8">
      {/* Section Heading */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-2">Donation Impact</h2>
        <p className="text-neutral-600">
          Your contributions are making a real difference 💚
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Heart}
          label="Total Donations"
          value="12.5 ETH"
          subtext="≈ $24,375 USD"
          gradient="bg-gradient-to-br from-lime-400 to-emerald-500"
        />
        <StatCard
          icon={Users}
          label="Causes Supported"
          value="27"
          subtext="Across 12 countries"
          gradient="bg-gradient-to-br from-emerald-400 to-lime-500"
        />
        <StatCard
          icon={Sparkles}
          label="Impact Points"
          value="8,420"
          subtext="Level 15 • Top 5%"
          gradient="bg-gradient-to-br from-lime-300 to-emerald-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Real-World Impact"
          value="1,240"
          subtext="Meals funded 🍱"
          gradient="bg-gradient-to-br from-emerald-400 to-lime-400"
        />
      </div>

      {/* Additional Impact Metrics */}
      <Card className="bg-lime-50/50 border border-lime-200 p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">
          Breaking Down Your Impact
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">450</p>
            <p className="text-xs text-neutral-500">Trees Planted 🌳</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-lime-600">85</p>
            <p className="text-xs text-neutral-500">Students Educated 📚</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-700">320</p>
            <p className="text-xs text-neutral-500">Vaccines Provided 💉</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-lime-700">15</p>
            <p className="text-xs text-neutral-500">Water Wells Built 💧</p>
          </div>
        </div>
      </Card>
    </div>
  );
};