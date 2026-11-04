import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

const navItems = [
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'process', label: 'Design Process', href: '#process' },
  { id: 'mid-row', label: 'Experience & Credentials', href: '#mid-row' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function HamburgerMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ids = ['hero', 'projects', 'process', 'mid-row', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-3 md:py-4 flex items-center justify-between">
        
        {/* Left: Engineering Titles */}
        <a href="#hero" className="flex flex-col text-left group py-1">
          <span className="font-anton text-xs sm:text-sm tracking-[0.16em] uppercase text-[#d3121f] group-hover:text-red-400 transition-colors">
            COMPUTER SCIENCE ENGINEER
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] text-[#6b6b6b] uppercase">
            FULL-STACK &amp; SAP DEVELOPER
          </span>
        </a>

        {/* Center Desktop Navigation with Underline & Active Highlight */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative text-xs font-semibold uppercase tracking-[0.15em] transition-colors group py-2 min-h-[44px] flex items-center ${
                  isActive ? 'text-white' : 'text-[#a0a0a0] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d3121f]" />
                )}
                {/* Left-to-right growing hover underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#d3121f] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Availability Status Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0]">
            <span>OPEN FOR ROLES</span>
            <span className="text-[#d3121f] text-sm animate-pulse">✦</span>
          </div>

          {/* Mobile Hamburger Toggle (Min 44px tap target) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#1f1f1f] flex flex-col items-center justify-center gap-1.5 text-white hover:border-[#d3121f] transition-colors focus-visible:outline-[#d3121f]"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-4 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile Drawer (44px tap targets for every touch item) */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-5 sm:px-8 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`min-h-[44px] flex items-center text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
                activeSection === item.id ? 'text-[#d3121f]' : 'text-[#a0a0a0] hover:text-[#d3121f]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Anand_Jadhav_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            className="min-h-[44px] flex items-center justify-between text-sm font-semibold uppercase tracking-[0.15em] text-[#d3121f] pt-2 border-t border-[#1f1f1f]"
          >
            <span>Download Resume PDF</span>
            <span>↓</span>
          </a>
        </div>
      )}
    </header>
  );
}
