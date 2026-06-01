import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const logs = [
    "Initializing portfolio engine...",
    "Loading SAP module...",
    "Compiling MEAN stack...",
    "Fetching certifications...",
    "iOS renderer ready...",
    "ANAND JADHAV — ONLINE."
  ];

  useEffect(() => {
    let active = true;
    let currentLineIndex = 0;
    let charIndex = 0;
    let tempProgress = 0;
    
    const typeLine = () => {
      if (!active) return;
      
      if (currentLineIndex < logs.length) {
        const fullText = logs[currentLineIndex];
        const targetProgress = Math.floor(((currentLineIndex + 1) / logs.length) * 100);
        
        const progressInterval = setInterval(() => {
          if (tempProgress < targetProgress) {
            tempProgress += 1;
            setCurrentProgress(tempProgress);
          } else {
            clearInterval(progressInterval);
          }
        }, 10);

        const typingInterval = setInterval(() => {
          const typedText = fullText.slice(0, charIndex + 1);
          setTerminalLines(prev => {
            const copy = [...prev];
            copy[currentLineIndex] = typedText;
            return copy;
          });
          
          charIndex++;
          
          if (charIndex >= fullText.length) {
            clearInterval(typingInterval);
            currentLineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 150);
          }
        }, 12);
      } else {
        // Complete state - pause for 600ms, then slide up or fade
        setTimeout(() => {
          if (!active) return;
          const tl = gsap.timeline({ onComplete });
          
          tl.to(terminalRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          })
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut"
          }, "-=0.1");
        }, 600);
      }
    };

    const bootTimeout = setTimeout(typeLine, 200);

    return () => {
      active = false;
      clearTimeout(bootTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-white font-mono select-none"
    >
      <div 
        ref={terminalRef} 
        className="w-full max-w-2xl border-4 border-white bg-black p-6 brutalist-shadow-black-lg relative overflow-hidden"
        style={{ boxShadow: '6px 6px 0px #FFF' }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-white mb-6 text-[10px] text-zinc-400 select-none tracking-widest uppercase">
          <div className="flex gap-2">
            <span className="w-3 h-3 border border-white bg-black" />
            <span className="w-3 h-3 border border-white bg-black" />
            <span className="w-3 h-3 border border-white bg-black" />
          </div>
          <div>SYSTEM_INITIALIZE.EXE</div>
        </div>

        {/* Terminal Lines Content */}
        <div className="min-h-[160px] flex flex-col gap-2 text-xs md:text-sm tracking-wide text-left text-zinc-100">
          {terminalLines.map((line, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <span className="text-white select-none">&gt;</span>
              <span className={idx === logs.length - 1 ? "text-brutalist-yellow font-bold uppercase tracking-wider" : ""}>
                {line}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <span className="text-white select-none">&gt;</span>
            <span className="w-2.5 h-4 bg-brutalist-yellow animate-blink" />
          </div>
        </div>

        {/* Progress Bar (Brutalist style) */}
        <div className="mt-8 pt-4 border-t-2 border-white flex items-center justify-between gap-4 text-xs font-bold">
          <div className="flex-1 bg-black h-4 border-2 border-white overflow-hidden p-0.5">
            <div 
              className="bg-white h-full transition-all duration-100 ease-out"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <span className="text-white min-w-[35px] text-right font-mono">
            {currentProgress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
