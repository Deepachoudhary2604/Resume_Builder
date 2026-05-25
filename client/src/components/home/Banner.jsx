import React from 'react';
import { Sparkles } from 'lucide-react';

const Banner = () => {
  return (
    <div className="w-full py-2.5 font-medium text-sm text-indigo-200 text-center bg-indigo-950/80 backdrop-blur-md border-b border-indigo-500/20 sticky top-0 z-[60]">
      <div className="flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
        <p>ResumeAI Engine 2.0 is now live. <a href="#features" className="text-white hover:underline underline-offset-4 decoration-indigo-400 transition-all">See what's new →</a></p>
      </div>
    </div>
  );
};

export default Banner;
