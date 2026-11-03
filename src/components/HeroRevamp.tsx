import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { portfolioData, stats } from '../data/portfolio';

// Custom Count-Up component
function CountUp({ target, duration = 1.6 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const stepTime = Math.abs(Math.floor((duration * 1000) / (end || 1)));
    const timer = setInterval(() => {
      start += Math.ceil(end / 40) || 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(stepTime, 25));

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}+</span>;
}

export default function HeroRevamp() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 35;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 35;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const letters = 'PORTFOLIO'.split('');

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[720px] md:min-h-[840px] bg-[#0a0a0a] border-b border-[#1f1f1f] flex flex-col justify-between overflow-hidden px-6 sm:px-12 pt-6 pb-12 select-none"
    >
      {/* ── Giant Red Background Word (~25vw) with Letter-by-Letter Blur-to-Sharp Rising ── */}
      <div
        aria-hidden="true"
        className="absolute top-2 left-1/2 -translate-x-1/2 w-full text-center font-anton text-[26vw] sm:text-[23vw] leading-[0.8] tracking-tight uppercase pointer-events-none z-[1] opacity-75 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${-parallax.x * 0.4}px), ${-parallax.y * 0.4}px)`,
          background: 'linear-gradient(180deg, #d3121f 0%, #a30e17 45%, #2a0508 90%, #0a0a0a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {letters.map((char, idx) => (
          <motion.b
            key={idx}
            initial={{ opacity: 0, y: '75%', rotate: 4, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: '0%', rotate: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.3,
              delay: idx * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block font-normal bg-inherit"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {char}
          </motion.b>
        ))}
      </div>

      {/* ── Breathing Crimson Hero Radial Glow behind Portrait ── */}
      <div
        className="absolute left-1/2 bottom-[-10%] w-[62vw] h-[82%] -translate-x-[48%] pointer-events-none z-[1] animate-pulse-glow"
        style={{
          background: 'radial-gradient(closest-side, rgba(211,18,31,0.45), rgba(139,10,18,0.2) 55%, transparent)',
        }}
      />

      {/* ── Anand Jadhav's Portrait Photo (Overlapping Text, z-index 2 - PHOTO v3) ── */}
      <div
        className="absolute left-1/2 bottom-0 h-[80%] sm:h-[90%] md:h-[100%] z-[2] pointer-events-none flex items-end justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate(calc(-30% + ${parallax.x * 0.8}px), ${parallax.y * 0.6}px)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: '7%', scale: 1.14, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float h-full flex items-end"
        >
          <img
            src="/anand_profile.jpg"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('anand_profile.jpg')) {
                target.src = 'anand_profile.jpg';
              }
            }}
            alt="Anand Jadhav — Computer Science Engineer"
            className="h-full w-auto object-cover object-top brightness-95 contrast-105 filter drop-shadow-[0_15px_35px_rgba(211,18,31,0.35)]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(#000 72%, transparent 99%)',
              WebkitMaskComposite: 'source-in',
              maskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(#000 72%, transparent 99%)',
              maskComposite: 'intersect',
            }}
          />
        </motion.div>
      </div>

      {/* ── Spacer for Top Bar ── */}
      <div className="w-full h-8" />

      {/* ── Foreground Content Grid (z-index 3) ── */}
      <div className="relative z-[3] w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-auto">
        
        {/* Left Column: Script + Name + Bio (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-allura text-4xl sm:text-5xl text-white tracking-wide mb-1 font-normal"
          >
            Hello, I'm
          </motion.span>

          <h1 className="font-anton text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.88] uppercase mb-4 overflow-hidden">
            <motion.span
              initial={{ y: '55%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              ANAND
            </motion.span>
            <br />
            <motion.span
              initial={{ y: '55%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              JADHAV
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#d3121f] mb-3"
          >
            COMPUTER SCIENCE ENGINEER &bull; FULL-STACK &amp; SAP DEVELOPER
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-[#a0a0a0] leading-relaxed max-w-sm mb-4"
          >
            {portfolioData.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 mb-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#d3121f] uppercase bg-black/40 px-3 py-1.5 rounded border border-[#1f1f1f]">
              <Globe className="w-3.5 h-3.5 text-[#d3121f]" />
              <span>MUMBAI / VADODARA, INDIA &bull; OPEN WORLDWIDE</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-white uppercase bg-[#d3121f]/20 hover:bg-[#d3121f] px-3.5 py-1.5 rounded border border-[#d3121f] transition-all duration-300 hover:shadow-[0_0_20px_rgba(211,18,31,0.6)]"
            >
              <span>CONNECT NOW</span>
              <span className="text-[#ff3344] group-hover:text-white">→</span>
            </a>
          </motion.div>
        </div>

        {/* Middle Column: Tagline & Star Badge (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex md:col-span-3 flex-col justify-end pb-4"
        >
          <div className="flex items-center gap-4 bg-[#0a0a0a]/80 p-3 rounded-lg border border-[#1f1f1f] backdrop-blur-sm hover:border-[#d3121f]/50 transition-colors group">
            <div className="w-11 h-11 rounded-full border border-[#1f1f1f] group-hover:border-[#d3121f] flex items-center justify-center text-[#d3121f] text-lg flex-shrink-0 transition-colors">
              <span className="animate-sparkle">✦</span>
            </div>
            <p className="text-xs font-medium text-[#a0a0a0] leading-snug group-hover:text-white transition-colors">
              Engineering reliable software architectures that solve real-world problems.
            </p>
          </div>
        </motion.div>

        {/* Right Column: 3 Live Stats (4 cols) */}
        <div className="md:col-span-7 lg:col-span-4 flex flex-col justify-end">
          <div className="flex flex-col border-t border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-sm">
            
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between py-4 border-b border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 transition-colors rounded"
            >
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp target={stats.projectsCompleted || 7} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] group-hover:text-white uppercase text-right transition-colors">
                PRODUCTION<br />PROJECTS
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between py-4 border-b border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 transition-colors rounded"
            >
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp target={stats.certifications || 6} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] group-hover:text-white uppercase text-right transition-colors">
                VERIFIED<br />CREDENTIALS
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between py-4 border-b border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 transition-colors rounded"
            >
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp target={stats.leetcodeSolved || 150} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] group-hover:text-white uppercase text-right transition-colors">
                ALGORITHMS &amp;<br />PROBLEMS SOLVED
              </span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
