import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
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
      id="projects" 
      ref={containerRef} 
      className="py-24 px-6 lg:px-20 bg-void border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase">
            // Selected Portfolio Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Live web platforms, enterprise systems, e-commerce storefronts, and mobile applications with active deployments and GitHub source repositories.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between group transition-all duration-300 hover:border-indigo-500/40"
            >
              <div>
                {/* Project Image Box */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-5 relative bg-void-2 border border-white/5">
                  <div className="absolute top-3 left-3 bg-void/90 backdrop-blur-md border border-white/10 text-indigo-300 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full z-10">
                    {project.category || `PROJECT #${project.id}`}
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Live App</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                  </a>
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
