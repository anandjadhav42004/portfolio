import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Sparkles, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { projects } from '../data/portfolio';
import { fadeUp, stagger, buttonHover, buttonTap, springTransition } from '../lib/motion';
import { TiltCard } from './motion/TiltCard';
import { Magnetic } from './motion/Magnetic';
import { UXCaseStudyModal } from './UXCaseStudyModal';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Take top 3 for initial view or all when expanded in grid mode
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] py-16 md:py-32 px-5 sm:px-8 md:px-12 overflow-x-clip select-none">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[1440px] mx-auto"
      >

        {/* ── Section Header with View Mode Switcher ── */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-8 md:mb-12">
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <h2
              className="font-anton tracking-[0.1em] text-white uppercase"
              style={{ fontSize: 'clamp(20px, 4vw, 32px)' }}
            >
              SELECTED ENGINEERING PROJECTS
            </h2>
            <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#d3121f]/60 via-[#1f1f1f] to-transparent" />
          </div>

          <div className="flex items-center gap-3">
            {/* Horizontal / Grid View Toggle */}
            <div className="flex items-center bg-[#121212] border border-[#222] rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode('horizontal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'horizontal'
                    ? 'bg-[#d3121f] text-white shadow-[0_0_12px_rgba(211,18,31,0.5)]'
                    : 'text-[#888] hover:text-white'
                }`}
                aria-label="Horizontal Showcase View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#d3121f] text-white shadow-[0_0_12px_rgba(211,18,31,0.5)]'
                    : 'text-[#888] hover:text-white'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Grid</span>
              </button>
            </div>

            <Magnetic>
              <motion.a
                href="https://github.com/anandjadhav42004"
                target="_blank"
                rel="noreferrer"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springTransition}
                className="inline-flex items-center gap-2 min-h-[44px] text-xs font-semibold tracking-[0.16em] uppercase text-[#a0a0a0] hover:text-[#d3121f] transition-colors group px-3 py-2"
              >
                <span className="hidden sm:inline">VIEW ALL ON GITHUB</span>
                <span className="sm:hidden">GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#d3121f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>

        {/* ── MODE 1: Horizontal Scrolling Project Showcase ── */}
        {viewMode === 'horizontal' ? (
          <div className="relative">
            {/* Scroll Navigation Controls (Desktop) */}
            <div className="hidden md:flex items-center justify-between absolute -top-14 right-0 gap-2 z-10">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-[#222] bg-[#0c0c0c] hover:border-[#d3121f] hover:text-[#d3121f] flex items-center justify-center text-[#888] transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-[#222] bg-[#0c0c0c] hover:border-[#d3121f] hover:text-[#d3121f] flex items-center justify-center text-[#888] transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Horizontal Track with Snap */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent -mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:px-0"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projects.map((p, index) => {
                const projectNum = String(index + 1).padStart(2, '0');
                const targetUrl = p.live || p.github;

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="w-[85vw] sm:w-[380px] md:w-[440px] flex-shrink-0 snap-start h-full"
                  >
                    <TiltCard>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col h-[520px] bg-[#0d0d0d] p-5 rounded-xl border border-[#1f1f1f] hover:border-[#d3121f]/60 transition-colors focus-visible:outline-[#d3121f]"
                      >
                        {/* Thumbnail with Smooth Image Zoom & Overlay */}
                        <div className="relative w-full aspect-[16/10] bg-[#121212] rounded-lg border border-[#1f1f1f] group-hover:border-[#d3121f] group-hover:shadow-[0_8px_30px_rgba(211,18,31,0.25)] transition-all duration-500 overflow-hidden mb-4">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop';
                            }}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.14em] uppercase bg-black/85 border border-[#2a2a2a] group-hover:border-[#d3121f] text-[#d3121f] backdrop-blur-md transition-colors">
                            {p.category}
                          </div>

                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#d3121f] text-white text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_12px_rgba(211,18,31,0.6)]">
                            <span>View Project</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Project Header Meta */}
                        <div className="flex items-start justify-between gap-4 pt-1 mb-3">
                          <div className="flex items-start gap-3">
                            <span className="font-anton text-3xl sm:text-4xl text-[#d3121f] leading-none pt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(211,18,31,0.7)] transition-all">
                              {projectNum}
                            </span>

                            <div className="flex flex-col">
                              <h3 className="font-anton text-base tracking-wide text-white uppercase group-hover:text-[#d3121f] transition-colors leading-snug">
                                {p.title}
                              </h3>
                              <p className="text-[11px] text-[#8a8a8a] mt-1 font-medium tracking-wider uppercase">
                                {p.tags.slice(0, 3).join(' • ')}
                              </p>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/15 group-hover:shadow-[0_0_15px_rgba(211,18,31,0.5)] transition-all">
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a8a8a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                        </div>

                        {/* Interactive UX Case Study Trigger for Project 01 */}
                        {p.id === 1 && (
                          <div className="mt-2 mb-1 pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCaseStudyOpen(true);
                              }}
                              className="w-full py-2 px-3 rounded bg-gradient-to-r from-[#d3121f]/20 to-transparent border border-[#d3121f]/50 hover:border-[#d3121f] text-[#ff4d5a] hover:text-white flex items-center justify-between text-[11px] font-bold tracking-[0.12em] uppercase transition-all shadow-[0_0_15px_rgba(211,18,31,0.2)] hover:shadow-[0_0_20px_rgba(211,18,31,0.5)] group/btn cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#d3121f] animate-pulse" />
                                <span>View UX Case Study (8-Step Process)</span>
                              </span>
                              <span className="text-xs group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                          </div>
                        )}

                        {/* Recruiter Outcome Highlight Pill */}
                        {p.description && (
                          <div className="mt-auto pt-3 border-t border-[#1a1a1a] flex items-center gap-2 text-[11px] text-[#a0a0a0] leading-relaxed">
                            <TrendingUp className="w-3.5 h-3.5 text-[#d3121f] flex-shrink-0" />
                            <span className="line-clamp-2">{p.description}</span>
                          </div>
                        )}
                      </a>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── MODE 2: Traditional Responsive Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayProjects.map((p, index) => {
                const projectNum = String(index + 1).padStart(2, '0');
                const targetUrl = p.live || p.github;

                return (
                  <motion.article
                    key={p.id}
                    variants={fadeUp}
                    className="flex flex-col h-full"
                  >
                    <TiltCard>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col h-full bg-[#0d0d0d] p-4 rounded-lg border border-[#1f1f1f] hover:border-[#d3121f]/60 transition-colors focus-visible:outline-[#d3121f]"
                      >
                        <div className="relative w-full aspect-[16/10] bg-[#121212] rounded-[4px] border border-[#1f1f1f] group-hover:border-[#d3121f] group-hover:shadow-[0_8px_30px_rgba(211,18,31,0.25)] transition-all duration-500 overflow-hidden mb-4">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop';
                            }}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.14em] uppercase bg-black/85 border border-[#2a2a2a] group-hover:border-[#d3121f] text-[#d3121f] backdrop-blur-md transition-colors">
                            {p.category}
                          </div>

                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#d3121f] text-white text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_12px_rgba(211,18,31,0.6)]">
                            <span>View Project</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-4 pt-1 mb-3">
                          <div className="flex items-start gap-3">
                            <span className="font-anton text-2xl sm:text-3xl text-[#d3121f] leading-none pt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(211,18,31,0.7)] transition-all">
                              {projectNum}
                            </span>

                            <div className="flex flex-col">
                              <h3 className="font-anton text-base tracking-wide text-white uppercase group-hover:text-[#d3121f] transition-colors leading-snug">
                                {p.title}
                              </h3>
                              <p className="text-[11px] text-[#8a8a8a] mt-1 font-medium tracking-wider uppercase">
                                {p.tags.slice(0, 3).join(' • ')}
                              </p>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/15 group-hover:shadow-[0_0_15px_rgba(211,18,31,0.5)] transition-all">
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a8a8a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                        </div>

                        {p.id === 1 && (
                          <div className="mt-2 mb-1 pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCaseStudyOpen(true);
                              }}
                              className="w-full py-2 px-3 rounded bg-gradient-to-r from-[#d3121f]/20 to-transparent border border-[#d3121f]/50 hover:border-[#d3121f] text-[#ff4d5a] hover:text-white flex items-center justify-between text-[11px] font-bold tracking-[0.12em] uppercase transition-all shadow-[0_0_15px_rgba(211,18,31,0.2)] hover:shadow-[0_0_20px_rgba(211,18,31,0.5)] group/btn cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#d3121f] animate-pulse" />
                                <span>View UX Case Study (8-Step Process)</span>
                              </span>
                              <span className="text-xs group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                          </div>
                        )}

                        {p.description && (
                          <div className="mt-auto pt-3 border-t border-[#1a1a1a] flex items-center gap-2 text-[11px] text-[#a0a0a0] leading-relaxed">
                            <TrendingUp className="w-3.5 h-3.5 text-[#d3121f] flex-shrink-0" />
                            <span className="line-clamp-2">{p.description}</span>
                          </div>
                        )}
                      </a>
                    </TiltCard>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ── Grid View: View All / Fewer Toggle Button ── */}
        {viewMode === 'grid' && (
          <motion.div variants={fadeUp} className="mt-14 flex justify-center">
            <Magnetic>
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springTransition}
                className="group min-h-[44px] px-7 py-3 rounded border border-[#2a2a2a] bg-[#0d0d0d] text-xs font-semibold uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-white hover:border-[#d3121f] hover:shadow-[0_0_20px_rgba(211,18,31,0.4)] transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>{showAll ? 'Show Fewer Projects' : `View All ${projects.length} Engineering Projects`}</span>
                <span className="text-[#d3121f] group-hover:translate-y-0.5 transition-transform">
                  {showAll ? '▲' : '▼'}
                </span>
              </motion.button>
            </Magnetic>
          </motion.div>
        )}

      </motion.div>

      {/* ── 8-Step UX Case Study Modal (SAP Prognos) ── */}
      <UXCaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />
    </section>
  );
}
