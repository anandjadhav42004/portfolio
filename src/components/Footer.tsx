import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1f1f1f] py-8 px-5 sm:px-8 md:px-12 text-xs overflow-x-clip">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6b6b6b] text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="text-white font-bold">ANAND JADHAV</span>. ALL RIGHTS RESERVED.
        </div>

        {/* Right: Nav Links with Min 44px Touch Targets */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6b6b6b]">
          <a href="#projects" className="min-h-[44px] flex items-center hover:text-[#d3121f] transition-colors">Projects</a>
          <a href="#mid-row" className="min-h-[44px] flex items-center hover:text-[#d3121f] transition-colors">Credentials</a>
          <a href="#contact" className="min-h-[44px] flex items-center hover:text-[#d3121f] transition-colors">Contact</a>
          <button
            onClick={scrollToTop}
            className="min-h-[44px] flex items-center hover:text-[#d3121f] transition-colors gap-1 cursor-pointer"
          >
            <span>TOP &uarr;</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
