import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  credentialUrl: string;
  skills?: string[];
  highlight?: boolean;
}

const getIssuerBadge = (issuer: string) => {
  const name = issuer.toLowerCase();
  if (name.includes('sap')) {
    return { bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', label: 'SAP Certified' };
  } else if (name.includes('oracle')) {
    return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', label: 'Oracle Cloud' };
  } else if (name.includes('hackerrank')) {
    return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'HackerRank' };
  } else if (name.includes('forage')) {
    return { bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20', label: 'Forage Simulation' };
  } else {
    return { bg: 'bg-slate-500/10 text-slate-300 border-slate-500/20', label: issuer };
  }
};

const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="certifications" 
      className="py-24 px-6 lg:px-20 bg-void border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan dark:text-indigo-400 uppercase">
            // Verified Professional Qualifications
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Certifications & Credentials
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Industry-recognized developer certifications in SAP ABAP Cloud, Oracle Cloud Artificial Intelligence, SQL, and Software Engineering.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-4 w-full">
          {certifications.map((cert: Certification) => {
            const badge = getIssuerBadge(cert.issuer);
            const isFeatured = !!cert.highlight;

            return (
              <div 
                key={cert.id} 
                className={`glass-card p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/90 dark:bg-card-bg ${
                  isFeatured
                    ? 'border-indigo-500/40 bg-indigo-500/5 shadow-lg shadow-indigo-500/5 hover:border-indigo-400'
                    : 'border-slate-200 dark:border-white/10 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-start md:items-center gap-5 flex-1">
                  <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold shrink-0 ${badge.bg}`}>
                    {badge.label}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {cert.name}
                      </h3>
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">
                      Issued by {cert.issuer} • {cert.date}
                      {cert.expiry ? ` • Valid thru ${cert.expiry}` : ''}
                      {cert.credentialId ? ` • ID: ${cert.credentialId}` : ''}
                    </p>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Verify ${cert.name} credential`}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition-colors self-stretch md:self-auto text-center shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

