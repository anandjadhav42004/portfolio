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
  return (
    <section
      id="hero"
      className="relative w-full min-h-[720px] md:min-h-[820px] bg-[#0a0a0a] border-b border-[#1f1f1f] flex flex-col justify-between overflow-hidden px-6 sm:px-12 pt-6 pb-12 select-none"
    >
      {/* ── Giant Red Background Word (~25vw) ── */}
      <div
        aria-hidden="true"
        className="absolute top-2 left-1/2 -translate-x-1/2 w-full text-center font-anton text-[26vw] sm:text-[23vw] leading-[0.8] tracking-tight uppercase pointer-events-none z-[1] opacity-75"
        style={{
          background: 'linear-gradient(180deg, #d3121f 0%, #8b0a12 55%, #2a0508 90%, #0a0a0a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        PORTFOLIO
      </div>

      {/* ── Anand Jadhav's Portrait Photo (Overlapping Text, z-index 2) ── */}
      <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-[-15%] bottom-0 h-[68%] sm:h-[78%] md:h-[88%] z-[2] pointer-events-none flex items-end justify-center">
        <img
          src="/anand_profile.jpg"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('anand_profile.jpg')) {
              target.src = 'anand_profile.jpg';
            }
          }}
          alt="Anand Jadhav — Computer Science Engineer"
          className="h-full w-auto object-cover object-top brightness-95 contrast-105"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Spacer for Top Bar ── */}
      <div className="w-full h-8" />

      {/* ── Foreground Content Grid (z-index 3) ── */}
      <div className="relative z-[3] w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-auto">
        
        {/* Left Column: Script + Name + Bio (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5 flex flex-col items-start"
        >
          <span className="font-allura text-4xl sm:text-5xl text-white tracking-wide mb-1 font-normal">
            Hello, I'm
          </span>

          <h1 className="font-anton text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.88] uppercase mb-4">
            ANAND<br />JADHAV
          </h1>

          <div className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#d3121f] mb-3">
            COMPUTER SCIENCE ENGINEER &amp; FULL-STACK DEVELOPER
          </div>

          <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-sm mb-4">
            {portfolioData.bio}
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#d3121f] uppercase bg-black/40 px-3 py-1.5 rounded border border-[#1f1f1f]">
            <Globe className="w-3.5 h-3.5 text-[#d3121f]" />
            <span>MUMBAI / VADODARA, INDIA &bull; OPEN WORLDWIDE</span>
          </div>
        </motion.div>

        {/* Middle Column: Tagline & Star Badge (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden lg:flex md:col-span-3 flex-col justify-end pb-4"
        >
          <div className="flex items-center gap-4 bg-[#0a0a0a]/80 p-3 rounded-lg border border-[#1f1f1f] backdrop-blur-sm">
            <div className="w-11 h-11 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#d3121f] text-lg flex-shrink-0">
              ✦
            </div>
            <p className="text-xs font-medium text-[#a0a0a0] leading-snug">
              Engineering reliable systems that solve real-world problems.
            </p>
          </div>
        </motion.div>

        {/* Right Column: 3 Live Stats (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-7 lg:col-span-4 flex flex-col justify-end"
        >
          <div className="flex flex-col border-t border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-sm">
            
            {/* Stat 1 */}
            <div className="flex items-center justify-between py-4 border-b border-[#1f1f1f]">
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight">
                <CountUp target={stats.projectsCompleted || 7} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] uppercase text-right">
                PRODUCTION<br />PROJECTS
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-between py-4 border-b border-[#1f1f1f]">
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight">
                <CountUp target={stats.certifications || 6} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] uppercase text-right">
                VERIFIED<br />CREDENTIALS
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-between py-4 border-b border-[#1f1f1f]">
              <span className="font-anton text-4xl sm:text-5xl text-[#d3121f] tracking-tight">
                <CountUp target={stats.githubContributions || 620} />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6b6b] uppercase text-right">
                GITHUB<br />CONTRIBUTIONS
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
