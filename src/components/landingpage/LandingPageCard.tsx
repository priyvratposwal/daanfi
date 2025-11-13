import React from 'react';
import { Card } from '@/components/ui/card';

interface LandingPageCardProps {
  text?: string;
  icon?: React.ReactNode;
}

export default function LandingPageCard({ 
  text ,
  icon = (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Smile curve */}
      <path
        d="M14 26C14 26 17 32 24 32C31 32 34 26 34 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left apostrophe */}
      <path
        d="M15 14L17 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Middle apostrophe */}
      <path
        d="M20 12L22 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Right apostrophe */}
      <path
        d="M25 14L27 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}: LandingPageCardProps) {
  return (
    <Card className="bg-gray-900 text-white p-8 rounded-[2rem] border-0 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold leading-tight">
          {text}
        </h3>
      </div>
    </Card>
  );
}