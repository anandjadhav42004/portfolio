import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Star, MapPin, ShieldCheck, Terminal, ArrowUpRight } from 'lucide-react';
import TravelHeroDock from './TravelHeroDock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

export default function HeroRevamp() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progress = ref.current ? Math.min(1, scrollY / ref.current.clientHeight) : 0;

  return (
    <motion.section
      ref={ref}
      animate={{ y: `${progress * 15}vh` }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 pt-28 pb-16 bg-void overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-accent-start/20 to-accent-end/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Tag Pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md text-xs font-mono tracking-wider text-cyan dark:text-cyan uppercase mb-6"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-cyan animate-pulse" />
          <span>Discover Extraordinary Engineering</span>
        </motion.div>

        {/* Big Dribbble Style Display Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl"
        >
          Architecting High-Performance{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan via-indigo-500 to-indigo-600 dark:from-accent-start dark:via-cyan dark:to-accent-end">
            SAP Enterprise
          </span>{' '}
          & Native iOS Solutions
        </motion.h1>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 text-lg sm:text-2xl text-slate-700 dark:text-slate-300 font-light tracking-wide max-w-2xl h-12 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Specialized in S/4HANA & ABAP Restful Programming', 2200,
              'Crafting Pixel-Perfect Swift & iOS Applications', 2200,
              'Building Scalable Full-Stack React & Node Cloud Systems', 2200,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-indigo-600 dark:text-cyan font-mono font-medium"
          />
        </motion.div>

        {/* Dribbble Style Hero Media Card with Floating Glass Badges */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-5xl mt-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-gradient-to-b dark:from-void-2/90 dark:to-void-3/90 backdrop-blur-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/50 group overflow-hidden"
        >
          {/* Subtle Ambient Grid Background */}
          <div className="absolute inset-0 opacity-10 dark:opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Central Visual Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                <Terminal className="w-4 h-4" />
                <span>anand.jadhav@enterprise-app ~ % status</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
                Anand Jadhav
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Senior SAP Enterprise Consultant & Mobile Solutions Architect with 5+ years of experience delivering mission-critical ERP integrations, native Swift iOS applications, and modern web platforms.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {['SAP S/4HANA', 'ABAP RAP', 'SwiftUI', 'iOS Native', 'React.js', 'Node.js', 'Clean Architecture'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 font-mono hover:border-cyan/50 hover:text-cyan transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Card / Interactive Preview (Dark Terminal Look for High Contrast in both modes) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl bg-slate-950 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:to-cyan-900/40 border border-slate-800 dark:border-white/10 p-6 flex flex-col justify-between shadow-inner relative overflow-hidden group-hover:border-cyan/40 transition-colors text-white">
                
                {/* Decorative Code Graphic */}
                <div className="space-y-2 font-mono text-xs text-cyan/90">
                  <div className="text-purple-400">class EnterpriseSystem &#123;</div>
                  <div className="pl-4 text-slate-300">var uptime: Double = 99.99</div>
                  <div className="pl-4 text-emerald-400">func deploy() -&gt; Status &#123;</div>
                  <div className="pl-8 text-amber-300">return .productionReady</div>
                  <div className="pl-4 text-emerald-400">&#125;</div>
                  <div className="text-purple-400">&#125;</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-400 font-mono">Status: Verified</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan hover:text-white font-semibold group/link"
                  >
                    <span>Connect Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Glass Badge 1: Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-void/80 border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg dark:shadow-xl text-xs text-slate-900 dark:text-white">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold">5.0</span>
            <span className="text-slate-500 dark:text-slate-400">| 20+ Enterprise Projects</span>
          </div>

          {/* Floating Glass Badge 2: Bottom Left */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-void/80 border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg dark:shadow-xl text-xs text-slate-900 dark:text-white">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400" />
            <div>
              <div className="font-semibold text-emerald-600 dark:text-emerald-400">Enterprise Certified</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">SAP & iOS Specialist</div>
            </div>
          </div>

          {/* Floating Glass Badge 3: Bottom Right Location */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-void/80 border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg dark:shadow-xl text-xs text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan" />
            <span>Bengaluru, IN</span>
          </div>
        </motion.div>

        {/* Travel Style Interactive Control Dock */}
        <TravelHeroDock />
      </div>
    </motion.section>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}
