import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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

export default function HamburgerMenu() {
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
      {/* Top Floating Glass Pill Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-[180] w-[92%] max-w-6xl mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-void-2/85 backdrop-blur-xl border border-white/10 shadow-2xl">
          
          {/* Brand Logo & Live Availability Dot */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan to-indigo-500 p-0.5 shadow-md shadow-cyan/20">
              <div className="w-full h-full rounded-full bg-void flex items-center justify-center font-display font-bold text-xs text-cyan group-hover:bg-cyan group-hover:text-void transition-colors">
                AJ
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm text-white tracking-tight leading-none">Anand Jadhav</span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available for hire
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTA Button & Hamburger Drawer Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan to-indigo-500 text-void font-bold text-xs shadow-md shadow-cyan/20 hover:scale-105 transition-all"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Hamburger Button for Full Drawer */}
            <button 
              onClick={toggleMenu}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1 shadow-card cursor-pointer hover:bg-white/20 transition-all"
              aria-label="Toggle navigation menu"
            >
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full Drawer Overlay */}
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
                className="text-3xl lg:text-6xl font-display font-bold text-white hover:text-cyan transition-colors tracking-tight"
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
                className="group flex items-center justify-between py-3 border-b border-white/5 hover:border-cyan-400/30 transition-colors"
              >
                <span className="font-display text-lg text-slate-300 group-hover:text-cyan transition-colors font-medium">{p.name}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleMenu}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-white/20 transition-all"
        >
          ✕
        </button>
      </div>
    </>
  );
}
