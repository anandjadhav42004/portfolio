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
      gsap.fromTo(textRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          }
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-void text-slate-900 dark:text-white px-6 lg:px-20 py-24 border-b border-slate-200 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
        
        {/* Section Title */}
        <div ref={textRef} className="flex flex-col gap-3">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan dark:text-indigo-400 uppercase">
            // Engineering Profile & Background
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight max-w-3xl">
            Architecting enterprise cloud services & full-stack systems
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl leading-relaxed mt-2">
            B.Tech Computer Science student (SAP IEP Track) at Parul Institute of Technology. Building enterprise solutions across SAP BTP Cloud, modern web architectures, and native mobile environments.
          </p>
        </div>

        {/* 3 Core Focus Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: SAP Enterprise */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">SAP BTP & ABAP Cloud</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Certified in SAP ABAP Cloud. Specialized in OData V2/V4 services, Fiori Elements, SAP Business Technology Platform (BTP), and HANA database integration.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-300">
              <span>#ABAPCloud</span> <span>#SAPBTP</span> <span>#OData</span>
            </div>
          </div>

          {/* Card 2: Full-Stack Web */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Full-Stack Web (MEAN/MERN)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Engineering reactive web applications using TypeScript, React, Next.js, Node.js, Express, and PostgreSQL/MongoDB with scalable microservice APIs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono text-sky-600 dark:text-sky-300">
              <span>#TypeScript</span> <span>#React</span> <span>#NodeJS</span>
            </div>
          </div>

          {/* Card 3: Native iOS & AI */}
          <div className="glass-card p-7 rounded-2xl flex flex-col justify-between group bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Native iOS & AI Workflows</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Building intuitive iOS applications in Swift & SwiftUI. Integrating TensorFlow machine learning endpoints and Google Gemini AI automated workflows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-300">
              <span>#SwiftUI</span> <span>#GeminiAI</span> <span>#Python</span>
            </div>
          </div>

        </div>

        {/* Interactive Linux Shell Terminal */}
        <div className="w-full mt-4">
          <Terminal />
        </div>

      </div>
    </section>
  );
};

export default About;
