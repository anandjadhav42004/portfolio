import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    key: 'frontend',
    name: 'Frontend Development',
    tagline: 'UI, frameworks, and component architecture',
    dotColor: 'bg-emerald-400',
    barColor: 'from-emerald-400 to-emerald-500',
    borderColor: 'border-emerald-500/25',
    labelColor: 'text-emerald-400',
  },
  {
    key: 'backend',
    name: 'Backend & Databases',
    tagline: 'APIs, servers, ORMs, and data stores',
    dotColor: 'bg-cyan-400',
    barColor: 'from-cyan-400 to-cyan-500',
    borderColor: 'border-cyan-500/25',
    labelColor: 'text-cyan-400',
  },
  {
    key: 'mobile_enterprise',
    name: 'Mobile & Enterprise',
    tagline: 'iOS native apps and SAP enterprise systems',
    dotColor: 'bg-indigo-400',
    barColor: 'from-indigo-400 to-indigo-500',
    borderColor: 'border-indigo-500/25',
    labelColor: 'text-indigo-400',
  },
  {
    key: 'core_cs',
    name: 'Core CS & Engineering',
    tagline: 'Fundamentals, algorithms, and DevOps',
    dotColor: 'bg-slate-400',
    barColor: 'from-slate-400 to-slate-500',
    borderColor: 'border-slate-500/25',
    labelColor: 'text-slate-400',
  },
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.skill-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-20 bg-void border-b border-white/8"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col gap-3 mb-14">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            // Technical Skills
          </span>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight"
          >
            Engineering Disciplines
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Grouped by discipline rather than a flat list. Only technologies I've genuinely
            used in projects or professional work.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map((cat) => {
            const list = skills[cat.key as keyof typeof skills] || [];
            return (
              <div
                key={cat.key}
                className={`skill-card glass-card p-6 rounded-2xl border ${cat.borderColor} flex flex-col`}
              >
                {/* Card header */}
                <div className={`flex items-start justify-between mb-5 pb-4 border-b border-white/6`}>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${cat.labelColor}`}>
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">{cat.tagline}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${cat.dotColor} mt-1 flex-shrink-0`} aria-hidden="true" />
                </div>

                {/* Skill tags (no arbitrary % bars) */}
                <div className="flex flex-wrap gap-2">
                  {list.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-slate-300 font-mono hover:border-emerald-500/30 hover:text-emerald-300 transition-colors cursor-default"
                    >
                      {skill.name}
                    </span>
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
