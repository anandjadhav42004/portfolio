import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1f1f1f] py-8 px-6 sm:px-12 text-xs">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6b6b6b]">
          &copy; {new Date().getFullYear()} <span className="text-white font-bold">ANAND JADHAV</span>. ALL RIGHTS RESERVED.
        </div>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6b6b6b]">
          <a href="#projects" className="hover:text-[#d3121f] transition-colors">Projects</a>
          <a href="#mid-row" className="hover:text-[#d3121f] transition-colors">Credentials</a>
          <a href="#workflow" className="hover:text-[#d3121f] transition-colors">Workflow</a>
          <a href="#contact" className="hover:text-[#d3121f] transition-colors">Contact</a>
          <button
            onClick={scrollToTop}
            className="hover:text-[#d3121f] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>TOP &uarr;</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
