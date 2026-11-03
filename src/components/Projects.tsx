import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Take top 3 for initial view or all when expanded
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] py-20 px-6 sm:px-12">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="font-anton text-2xl sm:text-3xl tracking-[0.1em] text-white uppercase whitespace-nowrap">
              SELECTED ENGINEERING PROJECTS
            </h2>
            <div className="hidden sm:block flex-1 h-[1px] bg-[#1f1f1f]" />
          </div>

          <a
            href="https://github.com/anandjadhav42004"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#a0a0a0] hover:text-[#d3121f] transition-colors group"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#d3121f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* ── 3-Column Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((p, index) => {
            const projectNum = String(index + 1).padStart(2, '0');
            const targetUrl = p.live || p.github;

            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col cursor-pointer"
              >
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col h-full"
                >
                  {/* Thumbnail Frame */}
                  <div className="relative w-full aspect-[16/10] bg-[#121212] rounded-[4px] border border-[#1f1f1f] group-hover:border-[#d3121f] transition-colors overflow-hidden mb-4">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image for reliable visual rendering
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop';
                      }}
                    />
                    
                    {/* Status Pill Overlay */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-[0.12em] uppercase bg-black/75 border border-[#1f1f1f] text-[#d3121f] backdrop-blur-sm">
                      {p.category}
                    </div>
                  </div>

                  {/* Meta Row: 01/02/03 + Name/Category + Arrow */}
                  <div className="flex items-start justify-between gap-4 pt-1">
                    <div className="flex items-start gap-4">
                      {/* Big Red Number */}
                      <span className="font-anton text-2xl text-[#d3121f] leading-none pt-0.5">
                        {projectNum}
                      </span>

                      {/* Title & Tags */}
                      <div className="flex flex-col">
                        <h3 className="font-anton text-base sm:text-lg tracking-wide text-white uppercase group-hover:text-[#d3121f] transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#6b6b6b] mt-1 font-medium tracking-wider uppercase">
                          {p.tags.slice(0, 3).join(' • ')}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center flex-shrink-0 group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#d3121f] transition-colors" />
                    </div>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* ── Toggle to View More Projects ── */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 rounded border border-[#1f1f1f] text-xs font-semibold uppercase tracking-[0.18em] text-[#a0a0a0] hover:text-white hover:border-[#d3121f] transition-colors"
          >
            {showAll ? 'Show Fewer Projects' : `View All ${projects.length} Engineering Projects`}
          </button>
        </div>

      </div>
    </section>
  );
}
