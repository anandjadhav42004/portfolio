import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'arrowup', 'arrowup',
  'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright',
  'arrowleft', 'arrowright',
  'b', 'a'
];

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

const KonamiEasterEgg = () => {
  const [isActive, setIsActive] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keySequenceRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const currentSequence = keySequenceRef.current;
      
      currentSequence.push(key);
      if (currentSequence.length > KONAMI_CODE.length) {
        currentSequence.shift();
      }

      // Check match
      const match = currentSequence.every((val, index) => val === KONAMI_CODE[index]);
      
      if (match) {
        setIsActive(true);
        setShowFlash(true);
        keySequenceRef.current = []; // Clear
        setTimeout(() => setShowFlash(false), 200); // 200ms white screen flash
      }

      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  // Particle explosion trigger on appearance
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ['#00c8ff', '#06ffd4', '#b026ff', '#2ee05a', '#ff006e', '#ffeb3b'];

    // Spawn 150 particles around center screen
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: 2 + Math.random() * 4,
        alpha: 1.0,
        decay: 0.01 + Math.random() * 0.015
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
          p.vy += 0.03; // Slight gravity
          p.alpha -= p.decay;
          alive = true;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  const stats = [
    { name: 'Coding Power ⚡', value: 95 },
    { name: 'Problem Solving 🧠', value: 90 },
    { name: 'Coffee Dependency ☕', value: 100 },
    { name: 'Bug Slaying ⚔️', value: 88 },
    { name: 'UI Crafting 🎨', value: 92 },
    { name: 'Team Synergy 🤝', value: 85 }
  ];

  return (
    <>
      {/* Screen White Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Secret RPG Overlay */}
      <AnimatePresence>
        {isActive && (
          <div 
            className="fixed inset-0 z-[240] flex items-center justify-center p-4 bg-void/95 backdrop-blur-md"
            onClick={() => setIsActive(false)}
          >
            {/* Canvas for Explosion */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
            
            {/* RPG Character Card */}
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()} // Stop dismiss click
              className="relative w-full max-w-md border-2 border-amber-500/50 bg-zinc-950 p-6 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] select-none text-left z-10 font-mono"
            >
              {/* Retro Banner Header */}
              <div className="text-center py-1.5 px-4 bg-amber-500/10 border border-amber-500/40 rounded-lg mb-6 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]">
                <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-widest block uppercase animate-pulse">
                  🏆 SECRET UNLOCKED — TRUE RPG STATS
                </span>
              </div>

              {/* Character Details Header */}
              <div className="flex gap-4 items-center mb-6 pb-4 border-b border-white/10">
                <div className="w-16 h-16 rounded-xl border-2 border-amber-500/30 flex items-center justify-center bg-zinc-900 text-3xl font-bold">
                  AJ
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase">Anand Jadhav</h3>
                  <p className="text-xs text-amber-500 font-semibold uppercase tracking-widest">Class: Full Stack Arch-Mage</p>
                  <p className="text-[10px] text-dim mt-0.5">Lv. 99 • Alignment: Chaotic Creative</p>
                </div>
              </div>

              {/* Character RPG Statistics */}
              <div className="flex flex-col gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs text-off-white font-semibold">
                      <span>{stat.name}</span>
                      <span className="text-amber-400">{stat.value}/100</span>
                    </div>
                    {/* Fill Bar track */}
                    <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 1.2, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer dismiss message */}
              <div className="mt-8 text-center text-[10px] text-dim border-t border-white/5 pt-4 uppercase tracking-widest">
                Press ESC or click anywhere to exit quest
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KonamiEasterEgg;
