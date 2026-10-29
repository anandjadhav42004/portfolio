import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Cpu, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const STATUS_STYLES: Record<string, string> = {
  COMPLETED:   'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
  PRODUCTION:  'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
  'IN PROGRESS': 'bg-amber-500/15  border-amber-500/30  text-amber-300',
  PROTOTYPE:   'bg-indigo-500/15  border-indigo-500/30  text-indigo-300',
  RESEARCH:    'bg-slate-500/15   border-slate-500/30   text-slate-300',
};

const categories = ['All', 'AI / ML', 'Full Stack Web', 'Enterprise App', 'Web App'];

const Projects = () => {
  const gridRef      = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState('All');

  const filtered =
    selected === 'All'
      ? projects
      : projects.filter((p) => p.category === selected);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 76%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [selected]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-28 px-4 sm:px-6 lg:px-20 bg-void border-b border-white/8"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>// Selected Work</span>
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight"
          >
            Projects &amp; Deployments
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Web applications, enterprise tools, and AI systems — built, deployed, and documented.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                aria-pressed={selected === cat}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-250 ${
                  selected === cat
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan text-void font-bold shadow-[0_0_14px_rgba(52,211,153,0.28)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project) => {
            const isFeatured = !!(project as any).isFeaturedCaseStudy;
            const statusStyle = STATUS_STYLES[project.status || ''] ?? STATUS_STYLES['PROTOTYPE'];

            return (
              <article
                key={project.id}
                className={`group relative rounded-2xl bg-gradient-to-b from-void-2/95 to-void-3/95 p-5 backdrop-blur-xl transition-all duration-400 flex flex-col border ${
                  isFeatured
                    ? 'border-emerald-400/50 shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(52,211,153,0.18)] hover:border-emerald-300/70 hover:shadow-[0_18px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(52,211,153,0.3)] lg:col-span-2'
                    : 'border-white/8 hover:border-emerald-500/30 hover:shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(52,211,153,0.12)] hover:-translate-y-1.5'
                }`}
              >
                {/* Image */}
                <div className={`w-full rounded-xl overflow-hidden relative bg-slate-900 border border-white/8 mb-5 ${isFeatured ? 'h-56 sm:h-64' : 'h-44'}`}>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-void/90 backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full z-10">
                    {project.category}
                  </div>

                  {/* Status badge */}
                  {project.status && (
                    <div className={`absolute top-3 right-3 border font-mono text-[10px] font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1.5 backdrop-blur-md ${statusStyle}`}>
                      {(project.status === 'IN PROGRESS') && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                      )}
                      {project.status}
                    </div>
                  )}

                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-50 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <h3 className={`font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors ${isFeatured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-[10px] font-mono text-slate-400 group-hover:border-emerald-500/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/8">
                    {project.live && project.live !== '[YOUR_LIVE_LINK]' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-400 to-cyan hover:from-cyan hover:to-emerald-400 text-void font-bold text-xs rounded-full transition-all text-center flex items-center justify-center gap-1.5"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && project.github !== '[YOUR_REPO_LINK]' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-full transition-colors flex items-center gap-1.5"
                        aria-label={`View code for ${project.title}`}
                      >
                        <Code className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Code</span>
                      </a>
                    )}
                    {!project.live && (
                      <span className="text-xs text-slate-600 font-mono italic">
                        No live demo yet
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
