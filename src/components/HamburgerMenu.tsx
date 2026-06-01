import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const links = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
];

const projects = [
  { name: 'ANASHI CANDLES', url: 'https://anashicandles.netlify.app' },
  { name: 'ANASHI STORE', url: 'https://anashistore.netlify.app' },
  { name: 'DISASTERLINK', url: '#' },
  { name: 'TRAVELLOOP', url: '#' },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        onClick={toggleMenu}
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[200] w-12 h-12 flex flex-col items-center justify-center gap-1.5 mix-blend-difference hover-target group"
      >
        <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-10'}`} />
        <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
        <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-10'}`} />
      </button>

      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[190] bg-void-2 flex flex-col lg:flex-row"
        style={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
      >
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-24">
          <p className="text-dim font-mono mb-8 uppercase tracking-mega text-xs">・Navigation</p>
          <nav className="flex flex-col gap-4 lg:gap-6">
            {links.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMenu}
                ref={el => linksRef.current[i] = el}
                className="text-4xl lg:text-7xl font-bold font-syne text-outline hover-target w-max uppercase tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-void border-l border-white/5 p-8 lg:p-24 flex flex-col justify-center hidden md:flex">
          <p className="text-dim font-mono mb-8 uppercase tracking-mega text-xs">・Selected Work</p>
          <div className="flex flex-col gap-4">
            {projects.map((p, i) => (
              <a 
                key={i} 
                href={p.url} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between py-4 border-b border-white/10 hover-target"
              >
                <span className="text-xl lg:text-2xl font-syne font-semibold group-hover:text-electric transition-colors">{p.name}</span>
                <span className="text-dim font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">VIEW →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
