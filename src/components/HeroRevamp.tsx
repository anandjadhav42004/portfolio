import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Mail, ExternalLink, Code2, Database, Layers, ChevronDown } from 'lucide-react';

// Inline SVG icons for GitHub and LinkedIn (not in this lucide-react version)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Interactive3DModel = lazy(() => import('./Interactive3DModel'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const techPills = [
  { icon: Layers,   label: 'Full-Stack Development',   color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/8' },
  { icon: Code2,    label: 'Software Engineering',      color: 'text-cyan-300   border-cyan-500/30   bg-cyan-500/8'   },
  { icon: Database, label: 'Databases & Backend',       color: 'text-slate-300  border-white/20      bg-white/5'       },
];

function Model3DFallback() {
  return (
    <div className="w-full h-[300px] sm:h-[380px] flex items-center justify-center">
      <div className="w-28 h-28 rounded-full border-2 border-emerald-500/30 flex items-center justify-center">
        <Code2 className="w-10 h-10 text-emerald-400 opacity-60" />
      </div>
    </div>
  );
}

export default function HeroRevamp() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progress = ref.current ? Math.min(1, scrollY / ref.current.clientHeight) : 0;

  const scrollToWork    = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.section
      ref={ref}
      animate={{ y: `${progress * 10}vh` }}
      transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 pt-24 pb-12 bg-void overflow-hidden"
      aria-label="Hero section"
    >
      {/* Single subtle accent glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, rgba(56,189,248,0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Status pill */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-emerald-500/25 text-xs font-mono tracking-wider text-emerald-400 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Available for Internships &amp; Roles — 2026
        </motion.div>

        {/* Name */}
        <motion.p
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-sm sm:text-base font-mono text-slate-400 tracking-[0.25em] uppercase mb-3"
        >
          Anand Jadhav
        </motion.p>

        {/* Main headline — visible immediately, no animation dependency */}
        <motion.h1
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.08] max-w-4xl px-2 mb-5"
        >
          Building reliable software{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #34D399 0%, #38BDF8 100%)' }}
          >
            for real-world problems.
          </span>
        </motion.h1>

        {/* Role typewriter */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg sm:text-2xl text-slate-400 font-light tracking-wide mb-5 h-9 flex items-center justify-center"
          aria-label="Professional identity"
        >
          <TypeAnimation
            sequence={[
              'Computer Science Engineer', 2600,
              'Full-Stack Developer', 2000,
              'Software Engineer', 2000,
              'SAP & Enterprise Developer', 2400,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-emerald-300 font-mono font-medium"
          />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-10 px-4"
        >
          I design and build web and mobile applications, working across frontend, backend, and
          databases — from React UIs to SAP enterprise systems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3 mb-12 w-full sm:w-auto px-4"
        >
          <button
            onClick={scrollToWork}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-void bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
            aria-label="Explore my work"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all duration-200"
            aria-label="View resume"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>View Resume</span>
          </a>

          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Get in touch"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Technical indicator pills */}
        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-2.5 mb-14"
        >
          {techPills.map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${color}`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Identity card with 3D model */}
        <motion.div
          custom={7} variants={fadeUp} initial="hidden" animate="visible"
          className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-void-2/80 backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(52,211,153,0.06)' }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#34d399 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center">

            {/* Left: Identity */}
            <div className="md:col-span-6 p-6 sm:p-10 text-left">
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>anand@dev-workspace ~ % whoami</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-3">
                Anand Jadhav
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                B.Tech CSE student (SAP IEP Track) at Parul Institute of Technology.
                Building production web apps, enterprise SAP systems, and AI-powered tools.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SAP BTP', 'SwiftUI', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-emerald-500/20 text-xs text-slate-300 font-mono hover:border-emerald-400/40 hover:text-emerald-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://github.com/anandjadhav42004"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/25 text-xs font-medium transition-all"
                  aria-label="GitHub profile"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anand-jadhav-b599801b5"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/25 text-xs font-medium transition-all"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right: 3D Model (lazy) */}
            <div className="md:col-span-6 relative flex items-center justify-center border-t md:border-t-0 md:border-l border-white/8 min-h-[260px] sm:min-h-[360px]">
              <Suspense fallback={<Model3DFallback />}>
                <Interactive3DModel />
              </Suspense>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          custom={8} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 flex flex-col items-center gap-1 text-slate-600 text-xs font-mono"
          aria-hidden="true"
        >
          <span>scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>

      </div>
    </motion.section>
  );
}
