import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { key: 'sap', name: 'SAP Enterprise & BTP', color: 'from-indigo-500 to-indigo-600' },
  { key: 'web', name: 'Full-Stack Web (MEAN/MERN)', color: 'from-sky-500 to-blue-600' },
  { key: 'ios_ai', name: 'Native iOS & AI Engineering', color: 'from-emerald-500 to-teal-600' },
  { key: 'database', name: 'Databases & Data Stores', color: 'from-purple-500 to-indigo-600' },
  { key: 'tools', name: 'Tools, DevOps & Deployments', color: 'from-cyan-500 to-sky-600' },
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="skills" 
      className="py-24 px-6 lg:px-20 bg-void border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase">
            // Technical Competencies
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Core Proficiencies & Stack
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Quantified proficiency levels across enterprise software architectures, frontend frameworks, backend runtimes, and cloud platforms.
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const list = skills[category.key as keyof typeof skills] || [];
            return (
              <div 
                key={category.key} 
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-white/5 flex items-center justify-between">
                  <span>{category.name}</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                </h3>
                
                <div className="flex flex-col gap-5">
                  {list.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs font-medium text-slate-300">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="font-mono text-slate-400">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div 
                          className={`bg-gradient-to-r ${category.color} h-full rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
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
