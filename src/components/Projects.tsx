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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      id="projects" 
      ref={containerRef} 
      className="py-24 px-6 lg:px-24 bg-brutalist-bg border-b-4 border-black relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-red mb-4 uppercase">・Selected Work</h2>
        <p className="text-3xl md:text-5xl font-sans font-black leading-none tracking-tight uppercase text-black mb-4">
          Featured Engineering Projects
        </p>
        <p className="max-w-3xl text-sm font-mono text-zinc-700 mb-12">
          Each project includes a live demo link so visitors can preview the deployed app directly from this section.
        </p>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white border-4 border-black p-6 brutalist-shadow-black rounded-none flex flex-col justify-between hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000000] transition-all duration-200"
            >
              <div>
                {/* Project Image Box */}
                <div className="w-full h-48 border-3 border-black rounded-none overflow-hidden mb-6 relative">
                  <div className="absolute top-3 left-3 bg-brutalist-red border-2 border-black text-white font-mono text-[10px] font-black uppercase px-2 py-0.5 shadow-[1px_1px_0px_#000000] z-10">
                    PROJECT #{project.id}
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <h3 className="text-2xl lg:text-3xl font-sans font-black uppercase tracking-tight text-black mb-3">
                  {project.title}
                </h3>
                
                <p className="font-mono text-zinc-950 text-xs font-semibold leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-brutalist-bg border-2 border-black rounded-none text-[9px] font-mono font-extrabold uppercase tracking-wider text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4 border-t-2 border-black pt-4">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-4 py-2 bg-brutalist-yellow border-2 border-black font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all"
                  >
                    LIVE DEMO ↗
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-4 py-2 bg-white border-2 border-black font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all"
                  >
                    GITHUB ↗
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

