import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface LandingPageCardLeftProps {
  width?: number;
  height?: number;
}

export default function LandingPageCardRight({ 
  width, 
  height 
}: LandingPageCardLeftProps) {
  // Default dimensions
  const defaultWidth = 320;
  const defaultHeight = 400;
  
  // Calculate dimensions maintaining aspect ratio
  const calculatedWidth = width || defaultWidth;
  const calculatedHeight = height || (width ? (width * defaultHeight) / defaultWidth : defaultHeight);

  // Scale factors for responsive clipPath
  const scaleX = calculatedWidth / defaultWidth;
  const scaleY = calculatedHeight / defaultHeight;
  
  // Scaled values for clipPath
  const borderRadius = 24 * Math.min(scaleX, scaleY);
  const tabWidth = 120 * scaleX;
  const tabHeight = 40 * scaleY;
  const tabCurve = 8 * scaleX;
  const tabStart = 132 * scaleX;
  const tabEnd = 145 * scaleX;
  const cornerWidth = calculatedWidth - borderRadius;
  const cornerHeight = calculatedHeight - borderRadius;

  // Generate scaled clipPath
  const clipPathValue = `path("M 0 ${borderRadius} Q 0 0 ${borderRadius} 0 L ${tabWidth} 0 Q ${tabWidth + tabCurve} 0 ${tabStart} ${tabCurve} L ${tabEnd} ${tabHeight} L ${cornerWidth} ${tabHeight} Q ${calculatedWidth} ${tabHeight} ${calculatedWidth} ${tabHeight + borderRadius} L ${calculatedWidth} ${cornerHeight} Q ${calculatedWidth} ${calculatedHeight} ${cornerWidth} ${calculatedHeight} L ${borderRadius} ${calculatedHeight} Q 0 ${calculatedHeight} 0 ${cornerHeight} Z")`;

  return (
      <div className="relative" style={{ width: `${calculatedWidth}px` }}>
        {/* Single unified folder shape */}
        <div
          className="relative bg-gradient-to-br from-emerald-900 to-emerald-800 text-white"
          style={{
            clipPath: clipPathValue,
            width: `${calculatedWidth}px`,
            height: `${calculatedHeight}px`,
          }}
        >
          {/* Decorative wave pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M43.3,-59.4C54.8,-50.3,62.3,-36.4,67.4,-21.4C72.5,-6.4,75.2,9.7,71.1,24.5C67,39.3,56.1,52.8,42.8,61.5C29.5,70.2,13.9,74.1,-2.1,76.9C-18.1,79.7,-34.5,81.4,-48.3,73.4C-62.1,65.4,-73.3,47.7,-78.1,29.1C-82.9,10.5,-81.3,-9,-74.3,-26.2C-67.3,-43.4,-54.9,-58.3,-39.8,-66.5C-24.7,-74.7,-6.9,-76.2,8.3,-86.7C23.5,-97.2,31.8,-68.5,43.3,-59.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10 p-6 pt-16">
            {/* Percentage */}
            <div className="mb-6">
              <h1 className="text-7xl font-bold mb-3">65%</h1>
              <p className="text-sm leading-relaxed opacity-95">
                17 Thousand People Died,
                <br />
                Thousands Injured, Houses
                <br />
                and Buildings Destroyed.
                <br />
                Turkey-Syria Grieves
              </p>
            </div>

            {/* Donate Button */}
            <Button className="w-full bg-lime-50 hover:bg-lime-500 text-emerald-900 font-semibold py-6 rounded-2xl flex items-center justify-between text-base transition-all shadow-lg">
              <span>Donate now</span>
              <div className="bg-emerald-900 rounded-full p-2">
                <ArrowUpRight className="w-5 h-5 text-lime-400" />
              </div>
            </Button>
          </div>
        </div>
      </div>
  );
}