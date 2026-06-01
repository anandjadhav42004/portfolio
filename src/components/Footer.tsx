import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t-4 border-black overflow-hidden relative text-white">
      <div className="py-12 px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative bg-black">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 font-bold">Coded By</p>
          <p className="text-sm font-sans font-black uppercase tracking-widest text-white">Anand Jadhav</p>
        </div>

        <div className="flex gap-8 text-xs font-mono tracking-widest uppercase text-zinc-300 font-bold">
          <a href="https://github.com/anandjadhav42004" target="_blank" rel="noreferrer" className="hover:text-brutalist-yellow transition-colors hover:underline decoration-2">GitHub</a>
          <a href="https://www.linkedin.com/in/anand-jadhav-b599801b5" target="_blank" rel="noreferrer" className="hover:text-brutalist-yellow transition-colors hover:underline decoration-2">LinkedIn</a>
          <a href="mailto:anandjadhav42004@gmail.com" className="hover:text-brutalist-yellow transition-colors hover:underline decoration-2">Email</a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 font-bold">Copyright</p>
          <p className="text-sm font-sans font-black uppercase tracking-widest text-white">2027</p>
        </div>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap py-3 bg-brutalist-yellow text-black border-t-4 border-black z-20 relative">
        <div className="inline-block animate-marquee-reverse font-mono text-sm font-bold uppercase tracking-mega">
          OPEN TO WORK · FULL STACK · SAP · AI · REACT · NODE · CLOUD · 
          OPEN TO WORK · FULL STACK · SAP · AI · REACT · NODE · CLOUD ·
          OPEN TO WORK · FULL STACK · SAP · AI · REACT · NODE · CLOUD ·
        </div>
      </div>
    </footer>
  );
};

export default Footer;
