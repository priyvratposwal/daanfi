import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileHeader = ({walletAddress}: {walletAddress: string,}) => {
  const [copied, setCopied] = useState(false);
  
  const ensName = "jatin.eth";

  const handleCopy = () => {
    navigator.clipboard.writeText("0xA2f8C9B7E3D5F6A1B8C4D9E2F7A3B8C6D1E5F9A2");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 shadow-lg bg-gradient-to-br from-white via-lime-50 to-lime-100">
      {/* Soft lime background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-200/40 to-white/50 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-300 to-emerald-400 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
          <Avatar className="relative w-32 h-32 border-4 border-lime-400/60 shadow-md">
            <AvatarImage 
              src="/api/placeholder/128/128" 
              alt="Profile Avatar"
            />
            <AvatarFallback className="text-2xl font-bold bg-lime-200 text-neutral-800">
              {ensName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-2">
              {ensName}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-600 font-mono text-sm">
              <span>{walletAddress}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-lime-200/50"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3 text-neutral-700" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-lime-200/50"
                asChild
              >
                <a
                  href={'https://etherscan.io/address/0xA2f8C9B7E3D5F6A1B8C4D9E2F7A3B8C6D1E5F9A2'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3 text-neutral-700" />
                </a>
              </Button>
            </div>
          </div>

          {/* SBT Badges */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Badge className="bg-lime-200 text-neutral-800 border-lime-400 hover:bg-lime-300 transition">
              🏆 Verified Donor
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 transition">
              ⚡ DAO Member
            </Badge>
            <Badge className="bg-lime-100 text-emerald-700 border-lime-300 hover:bg-lime-200 transition">
              🌟 Impact Pioneer
            </Badge>
            <Badge className="bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200 transition">
              🔗 DID: ceramic://...
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};