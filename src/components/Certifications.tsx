import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const getIssuerStyle = (issuer: string) => {
  const name = issuer.toLowerCase();
  if (name.includes('sap')) {
    return { bg: 'bg-brutalist-blue text-white', label: 'SAP' };
  } else if (name.includes('oracle')) {
    return { bg: 'bg-brutalist-red text-white', label: 'ORA' };
  } else if (name.includes('hackerrank')) {
    return { bg: 'bg-brutalist-yellow text-black', label: 'HR' };
  } else {
    return { bg: 'bg-black text-white', label: 'EA' };
  }
};

const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="certifications" 
      className="py-24 px-6 lg:px-24 bg-brutalist-bg border-b-4 border-black relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-blue mb-4 uppercase">・Credentials</h2>
        <p className="text-3xl md:text-5xl font-sans font-black leading-none tracking-tight uppercase text-black mb-16">
          Certifications & Affiliations
        </p>

        <div ref={containerRef} className="flex flex-col gap-6 w-full">
          {certifications.map((cert) => {
            const badge = getIssuerStyle(cert.issuer);
            return (
              <div 
                key={cert.id} 
                className="bg-white border-4 border-black p-6 brutalist-shadow-black rounded-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all duration-200"
              >
                <div className="flex items-center gap-6">
                  {/* Square initial sticker badge */}
                  <div className={`w-16 h-16 border-4 border-black ${badge.bg} flex items-center justify-center font-sans font-black text-2xl uppercase tracking-tighter shadow-[3px_3px_0px_#000000] shrink-0`}>
                    {badge.label}
                  </div>

                  <div>
                    <h3 className="text-xl lg:text-2xl font-sans font-black uppercase tracking-tight text-black">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-700 font-extrabold uppercase mt-1">
                      ISSUED BY: {cert.issuer} • {cert.date}
                      {cert.expiry ? ` • Expires ${cert.expiry}` : ''}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs font-mono text-zinc-700 uppercase mt-2">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono uppercase tracking-[0.3em] bg-black text-white px-2 py-1"
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
                  rel="noreferrer" 
                  className="px-6 py-3 bg-white border-3 border-black font-mono text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all self-stretch md:self-auto text-center"
                >
                  View Certificate ↗
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
