import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'LeetCode', href: '#leetcode' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const featuredProjects = [
  { name: 'Elvora Media Platform', url: 'https://elvora-media.netlify.app' },
  { name: 'KS Beauty Web App', url: 'https://ks-beauty-website.vercel.app' },
  { name: 'Event Management (Utsav26)', url: 'https://utsav26.netlify.app' },
  { name: 'FunFlix Streaming', url: 'https://funflix03.netlify.app' },
  { name: 'Anashi Thrift Store', url: 'https://anashistore.netlify.app' },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
      gsap.fromTo(linksRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
        duration: 0.5,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        onClick={toggleMenu}
        className="fixed top-6 right-6 lg:top-8 lg:right-10 z-[200] w-12 h-12 rounded-xl bg-void-2/90 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 shadow-card cursor-pointer group"
        aria-label="Toggle navigation menu"
      >
        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
      </button>

      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[190] bg-void-2 flex flex-col lg:flex-row backdrop-blur-2xl"
        style={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
      >
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-24">
          <p className="text-slate-400 font-mono text-xs mb-8 uppercase tracking-widest">// Quick Navigation</p>
          <nav className="flex flex-col gap-4 lg:gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMenu}
                ref={el => linksRef.current[i] = el}
                className="text-3xl lg:text-6xl font-display font-bold text-white hover:text-indigo-400 transition-colors tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-void border-l border-white/10 p-8 lg:p-24 flex flex-col justify-center hidden md:flex">
          <p className="text-slate-400 font-mono text-xs mb-8 uppercase tracking-widest">// Direct Deployment Links</p>
          <div className="flex flex-col gap-3">
            {featuredProjects.map((p, i) => (
              <a 
                key={i} 
                href={p.url} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between py-3 border-b border-white/5 hover:border-indigo-500/30 transition-colors"
              >
                <span className="text-lg font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{p.name}</span>
                <span className="text-slate-400 font-mono text-xs group-hover:text-indigo-400 transition-colors">Visit ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
