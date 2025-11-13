import React from 'react';
import { Card } from '@/components/ui/card';
import { Smile, Heart, Sun } from 'lucide-react';

interface LandingPageSecondsectionProps {
  id?: string;
}

export default function LandingaPageSecondSection({ id }: LandingPageSecondsectionProps) {
  const features = [
    {
      icon: Smile,
      title: "Give Happiness",
      description: "Giving happiness to others is one of the most fulfilling things you can do in life."
    },
    {
      icon: Heart,
      title: "Share Love",
      description: "When you share love with those around you, you create a ripple effect of kindness."
    },
    {
      icon: Sun,
      title: "Build Socially",
      description: "Building socially requires not just connecting with others, but also actively contributing."
    }
  ];

  return (
    <section id={id}>
        <Card className="w-full max-w-[1200px] mx-auto bg-lime-200 p-12 rounded-3xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
        Fundraising on DaanFi takes<br />just a few minutes
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <feature.icon className="w-12 h-12 text-gray-800" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-700 rounded transform rotate-12"></div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h2>
            
            <p className="text-gray-700 text-base leading-relaxed max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
    </section>
  );
};

