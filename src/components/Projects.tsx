import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { projects } from '../data/portfolio';
import { fadeUp, stagger, buttonHover, buttonTap, springTransition } from '../lib/motion';
import { TiltCard } from './motion/TiltCard';
import { Magnetic } from './motion/Magnetic';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Take top 3 for initial view or all when expanded
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] py-16 md:py-32 px-5 sm:px-8 md:px-12 overflow-x-clip select-none">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[1440px] mx-auto"
      >

        {/* ── Section Header with Scroll Reveal ── */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-10 md:mb-14">
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <h2
              className="font-anton tracking-[0.1em] text-white uppercase"
              style={{ fontSize: 'clamp(20px, 4vw, 32px)' }}
            >
              SELECTED ENGINEERING PROJECTS
            </h2>
            <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#d3121f]/60 via-[#1f1f1f] to-transparent" />
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
              <span>VIEW ALL ON GITHUB</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#d3121f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* ── 3-Column Projects Grid with 3D Tilt ── */}
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
                      {/* Thumbnail Frame with Glowing Sheen on Hover */}
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
                        
                        {/* Dark gradient overlay for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Status Pill Overlay */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.14em] uppercase bg-black/85 border border-[#2a2a2a] group-hover:border-[#d3121f] text-[#d3121f] backdrop-blur-md transition-colors">
                          {p.category}
                        </div>

                        {/* Slide-in "View Project →" pill on hover */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#d3121f] text-white text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_12px_rgba(211,18,31,0.6)]">
                          <span>View Project</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Meta Row: 01/02/03 + Name/Category + Arrow */}
                      <div className="flex items-start justify-between gap-4 pt-1 mb-3">
                        <div className="flex items-start gap-3">
                          {/* Big Red Number */}
                          <span className="font-anton text-2xl sm:text-3xl text-[#d3121f] leading-none pt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(211,18,31,0.7)] transition-all">
                            {projectNum}
                          </span>

                          {/* Title & Tags */}
                          <div className="flex flex-col">
                            <h3 className="font-anton text-base tracking-wide text-white uppercase group-hover:text-[#d3121f] transition-colors leading-snug">
                              {p.title}
                            </h3>
                            <p className="text-[11px] text-[#8a8a8a] mt-1 font-medium tracking-wider uppercase">
                              {p.tags.slice(0, 3).join(' • ')}
                            </p>
                          </div>
                        </div>

                        {/* Arrow Icon with Glowing Hover Ring */}
                        <div className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/15 group-hover:shadow-[0_0_15px_rgba(211,18,31,0.5)] transition-all">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#8a8a8a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </div>

                      {/* Recruiter Outcome Highlight Pill */}
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

        {/* ── Toggle to View More Projects with Magnetic Hover ── */}
        <motion.div variants={fadeUp} className="mt-14 flex justify-center">
          <Magnetic>
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={buttonHover}
              whileTap={buttonTap}
              transition={springTransition}
              className="group min-h-[44px] px-7 py-3 rounded border border-[#2a2a2a] bg-[#0d0d0d] text-xs font-semibold uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-white hover:border-[#d3121f] hover:shadow-[0_0_20px_rgba(211,18,31,0.4)] transition-all flex items-center gap-3"
            >
              <span>{showAll ? 'Show Fewer Projects' : `View All ${projects.length} Engineering Projects`}</span>
              <span className="text-[#d3121f] group-hover:translate-y-0.5 transition-transform">
                {showAll ? '▲' : '▼'}
              </span>
            </motion.button>
          </Magnetic>
        </motion.div>

      </motion.div>
    </section>
  );
}

      </motion.div>
    </section>
  );
}
