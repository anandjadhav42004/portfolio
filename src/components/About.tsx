import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Terminal from './Terminal';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-brutalist-bg text-black px-6 lg:px-24 py-24 border-b-4 border-black"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">
        
        <div className="flex flex-col lg:flex-row items-stretch gap-12 z-20">
          {/* Draggable Business Card */}
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <motion.div 
              drag 
              dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
              whileDrag={{ scale: 1.05, rotate: 3 }}
              className="w-full max-w-sm bg-white border-4 border-black p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing brutalist-shadow-black relative rounded-none select-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
            >
              {/* Retro Header Stamp */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-brutalist-yellow border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider">
                CARD ID: AJ-99
              </div>

              <div>
                <h3 className="text-3xl font-sans font-black uppercase tracking-tighter text-black leading-none">Anand Jadhav</h3>
                <p className="text-xs font-mono text-brutalist-blue font-bold mt-1 uppercase">SAP & Full Stack & iOS</p>
              </div>
              
              <div className="flex flex-col gap-1 text-[11px] font-mono text-zinc-950 font-semibold tracking-wider uppercase mt-12 border-t-2 border-black pt-4">
                <p>📞 +91 8308008154</p>
                <p>✉️ anandjadhav42004@gmail.com</p>
                <p>🌐 anandjadhav.vercel.app</p>
              </div>
            </motion.div>
            
            <div className="text-[10px] font-mono font-bold text-zinc-700 tracking-wider uppercase mt-4">
              ✨ Click & drag my business card
            </div>
          </div>

          {/* Bio Text & Stats Card */}
          <div className="flex-1 flex flex-col justify-between" ref={textRef}>
            <div>
              <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-blue mb-4 uppercase">・Biography</h2>
              <p className="text-3xl md:text-4xl font-sans font-black leading-none tracking-tight uppercase text-black">
                B.Tech Computer Science student (SAP IEP Track) at Parul University. Specializing in cloud enterprise apps, modern web stacks, and Swift iOS applications.
              </p>
              <p className="font-mono text-zinc-800 text-sm font-semibold mt-4 leading-relaxed max-w-2xl">
                My educational journey at Parul Institute of Technology is focused on applying computational paradigms directly to real-world deployment channels. I work daily with MongoDB, Express, Angular/React, Node.js (MEAN/MERN), Swift, and SAP OData service modules.
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white border-3 border-black p-4 brutalist-shadow-black-sm hover:translate-y-[-2px] transition-all">
                <h4 className="text-3xl font-sans font-black text-brutalist-red uppercase">4</h4>
                <p className="text-[10px] font-mono font-bold text-zinc-700 mt-1 uppercase tracking-wider">Projects Built</p>
              </div>
              <div className="bg-white border-3 border-black p-4 brutalist-shadow-black-sm hover:translate-y-[-2px] transition-all">
                <h4 className="text-3xl font-sans font-black text-brutalist-blue uppercase">5</h4>
                <p className="text-[10px] font-mono font-bold text-zinc-700 mt-1 uppercase tracking-wider">Credentials</p>
              </div>
              <div className="bg-white border-3 border-black p-4 brutalist-shadow-black-sm hover:translate-y-[-2px] transition-all">
                <h4 className="text-3xl font-sans font-black text-black uppercase">2027</h4>
                <p className="text-[10px] font-mono font-bold text-zinc-700 mt-1 uppercase tracking-wider">Graduation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Linux Shell Terminal */}
        <div className="w-full mt-8">
          <Terminal />
        </div>

      </div>
    </section>
  );
};

export default About;
