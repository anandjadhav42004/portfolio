import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Work',      href: '#projects'      },
  { name: 'Skills',   href: '#skills'         },
  { name: 'Journey',  href: '#experience'     },
  { name: 'About',    href: '#about'          },
  { name: 'Contact',  href: '#contact'        },
];

const featuredProjects = [
  { name: 'Anti-Gravity AI Verification',        url: '#projects'                        },
  { name: 'SAP Prognos — Demand Forecasting',   url: 'https://sap-forecast.vercel.app'  },
  { name: 'Elvora Media Platform',              url: 'https://www.elvoramedia.org'       },
  { name: 'KS Beauty Web App',                 url: 'https://ks-beauty-website.vercel.app' },
  { name: 'Utsav26 Event Management',          url: 'https://utsav26.netlify.app'       },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen]   = useState(false);
  const overlayRef            = useRef<HTMLDivElement>(null);
  const linksRef              = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
        duration: 0.55,
        ease: 'power3.inOut',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, delay: 0.25, ease: 'power2.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
        duration: 0.45,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-[180] w-[94%] max-w-6xl">
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full bg-void-2/90 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Anand Jadhav — home">
            <div className="w-9 h-9 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center font-display font-bold text-xs text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              AJ
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm text-white tracking-tight leading-none">
                Anand Jadhav
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                Available for hire
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-void font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Get in touch"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex flex-col items-center justify-center gap-1.5 hover:bg-white/15 transition-all"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="nav-drawer"
            >
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen drawer ── */}
      <div
        id="nav-drawer"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[190] bg-void-2/98 flex flex-col lg:flex-row backdrop-blur-2xl"
        style={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
      >
        {/* Nav links */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20">
          <p className="text-slate-500 font-mono text-[11px] mb-8 uppercase tracking-widest">
            // Navigation
          </p>
          <nav className="flex flex-col gap-4 lg:gap-5" aria-label="Drawer navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={close}
                ref={(el) => (linksRef.current[i] = el)}
                className="text-3xl lg:text-5xl font-display font-bold text-white hover:text-emerald-400 transition-colors tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Featured projects sidebar */}
        <div className="flex-1 bg-void border-l border-white/8 p-8 lg:p-20 flex-col justify-center hidden md:flex">
          <p className="text-slate-500 font-mono text-[11px] mb-8 uppercase tracking-widest">
            // Featured Projects
          </p>
          <div className="flex flex-col gap-1">
            {featuredProjects.map((p, i) => (
              <a
                key={i}
                href={p.url}
                onClick={p.url.startsWith('#') ? close : undefined}
                target={p.url.startsWith('http') ? '_blank' : undefined}
                rel={p.url.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center justify-between py-3.5 border-b border-white/5 hover:border-emerald-500/30 transition-colors"
              >
                <span className="font-display text-base text-slate-300 group-hover:text-white transition-colors font-medium">
                  {p.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/8 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 transition-all"
          aria-label="Close navigation menu"
        >
          ✕
        </button>
      </div>
    </>
  );
}
