import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete
        });
      } else {
        onComplete();
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center p-6 text-white font-sans select-none"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-display font-bold text-lg animate-pulse">
          AJ
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
