import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import HeroCodeEditor from './HeroCodeEditor';
import LiveClock from './LiveClock';
import HireButton from './HireButton';
import gsap from 'gsap';

const Hero = () => {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Smooth, controlled GSAP entrance sequence
    const animTimer = setTimeout(() => {
      gsap.to('.hero-title-element', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      });
      
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: 'power2.out' }
        );
      }

      if (editorRef.current) {
        gsap.fromTo(editorRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: 'power2.out' }
        );
      }
    }, 400);

    return () => {
      clearTimeout(animTimer);
    };
  }, []);

  return (
    <motion.section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center px-6 lg:px-20 py-32 lg:py-24 overflow-hidden bg-void border-b border-white/10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Name, Subtitle & Corporate CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Status Badge with typewriter */}
          <div className="hero-title-element opacity-0 translate-y-4 mb-6 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <TypeAnimation
                sequence={[
                  'SAP Enterprise Developer', 2000,
                  'Full Stack Software Engineer', 2000,
                  'Native iOS Developer', 2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block' }}
              />
            </div>
            
            <LiveClock />
          </div>

          {/* Heading with gradient text */}
          <h1 className="hero-title-element opacity-0 translate-y-4 text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent leading-[1.05] mb-6">
            Anand <span className="bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent">Jadhav</span>
          </h1>

          {/* Subtitle & Tagline */}
          <div 
            ref={subtitleRef}
            className="flex flex-col gap-6 items-start opacity-0"
          >
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              B.Tech Computer Science Engineer specializing in enterprise <strong className="text-white font-semibold">SAP ABAP Cloud & BTP</strong> architectures, modern <strong className="text-white font-semibold">Full-Stack Web (MEAN/MERN)</strong>, and <strong className="text-white font-semibold">Native iOS (SwiftUI)</strong> apps.
            </p>

            {/* Specialty Pill Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-medium font-mono text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> SAP BTP & ABAP
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> React & Node.js
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> SwiftUI Native
              </span>
            </div>

            {/* Corporate CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => {
                  const target = document.getElementById('projects');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Featured Projects</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <HireButton />
            </div>
          </div>
        </div>

        {/* Right Column: Code Widget Pane */}
        <div 
          ref={editorRef}
          className="lg:col-span-5 flex flex-col gap-4 items-start w-full opacity-0"
        >
          <div className="w-full">
            <HeroCodeEditor />
          </div>
        </div>

      </div>

      {/* Ambient Ticker Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap border-t border-white/5 bg-void-2/60 backdrop-blur-md py-2.5 z-10">
        <div className="inline-block animate-marquee font-mono text-xs text-slate-400 tracking-wider">
          <span className="mx-4 font-semibold text-slate-300">SAP BTP</span> • 
          <span className="mx-4 font-semibold text-slate-300">ABAP CLOUD</span> • 
          <span className="mx-4 font-semibold text-slate-300">REACT / NEXT.JS</span> • 
          <span className="mx-4 font-semibold text-slate-300">SWIFTUI</span> • 
          <span className="mx-4 font-semibold text-slate-300">MEAN STACK</span> • 
          <span className="mx-4 font-semibold text-slate-300">PARUL UNIVERSITY CSE</span> • 
          <span className="mx-4 font-semibold text-slate-300">ORACLE CLOUD AI CERTIFIED</span> • 
          <span className="mx-4 font-semibold text-slate-300">SAP BTP</span> • 
          <span className="mx-4 font-semibold text-slate-300">ABAP CLOUD</span> • 
          <span className="mx-4 font-semibold text-slate-300">REACT / NEXT.JS</span> • 
          <span className="mx-4 font-semibold text-slate-300">SWIFTUI</span> • 
          <span className="mx-4 font-semibold text-slate-300">MEAN STACK</span> • 
        </div>
      </div>
    </section>
  );
};

export default Hero;
