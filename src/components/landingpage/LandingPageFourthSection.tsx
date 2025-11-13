import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const LandingPageFourthSection = (id:any) => {
  const [count, setCount] = useState(120859);

  // Animate counter on mount
  useEffect(() => {
    const targetCount = 120859;
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
  <section id={id}>
      <div className="relative w-full bg-white overflow-hidden font-sans">
      {/* Main Content Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[500px] px-4 py-12">
        {/* Profile Images - Top Left */}
        <div className="absolute top-8 left-4 md:left-16">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&h=120&fit=crop&crop=faces"
            alt="Community member"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover grayscale"
          />
        </div>

        {/* Profile Images - Middle Left */}
        <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=120&h=120&fit=crop&crop=faces"
            alt="Community member"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover grayscale"
          />
        </div>

        {/* Profile Images - Top Right */}
        <div className="absolute top-12 right-4 md:right-16">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
            alt="Community member"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover grayscale"
          />
        </div>

        {/* Profile Images - Middle Right */}
        <div className="absolute top-1/2 right-8 md:right-20 translate-y-1/4">
          <img
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=120&h=120&fit=crop&crop=faces"
            alt="Community member"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover grayscale"
          />
        </div>

        {/* Center Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-6 leading-relaxed tracking-normal">
            Join our community for donating and be a part<br />
            of a positive change in the world. With over:
          </h2>

          <div className="mb-4">
            <div className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
              {formatNumber(count)}+
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6 tracking-normal">
            people already joining
          </p>

         
        </div>
      </div>

      {/* Bottom Diagonal Banner */}
      <div className="relative w-full h-32 overflow-hidden bg-white">
        {/* Dark Green Stripe */}
        <div className="absolute inset-0 bg-green-900 origin-top-left -skew-y-3 ">
          <div className="flex items-center justify-center h-full skew-y-3 -translate-y-6">
            <div className="scrolling-text-container">
             
            </div>
          </div>
        </div>

        {/* Light Green Stripe */}
        <div className="absolute inset-0 text-white bg-lime-200 origin-top-left -skew-y-3 translate-y-25">
          <div className="flex items-center text-white justify-center h-full skew-y-3 -translate-y-16">
            <div className="scrolling-text-container text-white">
              <div className="scrolling-text text-black font-bold">
                <span >* let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                {/* Duplicate for seamless loop */}
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
                <span>let's help each other</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for scrolling animation */}
      <style>{`
        .scrolling-text-container {
          width: 100%;
          overflow: hidden;
        }
        .scrolling-text {
          display: flex;
          white-space: nowrap;
          animation: scroll 30s linear infinite;
        }
        .scrolling-text span {
          padding: 0 1rem;
          font-size: 1.5rem;
          line-height: 1;
        }
        .dark-text span {
          color: white;
        }
        .light-text span {
          color: #166534;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  </section>
  );
};

export default LandingPageFourthSection;