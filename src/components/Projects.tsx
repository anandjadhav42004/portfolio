import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink, ArrowUpRight, Code } from 'lucide-react';
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
          <span className="px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-xs font-mono text-cyan uppercase tracking-wider">
            // Curated Portfolio Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Live web applications, enterprise ERP integration systems, e-commerce storefronts, and mobile applications with active deployments.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative rounded-[2rem] bg-gradient-to-b from-void-2/90 to-void-3/90 border border-white/10 p-5 backdrop-blur-xl transition-all duration-500 hover:border-cyan/40 hover:shadow-2xl hover:shadow-cyan/10 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Dribbble Style Hero Image Container */}
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 relative bg-void-2 border border-white/5">
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-void/90 backdrop-blur-md border border-white/15 text-cyan font-mono text-[10px] font-semibold px-3 py-1 rounded-full z-10">
                    {project.category || `DOMAIN #${project.id}`}
                  </div>

                  {/* Dribbble Star Rating Badge */}
                  <div className="absolute top-3 right-3 bg-void/90 backdrop-blur-md border border-white/15 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>4.9</span>
                  </div>

                  {/* Status Badge if In Progress */}
                  {project.status === 'In Progress' && (
                    <div className="absolute bottom-3 left-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1.5 shadow-lg shadow-amber-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>IN PROGRESS</span>
                    </div>
                  )}

                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan transition-colors">
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
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 group-hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dribbble Action Button Group */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-accent-start to-accent-end hover:from-cyan hover:to-accent-hover text-void font-bold text-xs rounded-full transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-cyan/10 group/btn"
                  >
                    <span>Live App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>

                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="py-2.5 px-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Code className="w-3.5 h-3.5" />
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
