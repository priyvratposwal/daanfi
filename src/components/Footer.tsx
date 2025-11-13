import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <div className="flex items-center justify-center min-h-[300px] ">
      <footer className="w-full max-w-[1200px] bg-gradient-to-br from-emerald-900 to-emerald-800 text-white rounded-3xl p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-8 border-b border-emerald-700/30">
          {/* Left - Logo and Tagline */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">Daanfi</span>
            </div>
            <p className="text-sm opacity-90">Great futures are built with a small charity</p>
          </div>

          {/* Right - Navigation Links */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Our Work</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Our Story</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Partner with Us</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Donate</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Careers</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Internships</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Instagram</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">Twitter</a>
              <a href="#" className="text-sm hover:text-lime-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs opacity-75">© 2023 Copyright. ariemelasari</p>

          {/* Donate Button */}
          <Button 
            className="bg-lime-400 hover:bg-lime-500 text-emerald-900 font-semibold px-6 py-2 rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg"
          >
            <span>Donate now</span>
            <div className="bg-emerald-900 rounded-full p-1">
              <ArrowUpRight className="w-4 h-4 text-lime-400" />
            </div>
          </Button>
        </div>
      </footer>
    </div>
  );
}