import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    key: 'sap',
    name: 'SAP Enterprise',
    accent: 'bg-brutalist-blue text-white',
  },
  {
    key: 'web',
    name: 'Full Stack Web',
    accent: 'bg-brutalist-yellow text-black',
  },
  {
    key: 'ios_ai',
    name: 'iOS & AI Deep Learning',
    accent: 'bg-brutalist-red text-white',
  },
  {
    key: 'database',
    name: 'Databases',
    accent: 'bg-white text-black',
  },
  {
    key: 'tools',
    name: 'Tools & Cloud DevOps',
    accent: 'bg-black text-white',
  }
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="skills" 
      className="py-24 px-6 lg:px-24 bg-brutalist-bg border-b-4 border-black relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-blue mb-4 uppercase">・Technical Skills</h2>
        <p className="text-3xl md:text-5xl font-sans font-black leading-none tracking-tight uppercase text-black mb-16">
          Core Proficiencies & Tech Stack
        </p>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const list = skills[category.key as keyof typeof skills] || [];
            return (
              <div 
                key={category.key} 
                className="bg-white border-4 border-black p-6 brutalist-shadow-black rounded-none flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
              >
                <div className={`px-4 py-2 border-3 border-black ${category.accent} font-sans font-black text-sm uppercase tracking-wider mb-6 text-center shadow-[2px_2px_0px_#000000]`}>
                  {category.name}
                </div>
                
                <div className="flex flex-col gap-5">
                  {list.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center font-mono text-xs font-bold uppercase tracking-wider text-black">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      
                      {/* Double Border brutalist progress bar */}
                      <div className="w-full border-3 border-black bg-white p-0.5 rounded-none">
                        <div className="border-2 border-black bg-white h-4 rounded-none overflow-hidden">
                          <div 
                            className="bg-brutalist-yellow border-r-2 border-black h-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

