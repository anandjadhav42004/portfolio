import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-void border-t border-white/10 overflow-hidden relative text-slate-400">
      <div className="py-12 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-mono">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-semibold text-white font-sans text-sm">Anand Jadhav</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>B.Tech CSE @ Parul University</span>
        </div>

        <div className="flex items-center gap-6 text-slate-300 font-medium">
          <a href="https://github.com/anandjadhav42004" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/anand-jadhav-b599801b5" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
          <a href="mailto:anandjadhav42004@gmail.com" className="hover:text-indigo-400 transition-colors">Email</a>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Anand Jadhav</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
