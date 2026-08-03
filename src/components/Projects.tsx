import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink, ArrowUpRight, Code, Award } from 'lucide-react';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="py-28 px-6 lg:px-20 bg-void border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.15)] flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>// JAPAN CREATIVE SELECTION & SOTD NOMINEES</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Featured Works & Deployments
          </h2>
          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Crafted with WebGL micro-animations, SAP BTP cloud backends, and responsive React/Next.js frontend architectures.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              data-cursor="VIEW"
              className="group relative rounded-[2rem] bg-gradient-to-b from-void-2/95 to-void-3/95 border border-emerald-500/20 p-5 backdrop-blur-xl transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(52,211,153,0.2)] hover:-translate-y-2 active:-translate-y-1 active:border-emerald-400/40 active:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(52,211,153,0.2)] flex flex-col justify-between interactive"
            >
              <div>
                {/* Image Showcase */}
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 relative bg-slate-900 border border-white/10">
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-void/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-semibold px-3 py-1 rounded-full z-10">
                    {project.category || `DOMAIN #${project.id}`}
                  </div>

                  {/* SOTD Rating Badge */}
                  <div className="absolute top-3 right-3 bg-void/90 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>SOTD 9.5</span>
                  </div>

                  {/* Status Badge */}
                  {project.status === 'In Progress' && (
                    <div className="absolute bottom-3 left-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1.5 shadow-lg shadow-amber-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>IN PROGRESS</span>
                    </div>
                  )}

                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 group-hover:border-emerald-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    data-cursor="GO"
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan to-indigo-500 hover:from-indigo-600 hover:to-cyan text-void font-bold text-xs rounded-full transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-cyan/20 group/btn"
                  >
                    <span>Launch Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>

                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      data-cursor="CODE"
                      className="py-2.5 px-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Code className="w-3.5 h-3.5 text-cyan" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
