import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Take top 3 for initial view or all when expanded
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] py-20 px-6 sm:px-12 select-none">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="font-anton text-2xl sm:text-3xl tracking-[0.1em] text-white uppercase whitespace-nowrap">
              SELECTED ENGINEERING PROJECTS
            </h2>
            <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#d3121f]/60 via-[#1f1f1f] to-transparent" />
          </div>

          <a
            href="https://github.com/anandjadhav42004"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#a0a0a0] hover:text-[#d3121f] transition-all group"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#d3121f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* ── 3-Column Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayProjects.map((p, index) => {
              const projectNum = String(index + 1).padStart(2, '0');
              const targetUrl = p.live || p.github;

              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col h-full"
                  >
                    {/* Thumbnail Frame with Glowing Sheen on Hover */}
                    <div className="relative w-full aspect-[16/10] bg-[#121212] rounded-[4px] border border-[#1f1f1f] group-hover:border-[#d3121f] group-hover:shadow-[0_8px_30px_rgba(211,18,31,0.25)] transition-all duration-500 overflow-hidden mb-4">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop';
                        }}
                      />
                      
                      {/* Dark gradient overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Status Pill Overlay */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.14em] uppercase bg-black/80 border border-[#2a2a2a] group-hover:border-[#d3121f] text-[#d3121f] backdrop-blur-md transition-colors">
                        {p.category}
                      </div>

                      {/* Sparkle Tag on bottom left */}
                      <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/70 tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[#d3121f]">✦</span>
                        <span>EXPLORE ARCHITECTURE</span>
                      </div>
                    </div>

                    {/* Meta Row: 01/02/03 + Name/Category + Arrow */}
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <div className="flex items-start gap-4">
                        {/* Big Red Number */}
                        <span className="font-anton text-3xl text-[#d3121f] leading-none pt-0.5 group-hover:drop-shadow-[0_0_8px_rgba(211,18,31,0.7)] transition-all">
                          {projectNum}
                        </span>

                        {/* Title & Tags */}
                        <div className="flex flex-col">
                          <h3 className="font-anton text-base sm:text-lg tracking-wide text-white uppercase group-hover:text-[#d3121f] transition-colors leading-snug">
                            {p.title}
                          </h3>
                          <p className="text-xs text-[#8a8a8a] mt-1 font-medium tracking-wider uppercase">
                            {p.tags.slice(0, 3).join(' • ')}
                          </p>
                        </div>
                      </div>

                      {/* Arrow Icon with Glowing Hover Ring */}
                      <div className="w-9 h-9 rounded-full border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/15 group-hover:shadow-[0_0_15px_rgba(211,18,31,0.5)] transition-all">
                        <ArrowUpRight className="w-4 h-4 text-[#8a8a8a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Toggle to View More Projects ── */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group px-7 py-3 rounded border border-[#2a2a2a] bg-[#0d0d0d] text-xs font-semibold uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-white hover:border-[#d3121f] hover:shadow-[0_0_20px_rgba(211,18,31,0.4)] transition-all duration-300 flex items-center gap-3"
          >
            <span>{showAll ? 'Show Fewer Projects' : `View All ${projects.length} Engineering Projects`}</span>
            <span className="text-[#d3121f] group-hover:translate-y-0.5 transition-transform">
              {showAll ? '▲' : '▼'}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
