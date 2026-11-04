import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import HamburgerMenu from './components/HamburgerMenu';
import HeroRevamp from './components/HeroRevamp';
import Projects from './components/Projects';
import MidRow from './components/MidRow';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Cursor } from './components/motion/Cursor';

/** Top Crimson Scroll Progress Indicator */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0 0' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#d3121f] z-50 pointer-events-none shadow-[0_0_14px_rgba(211,18,31,0.7)]"
      aria-hidden="true"
    />
  );
}

function IntroCurtain() {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 6;
      });
    }, 28);
    return () => clearInterval(timer);
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        percent >= 100 ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="font-anton text-5xl sm:text-7xl uppercase text-white tracking-wider overflow-hidden">
        <span className="inline-block animate-slideUp">Anand Jadhav</span>
      </div>
      <div className="w-56 sm:w-80 h-0.5 bg-[#222] relative overflow-hidden rounded-full">
        <div
          className="absolute inset-0 bg-[#d3121f] transition-all duration-150 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="font-mono text-xs text-[#6b6b6b] tracking-[0.3em]">
        {percent}%
      </div>
    </div>
  );
}

function MarqueeTicker() {
  const tickerItems = [
    'ANAND JADHAV',
    'COMPUTER SCIENCE ENGINEER',
    'HILTI MANUFACTURING INTERN (SAP S/4HANA CLOUD)',
    'EX-UPTOSKILLS BACKEND INTERN',
    'PARUL UNIVERSITY (B.TECH CSE 2023–2027)',
    'FASTAPI & PYTHON AI',
    'FULL-STACK REACT & NODE.JS',
    'SAP BTP & ABAP CLOUD',
    'AVAILABLE FOR FULL-STACK & SAP ROLES',
  ];

  return (
    <div className="w-full max-w-[100vw] bg-[#0d0506] border-y border-[#1f1f1f] overflow-x-clip py-3 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 text-[11px] font-mono tracking-[0.22em] uppercase text-[#a0a0a0]">
            <span className="hover:text-white transition-colors">{item}</span>
            <span className="text-[#d3121f] animate-sparkle">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // ── 1. Smooth Scrolling with Lenis ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── 2. Subtle Mouse Spotlight Listener ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] bg-[#0a0a0a] text-white selection:bg-[#d3121f] selection:text-white font-sans overflow-x-clip">
      {/* ── Custom Interactive Red Dot Cursor (Desktop Only) ── */}
      <Cursor />

      {/* ── Top Red Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ── Cinematic Preloader Curtain ── */}
      <IntroCurtain />

      {/* ── Ambient Radial Cursor Glow (Smooth Tactical Lighting) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(211, 18, 31, 0.08), transparent 45%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Top Bar / Header ── */}
      <HamburgerMenu />

      {/* ── Main Content Sections ── */}
      <main className="w-full">
        {/* 1. Hero Section with Giant PORTFOLIO backdrop & Anand's portrait */}
        <HeroRevamp />

        {/* ── Running Editorial Marquee Banner ── */}
        <MarqueeTicker />

        {/* 2. Selected Engineering Projects Grid */}
        <Projects />

        {/* 3. Three-Column Mid-Row: Academic Background, Credentials, Tech Stack, Engineering Workflow, Philosophy & Hilti Experience */}
        <MidRow />

        {/* 4. Contact & Direct Connection */}
        <Contact />
      </main>

      {/* ── Editorial Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
