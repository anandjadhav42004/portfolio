import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { linkedinPost } from '../data/portfolio';

const LinkedInPost = () => {
  return (
    <section id="linkedin-post" className="py-24 px-6 lg:px-20 bg-void border-b border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase">
              // Thought Leadership & Write-ups
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-1">
              Latest LinkedIn Publication
            </h2>
          </div>
          <a
            href={linkedinPost.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide transition-all shadow-glow"
          >
            <FaLinkedinIn />
            <span>Follow on LinkedIn</span>
          </a>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-slate-400">
            <span>{linkedinPost.date}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Technical Article
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            {linkedinPost.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 max-w-3xl">
            {linkedinPost.excerpt}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LinkedInPost;
