import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="contact" className="py-32 px-6 lg:px-24 bg-void">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-xs font-mono tracking-mega text-electric mb-8 uppercase">・Get In Touch</h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-syne font-bold uppercase tracking-tighter text-outline hover:text-white transition-colors duration-500 hover-target cursor-none mb-16">
          SAY HI
        </h1>
        
        <div className="flex flex-col md:flex-row gap-12 text-center md:text-left mt-8 w-full max-w-4xl justify-between border-t border-white/10 pt-16">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-dim tracking-widest uppercase">Email</p>
            <a href="mailto:anandjadhav42004@gmail.com" className="text-xl lg:text-2xl font-syne font-bold hover:text-electric transition-colors hover-target uppercase tracking-widest">
              anandjadhav42004@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-dim tracking-widest uppercase">Phone</p>
            <a href="tel:+918308008154" className="text-xl lg:text-2xl font-syne font-bold hover:text-cyan transition-colors hover-target uppercase tracking-widest">
              +91 8308008154
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-dim tracking-widest uppercase">Socials</p>
            <div className="flex gap-6">
              <a href="https://github.com/anandjadhav42004" target="_blank" rel="noreferrer" className="text-xl font-syne font-bold hover:text-electric transition-colors hover-target uppercase tracking-widest">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/anand-jadhav-b599801b5" target="_blank" rel="noreferrer" className="text-xl font-syne font-bold hover:text-cyan transition-colors hover-target uppercase tracking-widest">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
