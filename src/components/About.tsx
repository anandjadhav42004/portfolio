import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Terminal from './Terminal';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
        }
      );
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-void text-white px-4 sm:px-6 lg:px-20 py-24 border-b border-white/8"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">

        {/* Section title */}
        <div ref={textRef} className="flex flex-col gap-3">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            // Engineering Profile
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight max-w-3xl"
          >
            Building software across the full stack
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed mt-2">
            B.Tech Computer Science Engineering student (SAP IEP Track) at Parul Institute of Technology.
            Working across frontend, backend, enterprise systems, and mobile development.
          </p>
        </div>

        {/* 3 Focus cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: Full-Stack Web */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group border border-white/8 hover:border-emerald-500/25 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full-Stack Web</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Building production web applications using React, TypeScript, Node.js, Express, and
                PostgreSQL/MongoDB. From UI components to REST APIs and database schemas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/6 flex flex-wrap gap-2 text-xs font-mono text-emerald-400">
              <span>#React</span> <span>#TypeScript</span> <span>#NodeJS</span>
            </div>
          </div>

          {/* Card 2: Enterprise & SAP */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group border border-white/8 hover:border-indigo-500/25 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-2">SAP & Enterprise</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                SAP Certified ABAP Cloud developer. Building SAPUI5 / Fiori apps, OData V4 services, and
                BTP-integrated workflows. Currently interning at Hilti on SAP S/4HANA systems.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/6 flex flex-wrap gap-2 text-xs font-mono text-indigo-400">
              <span>#ABAPCloud</span> <span>#SAPBTP</span> <span>#OData</span>
            </div>
          </div>

          {/* Card 3: Mobile & AI */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group border border-white/8 hover:border-cyan-500/25 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile & AI</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Building iOS applications with SwiftUI. Integrating ML models (XGBoost, TensorFlow) and
                AI APIs (Gemini) into web and enterprise applications for intelligent automation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/6 flex flex-wrap gap-2 text-xs font-mono text-cyan-400">
              <span>#SwiftUI</span> <span>#Python</span> <span>#GeminiAI</span>
            </div>
          </div>

        </div>

        {/* Interactive terminal */}
        <div className="w-full mt-4">
          <Terminal />
        </div>

      </div>
    </section>
  );
};

export default About;
