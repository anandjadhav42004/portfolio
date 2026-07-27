import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub, FiLayers, FiCode, FiCheckCircle } from 'react-icons/fi';

export interface BuildingDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  commits?: number;
  height?: number;
  highlight?: boolean;
}

interface BuildingDrawerProps {
  building: BuildingDetails | null;
  onClose: () => void;
}

export const BuildingDrawer: React.FC<BuildingDrawerProps> = ({ building, onClose }) => {
  if (!building) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex justify-end pointer-events-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-void/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-void-2 border-l border-white/10 p-6 shadow-2xl overflow-y-auto pointer-events-auto flex flex-col justify-between text-left font-sans"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold">
                <FiLayers />
                <span>{building.category}</span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close building inspection drawer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Title & Badge */}
            <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
              {building.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-6">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <FiCheckCircle /> Verified 3D Skyscraper
              </span>
              {building.commits && (
                <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                  {building.commits} Commits
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {building.description}
            </p>

            {/* Tech Badges */}
            <div className="mb-8">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FiCode /> Tech Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {building.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs & Action Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            {building.liveUrl && (
              <a
                href={building.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Live Application</span>
                <FiExternalLink />
              </a>
            )}

            {building.githubUrl && (
              <a
                href={building.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <FiGithub />
                <span>View GitHub Repository</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
