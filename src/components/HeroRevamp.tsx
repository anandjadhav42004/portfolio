import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, FileText, ArrowDown } from 'lucide-react';
import { portfolioData, stats } from '../data/portfolio';
import { ease, buttonHover, buttonTap, springTransition } from '../lib/motion';
import { Magnetic } from './motion/Magnetic';
import { CountUp } from './motion/CountUp';
import { useIsDesktop } from '../hooks/useIsDesktop';

export default function HeroRevamp() {
  const isDesktop = useIsDesktop();
  const heroRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // ── 1. Scroll-Driven 3D Perspective Rotation for Portrait ──
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Desktop: fuller rotation (+-10deg rotate, +-14deg rotateY); Mobile: gentle 2D rotation (+-6deg, no rotateY)
  const rawRotate = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, 10] : [-4, 6]);
  const rawRotateY = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, -14] : [0, 0]);
  const scrollRotate = useSpring(rawRotate, { stiffness: 90, damping: 20 });
  const scrollRotateY = useSpring(rawRotateY, { stiffness: 90, damping: 20 });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ['0%', isDesktop ? '8%' : '4%']);

  // ── 2. Subtle Mouse Parallax (Desktop Only) ──
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;
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
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: isDesktop ? 1200 : undefined }}
      className="relative w-full min-h-[100dvh] md:min-h-[820px] bg-[#0a0a0a] border-b border-[#1f1f1f] flex flex-col justify-between overflow-x-clip px-5 sm:px-8 md:px-12 pt-4 md:pt-6 pb-10 md:pb-12 select-none"
    >
      {/* ── Giant Red Background Word with Fluid clamp() and Staggered Rise ── */}
      <div
        aria-hidden="true"
        className="absolute top-2 left-1/2 -translate-x-1/2 w-full text-center font-anton leading-[0.8] tracking-tight uppercase pointer-events-none z-[1] opacity-75 transition-transform duration-300 ease-out select-none"
        style={{
          fontSize: 'clamp(52px, 20vw, 320px)',
          transform: `translate(calc(-50% + ${isDesktop ? -parallax.x * 0.4 : 0}px), ${isDesktop ? -parallax.y * 0.4 : 0}px)`,
          background: 'linear-gradient(180deg, #d3121f 0%, #a30e17 45%, #2a0508 90%, #0a0a0a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {letters.map((char, idx) => (
          <motion.b
            key={idx}
            initial={{ opacity: 0, y: '75%', rotate: 4, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: '0%', rotate: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.2,
              delay: idx * 0.06,
              ease,
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
        className="absolute left-1/2 bottom-[-10%] w-[85vw] md:w-[62vw] h-[82%] -translate-x-1/2 md:-translate-x-[48%] pointer-events-none z-[1] animate-pulse-glow"
        style={{
          background: 'radial-gradient(closest-side, rgba(211,18,31,0.45), rgba(139,10,18,0.2) 55%, transparent)',
        }}
      />

      {/* ── Desktop Portrait (Layered & Overlapping Typography, translateX(-30%)) ── */}
      {isDesktop && (
        <div
          className="absolute left-1/2 bottom-0 h-[85%] lg:h-[100%] z-[2] pointer-events-none flex items-end justify-center transition-transform duration-500 ease-out"
          style={{
            transform: `translate(calc(-30% + ${parallax.x * 0.8}px), ${parallax.y * 0.6}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: '7%', scale: 1.14, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.4, ease }}
            style={{
              rotate: scrollRotate,
              rotateY: scrollRotateY,
              scale: scrollScale,
              y: scrollYOffset,
            }}
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
              className="h-full w-auto object-cover object-top brightness-100 contrast-105 filter drop-shadow-[0_20px_40px_rgba(211,18,31,0.38)] drop-shadow-[0_0_25px_rgba(211,18,31,0.22)]"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(#000 70%, transparent 99%)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(#000 70%, transparent 99%)',
                maskComposite: 'intersect',
              }}
            />
          </motion.div>
        </div>
      )}

      {/* ── Spacer for Top Bar ── */}
      <div className="w-full h-4 md:h-8" />

      {/* ── Foreground Content Grid ── */}
      <div className="relative z-[3] w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end mt-auto">
        
        {/* Left Column: Script + Name Split Reveal + Role + CTAs (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="font-allura text-white tracking-wide mb-1 font-normal"
            style={{ fontSize: 'clamp(28px, 6vw, 48px)' }}
          >
            Hello, I'm
          </motion.span>

          {/* Hero Name Split Reveal (masked slide-up from overflow-hidden) */}
          <h1
            className="font-anton text-white tracking-tight uppercase mb-3 leading-[0.9] select-none"
            style={{ fontSize: 'clamp(44px, 10vw, 98px)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.75, ease }}
                className="inline-block"
              >
                ANAND
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.9, ease }}
                className="inline-block"
              >
                JADHAV
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.16em] uppercase text-[#d3121f] mb-3"
          >
            COMPUTER SCIENCE ENGINEER &bull; FULL-STACK &amp; SAP DEVELOPER
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease }}
            className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed max-w-sm mb-4"
          >
            {portfolioData.bio}
          </motion.p>

          {/* ── Mobile-Only Centered Studio Portrait ── */}
          {!isDesktop && (
            <div className="w-full flex justify-center items-center my-3 z-[2]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.4, ease }}
                style={{
                  rotate: scrollRotate,
                  scale: scrollScale,
                }}
                className="w-[72vw] max-w-[280px] aspect-[9/13] overflow-hidden"
              >
                <img
                  src="/anand_profile.jpg"
                  alt="Anand Jadhav"
                  className="w-full h-full object-cover object-top filter drop-shadow-[0_15px_30px_rgba(211,18,31,0.4)]"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Action CTAs (Min 44px tap targets for mobile compliance) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25, ease }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full"
          >
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springTransition}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded text-xs font-semibold tracking-[0.14em] text-white uppercase bg-[#d3121f] hover:bg-[#e01422] shadow-[0_0_20px_rgba(211,18,31,0.55)] transition-colors"
              >
                <span>VIEW PROJECTS</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="/Anand_Jadhav_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springTransition}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded text-xs font-semibold tracking-[0.14em] text-white uppercase bg-white/5 hover:bg-white/10 border border-[#2a2a2a] hover:border-white/40 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-[#d3121f]" />
                <span>RESUME</span>
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="#contact"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springTransition}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded text-xs font-semibold tracking-[0.14em] text-white uppercase bg-[#d3121f]/20 hover:bg-[#d3121f] border border-[#d3121f] transition-all hover:shadow-[0_0_20px_rgba(211,18,31,0.6)]"
              >
                <span>CONNECT</span>
                <span className="text-[#ff3344] group-hover:text-white">→</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Middle Column: Tagline & Star Badge (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease }}
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

        {/* Right Column: Live Stats Row */}
        <div className="md:col-span-7 lg:col-span-4 flex flex-col justify-end w-full mt-4 md:mt-0">
          <div className="grid grid-cols-3 md:flex md:flex-col border-t border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-sm">
            
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.35, ease }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-3 md:py-4 border-b md:border-b border-r md:border-r-0 border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 md:px-3 transition-colors rounded"
            >
              <span className="font-anton text-2xl sm:text-3xl md:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp to={stats.projectsCompleted || 7} />
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.16em] text-[#6b6b6b] group-hover:text-white uppercase text-left md:text-right transition-colors mt-1 md:mt-0">
                PRODUCTION<br className="hidden md:block" /> PROJECTS
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.45, ease }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-3 md:py-4 border-b md:border-b border-r md:border-r-0 border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 md:px-3 transition-colors rounded"
            >
              <span className="font-anton text-2xl sm:text-3xl md:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp to={stats.certifications || 6} />
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.16em] text-[#6b6b6b] group-hover:text-white uppercase text-left md:text-right transition-colors mt-1 md:mt-0">
                VERIFIED<br className="hidden md:block" /> CREDENTIALS
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.55, ease }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-3 md:py-4 border-b md:border-b border-[#1f1f1f] hover:bg-[#d3121f]/5 px-2 md:px-3 transition-colors rounded"
            >
              <span className="font-anton text-2xl sm:text-3xl md:text-5xl text-[#d3121f] tracking-tight group-hover:drop-shadow-[0_0_14px_rgba(211,18,31,0.7)] transition-all">
                <CountUp to={94} suffix="%" />
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.16em] text-[#6b6b6b] group-hover:text-white uppercase text-left md:text-right transition-colors mt-1 md:mt-0">
                HSC ACADEMIC<br className="hidden md:block" /> RECORD
              </span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
