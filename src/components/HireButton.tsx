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

  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine'; // Smooth corporate audio chime
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      playNote(440, now, 0.3); // A4
      playNote(554.37, now + 0.08, 0.3); // C#5
      playNote(659.25, now + 0.16, 0.5); // E5
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  };

  const triggerExplosion = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.5 ? '#818CF8' : '#38BDF8',
        radius: 1.5 + Math.random() * 2.5,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.015
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.alpha > 0) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04;
          p.alpha -= p.decay;
          alive = true;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
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
    playChime();
    triggerExplosion();
    
    setTimeout(() => {
      window.open('mailto:anandjadhav42004@gmail.com?subject=Recruitment Request: Anand Jadhav', '_self');
      setIsOpen(false);
    }, 800);
  };

  const handleDecline = () => {
    setDeclineMsg(true);
    setTimeout(() => {
      setDeclineMsg(false);
      setIsOpen(false);
    }, 1800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-7 py-3.5 rounded-xl bg-white/90 dark:bg-void-2 hover:bg-slate-100 dark:hover:bg-void-3 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
      >
        <span>Get in Touch</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[230] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-void/80 backdrop-blur-md">
            
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white dark:bg-void-2 border border-slate-200 dark:border-white/10 p-6 shadow-2xl z-20 rounded-2xl backdrop-blur-xl text-left text-slate-900 dark:text-white"
            >
              {!declineMsg ? (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
                    <span>💼 Direct Recruiter Access</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Initiate Discussion with Anand?
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    Available for enterprise SAP Cloud / BTP integrations, Full-Stack software engineering, and mobile app development roles.
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Instant response via direct email integration</span>
                  </div>

                  {/* Accept/Decline Options */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleAccept}
                      className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-glow"
                    >
                      Send Email Inquiry
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-slate-300 font-medium text-sm bg-white/5 rounded-xl border border-white/10">
                  Window closed. Feel free to connect via LinkedIn!
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
