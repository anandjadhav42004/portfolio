import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';

export default function HamburgerMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        
        {/* Left: Engineering Titles */}
        <a href="#hero" className="flex flex-col text-left group">
          <span className="font-anton text-sm tracking-[0.16em] uppercase text-[#d3121f] group-hover:text-red-400 transition-colors">
            COMPUTER SCIENCE ENGINEER
          </span>
          <span className="text-[11px] font-medium tracking-[0.12em] text-[#6b6b6b] uppercase">
            FULL-STACK &amp; SAP DEVELOPER
          </span>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#projects" className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f] transition-colors">
            Projects
          </a>
          <a href="#mid-row" className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f] transition-colors">
            Credentials &amp; Skills
          </a>
          <a href="#workflow" className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f] transition-colors">
            Workflow
          </a>
          <a href="#contact" className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f] transition-colors">
            Contact
          </a>
        </nav>

        {/* Right: Availability Status Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#a0a0a0]">
            <span>OPEN FOR SOFTWARE &amp; SAP ROLES</span>
            <span className="text-[#d3121f] text-sm animate-pulse">✦</span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-[#1f1f1f] flex flex-col items-center justify-center gap-1 text-white hover:border-[#d3121f] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-4 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 py-6 flex flex-col gap-4">
          <a
            href="#projects"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f]"
          >
            Projects
          </a>
          <a
            href="#mid-row"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f]"
          >
            Credentials &amp; Skills
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f]"
          >
            Engineering Workflow
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-[#d3121f]"
          >
            Contact Anand
          </a>
          <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#a0a0a0]">
            <span>OPEN FOR ROLES</span>
            <span className="text-[#d3121f]">✦</span>
          </div>
        </div>
      )}
    </header>
  );
}
