import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  alpha: number;
  decay: number;
}

const HireButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [declineMsg, setDeclineMsg] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playQuestChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'square'; // square sound is very retro / brutalist!
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      // Retro major arpeggio
      playNote(261.63, now, 0.35); // C4
      playNote(329.63, now + 0.08, 0.35); // E4
      playNote(392.00, now + 0.16, 0.35); // G4
      playNote(523.25, now + 0.24, 0.7); // C5
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  };

  const triggerGoldExplosion = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const goldParticles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      goldParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.5 ? '#FFE500' : '#FF3B00', // Yellow and red brutalist bursts!
        radius: 2 + Math.random() * 4,
        alpha: 1.0,
        decay: 0.02 + Math.random() * 0.02
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      goldParticles.forEach((p) => {
        if (p.alpha > 0) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gravity
          p.alpha -= p.decay;
          alive = true;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.rect(p.x, p.y, p.radius * 2, p.radius * 2); // Square particles for brutalist style!
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();
  };

  const handleAccept = () => {
    playQuestChime();
    triggerGoldExplosion();
    
    setTimeout(() => {
      window.open('mailto:anandjadhav42004@gmail.com?subject=Quest Accepted: Hiring Anand Jadhav', '_self');
      setIsOpen(false);
    }, 1000);
  };

  const handleDecline = () => {
    setDeclineMsg(true);
    setTimeout(() => {
      setDeclineMsg(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3.5 bg-brutalist-red border-3 border-black font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white brutalist-shadow-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer font-mono"
      >
        ⚔️ HIRE ME
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[230] flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
            
            {/* particles canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md border-4 border-black bg-white p-6 brutalist-shadow-black-lg font-mono text-left z-20 rounded-none"
              style={{ boxShadow: '8px 8px 0px #000' }}
            >
              {!declineMsg ? (
                <>
                  {/* Quest Tag */}
                  <div className="text-center py-2 bg-brutalist-yellow border-3 border-black text-black font-black text-xs uppercase tracking-widest mb-6">
                    📜 NEW QUEST UNLOCKED
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-black mb-4 leading-relaxed uppercase border-b-2 border-black pb-2">
                    Hire Anand Jadhav as a Developer?
                  </h3>

                  <p className="text-xs text-zinc-700 leading-relaxed mb-6 font-semibold">
                    Objective: Recruit an expert SAP Certified Cloud Developer & Full-Stack iOS Engineer.
                  </p>

                  <div className="text-xs text-brutalist-red mb-6 font-extrabold uppercase bg-red-100 p-2.5 border-2 border-black">
                    REWARD: +99 System Reliability, Flawless Codebases.
                  </div>

                  {/* Accept/Decline Options */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleAccept}
                      className="flex-1 py-3 bg-brutalist-yellow hover:bg-yellow-400 border-3 border-black text-black font-black text-xs uppercase transition-colors cursor-pointer"
                    >
                      ACCEPT QUEST ✅
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-6 py-3 bg-white hover:bg-zinc-100 border-3 border-black text-black font-black text-xs uppercase transition-colors cursor-pointer"
                    >
                      DECLINE ❌
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-brutalist-red font-black text-sm tracking-wide uppercase bg-red-100 border-3 border-black">
                  ⚠️ "You'll regret this..."
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HireButton;
