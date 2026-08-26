import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Star, MapPin, ShieldCheck, Terminal, ArrowUpRight, Sparkles, Award, Globe } from 'lucide-react';
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
      {/* Ghibli Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-emerald-500/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Awwwards Site of the Day Top Pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-3 px-4.5 py-2 rounded-full bg-white/5 border border-emerald-500/30 backdrop-blur-md text-xs font-mono tracking-wider text-emerald-300 uppercase mb-6 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-emerald-300">PORTFOLIO 2026</span>
          <span className="text-white/40">•</span>
          <span>ENTERPRISE & FULL-STACK DEVELOPMENT</span>
        </motion.div>

        {/* Big Awwwards SOTD Display Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-5xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.1] max-w-5xl px-2"
        >
          Designing Digital Harmony &{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200">
            Enterprise Cloud Systems
          </span>
        </motion.h1>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 sm:mt-5 text-base sm:text-2xl text-slate-300 font-light tracking-wide max-w-2xl h-12 flex items-center justify-center px-4"
        >
          <TypeAnimation
            sequence={[
              'SAP S/4HANA & ABAP Restful Application Programming', 2200,
              'Native Swift & SwiftUI Mobile Architecture', 2200,
              'Modern MEAN/MERN Full-Stack Microservices', 2200,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-cyan font-mono font-medium"
          />
        </motion.div>

        {/* Interactive Hero Media Card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-5xl mt-8 sm:mt-10 rounded-3xl sm:rounded-[2.5rem] border border-emerald-500/25 bg-gradient-to-b from-void-2/95 to-void-3/95 backdrop-blur-2xl p-4 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.6)] group"
        >
          {/* Ambient Grid Background */}
          <div className="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* Central Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center text-left">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <Terminal className="w-4 h-4 text-cyan" />
                <span>anand.jadhav@ghibli-architect ~ % status</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
                Anand Jadhav
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                B.Tech Computer Science student (SAP IEP Track) at Parul Institute of Technology. Crafting elegant enterprise architectures, native iOS applications, and high-performance web platforms focusing on scalable performance and modern UI/UX.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                {['SAP ABAP Cloud', 'SAP BTP', 'SwiftUI', 'OData V4', 'React.js', 'Node.js', 'PostgreSQL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-emerald-500/20 text-xs text-slate-300 font-mono hover:border-cyan/50 hover:text-cyan transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: Code Window */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl bg-void border border-emerald-500/30 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group-hover:border-cyan/50 transition-colors text-white">
                
                {/* Decorative Graphic Code */}
                <div className="space-y-2 font-mono text-xs text-emerald-300">
                  <div className="text-purple-400">class EnterpriseArchitect &#123;</div>
                  <div className="pl-4 text-slate-300">var focus: String = "Scalable Cloud & AI"</div>
                  <div className="pl-4 text-cyan">func renderSystem() -&gt; Status &#123;</div>
                  <div className="pl-8 text-emerald-400">return .productionReady</div>
                  <div className="pl-4 text-cyan">&#125;</div>
                  <div className="text-purple-400">&#125;</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-400 font-mono">Status: Online</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan hover:text-white font-semibold group/link"
                  >
                    <span>Explore Work</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>


        </motion.div>

        {/* Interactive Travel Category Dock */}
        <div className="w-full mt-10">
          <TravelHeroDock />
        </div>

      </div>
    </motion.section>
  );
}
