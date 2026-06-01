import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import HeroCodeEditor from './HeroCodeEditor';
import LiveClock from './LiveClock';
import HireButton from './HireButton';

const Hero = () => {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [typedRole, setTypedRole] = useState('');
  
  const nameFirst = "ANAND";
  const nameLast = "JADHAV";
  
  const roles = ["SAP Developer", "Full Stack Engineer", "iOS Developer"];

  useEffect(() => {
    // 1. Cinematic letter-by-letter reveal for name
    const animTimer = setTimeout(() => {
      gsap.to('.name-letter', {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power4.out',
      });
      
      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(editorRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
      );
    }, 1800); // Delayed to start after loader completes

    // 2. Typewriter subtitle cycle
    let active = true;
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const runTypewriter = () => {
      if (!active) return;
      const fullText = roles[roleIdx];

      if (!isDeleting) {
        setTypedRole(fullText.slice(0, charIdx + 1));
        charIdx++;
        typingSpeed = 80 + Math.random() * 40;

        if (charIdx === fullText.length) {
          isDeleting = true;
          typingSpeed = 2000; // Pause at end of text
        }
      } else {
        setTypedRole(fullText.slice(0, charIdx - 1));
        charIdx--;
        typingSpeed = 40;

        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          typingSpeed = 500; // Pause before typing next title
        }
      }

      setTimeout(runTypewriter, typingSpeed);
    };

    const typewriterTimer = setTimeout(runTypewriter, 2600);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(typewriterTimer);
      active = false;
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center px-6 lg:px-24 py-28 lg:py-0 overflow-hidden bg-brutalist-yellow border-b-4 border-black"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center z-10 pt-10 lg:pt-0 pb-20 lg:pb-0">
        
        {/* Left Column: Name and dynamic typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-black">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-sans font-black tracking-tighter leading-[0.85] uppercase select-none flex flex-col">
              <span className="flex overflow-hidden">
                {nameFirst.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className="name-letter inline-block translate-y-full opacity-0"
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="flex overflow-hidden">
                {nameLast.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className="name-letter inline-block translate-y-full opacity-0"
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Subtitle, Typewriter & CTAs */}
          <div 
            ref={subtitleRef}
            className="mt-8 flex flex-col gap-6 items-start opacity-0"
          >
            {/* Live Typing Badge */}
            <div className="px-4 py-2 border-3 border-black bg-white brutalist-shadow-black-sm text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brutalist-red animate-pulse" />
              <span className="tracking-wider uppercase">
                {typedRole || "SAP / Full Stack / iOS"}
              </span>
              <span className="w-1.5 h-4 bg-black ml-1 animate-blink" />
            </div>
            
            {/* Tagline chips */}
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider font-mono">
              <span className="px-2.5 py-1 bg-white border-2 border-black">💻 MEAN STACK</span>
              <span className="px-2.5 py-1 bg-brutalist-blue text-white border-2 border-black">🌩️ SAP BTP</span>
              <span className="px-2.5 py-1 bg-brutalist-red text-white border-2 border-black">📱 SWIFTUI</span>
            </div>

            <p className="font-mono text-zinc-900 text-sm max-w-xl leading-relaxed font-semibold">
              B.Tech CSE Student (SAP IEP Track) at Parul University. SAP Certified Associate (ABAP Cloud) & Oracle Cloud AI Certified. Specializing in high-performance enterprise solutions, MERN/MEAN stack, and native iOS development.
            </p>

            {/* Brutalist CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => {
                  const target = document.getElementById('projects');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-3.5 bg-white border-3 border-black font-extrabold text-xs sm:text-sm uppercase tracking-wider text-black brutalist-shadow-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer font-mono"
              >
                📂 View Projects ↓
              </button>

              <HireButton />
            </div>
          </div>
        </div>

        {/* Right Column: Code Widget and Timezone Clock */}
        <div 
          ref={editorRef}
          className="lg:col-span-5 flex flex-col gap-6 items-start lg:items-end w-full opacity-0"
        >
          {/* Real-time Mumbai Availability Widget */}
          <LiveClock />

          {/* Interactive Code Editor Pane */}
          <div className="w-full">
            <HeroCodeEditor />
          </div>
        </div>

      </div>

      {/* Infinite Marquee Text Banner */}
      <div className="absolute bottom-6 left-0 w-full overflow-hidden whitespace-nowrap border-y-3 border-black py-2 bg-white z-10">
        <div className="inline-block animate-marquee font-sans text-sm lg:text-base font-black uppercase tracking-widest text-black">
          SAP DEVELOPER • FULL STACK ENGINEER • iOS DEVELOPER • MEAN STACK • SWIFTUI • ABAP CLOUD • B.TECH CSE • Parul University • &nbsp;
          SAP DEVELOPER • FULL STACK ENGINEER • iOS DEVELOPER • MEAN STACK • SWIFTUI • ABAP CLOUD • B.TECH CSE • Parul University • &nbsp;
        </div>
      </div>
    </section>
  );
};

export default Hero;
