import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="contact" className="py-28 px-6 lg:px-20 bg-void border-b border-white/10">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase mb-4">
          // Let's Connect
        </span>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-6 max-w-4xl">
          Interested in working together?
        </h2>

        <p className="text-slate-400 text-base max-w-xl mb-10 leading-relaxed">
          Open for enterprise SAP software engineering, full-stack web development, and mobile app roles. Reach out via email or LinkedIn.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:anandjadhav42004@gmail.com"
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide shadow-glow transition-all flex items-center gap-2"
          >
            <span>Send Direct Email</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/anand-jadhav-b599801b5"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
          >
            LinkedIn Profile ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-4xl pt-12 border-t border-white/10">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <p className="text-xs font-mono text-slate-400 mb-1">Direct Email</p>
            <a href="mailto:anandjadhav42004@gmail.com" className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">
              anandjadhav42004@gmail.com
            </a>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <p className="text-xs font-mono text-slate-400 mb-1">Phone Contact</p>
            <a href="tel:+918308008154" className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">
              +91 8308008154
            </a>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <p className="text-xs font-mono text-slate-400 mb-1">Location Base</p>
            <p className="text-sm font-semibold text-white">
              Mumbai / Vadodara, India
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
