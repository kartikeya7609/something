import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  // Smooth progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white opacity-100 z-[9999]">
      {/* Background Decorative Element (Subtle) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-10">
        
        {/* Logo Section */}
        <div className="mb-12 relative">
          {/* Animated border pulse */}
          <div className="absolute -inset-4 border border-blue-100 rounded-2xl animate-pulse" />
          
          <div className="relative w-28 h-28 bg-white shadow-2xl shadow-blue-100 rounded-2xl flex items-center justify-center p-4 border border-slate-50">
            <img 
              src="/ieee-logo.svg" 
              alt="IEEE Logo" 
              className="w-full h-full object-contain animate-bounce [animation-duration:3s]" 
            />
          </div>
        </div>

        {/* Percentage Display */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-5xl font-bold text-slate-800 tracking-tighter">
            {progress}
          </span>
          <span className="text-xl font-medium text-blue-600">%</span>
        </div>

        {/* Main Progress Bar Container */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
          {/* The Actual Moving Bar */}
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Subtext */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400 animate-pulse">
            Establishing Secure Connection
          </p>
          <div className="mt-10 text-[10px] font-mono text-slate-300">
            IEEE // ALGOUTSAV_SYSTEM_INIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;