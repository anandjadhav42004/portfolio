import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Cpu, Sparkles } from 'lucide-react';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  'All',
  'AI / Machine Learning',
  'Full Stack Web',
  'Enterprise App'
];

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                          (selectedCategory === 'Enterprise App' && (p.category?.includes('Enterprise') || p.category?.includes('SAP'))));

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
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
  }, [selectedCategory]);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="py-28 px-6 lg:px-20 bg-void border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.15)] flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>// FEATURED PROJECTS & AI SYSTEM LAB</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Featured Works & Deployments
          </h2>
          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Engineered systems spanning AI authenticity verification, SAP BTP enterprise cloud backends, and responsive React applications.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan text-void font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/30'
                }`}
              >
                {cat === 'AI / Machine Learning' && <span className="mr-1.5">⚡</span>}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isFeatured = (project as any).isFeaturedCaseStudy || (project as any).isRoboticsCaseStudy;

            return (
              <div 
                key={project.id} 
                data-cursor={isFeatured ? "SPECS" : "VIEW"}
                className={`group relative rounded-[2rem] bg-gradient-to-b from-void-2/95 to-void-3/95 p-5 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between interactive ${
                  isFeatured 
                    ? 'border-2 border-emerald-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(52,211,153,0.25)] hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(52,211,153,0.4)] lg:col-span-2 lg:flex-row lg:gap-8'
                    : 'border border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(52,211,153,0.2)] hover:-translate-y-2'
                }`}
              >
                {/* For Featured Card: Left Column (Image & Status) */}
                <div className={isFeatured ? 'lg:w-1/2 flex flex-col justify-between' : ''}>
                  {/* Image Showcase */}
                  <div className={`w-full rounded-2xl overflow-hidden relative bg-slate-900 border border-white/10 ${
                    isFeatured ? 'h-60 sm:h-72 mb-4 lg:mb-0' : 'h-52 mb-5'
                  }`}>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-void/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-semibold px-3 py-1 rounded-full z-10 flex items-center gap-1.5">
                      {isFeatured && <Cpu className="w-3 h-3 text-emerald-400" />}
                      <span>{project.category || `DOMAIN #${project.id}`}</span>
                    </div>

                    {/* Featured / In Progress Badge */}
                    {isFeatured ? (
                      <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/60 text-emerald-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                        <Sparkles className="w-3 h-3 text-emerald-300" />
                        <span>FLAGSHIP AI SYSTEM</span>
                      </div>
                    ) : project.status === 'In Progress' ? (
                      <div className="absolute bottom-3 left-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1.5 shadow-lg shadow-amber-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span>IN PROGRESS</span>
                      </div>
                    ) : null}

                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                </div>

                {/* Right Column / Content */}
                <div className={isFeatured ? 'lg:w-1/2 flex flex-col justify-between pt-2 lg:pt-0' : 'flex flex-col justify-between flex-1'}>
                  <div>
                    <h3 className={`font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors ${
                      isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}>
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
                      {isFeatured ? (
                        <>
                          <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noreferrer" 
                            data-cursor="GO"
                            className="flex-1 py-3 px-5 bg-gradient-to-r from-emerald-400 to-cyan hover:from-cyan hover:to-emerald-400 text-void font-bold text-xs sm:text-sm rounded-full transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 group/btn"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Launch Live System</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </a>

                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noreferrer" 
                              data-cursor="CODE"
                              className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs sm:text-sm rounded-full transition-colors flex items-center gap-1.5"
                            >
                              <Code className="w-4 h-4 text-cyan" />
                              <span>Model Specs</span>
                            </a>
                          )}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
