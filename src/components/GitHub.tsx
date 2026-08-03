import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

export interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

interface GitHubStats {
  contributions: number;
  repos: number;
  followers: number;
}

interface GitHubProps {
  repos?: Repo[];
  stats?: GitHubStats;
  error?: string;
}

const GitHub = ({ repos = [], stats = { contributions: 0, repos: 0, followers: 0 }, error }: GitHubProps) => {
  return (
    <section id="github" className="py-24 px-6 lg:px-20 bg-void border-b border-slate-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            06
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Building on <span className="text-cyan">GitHub</span>
          </h2>
        </div>

        {error ? (
          <div className="text-center py-12 text-rose-500 font-bold">
            Could not load live GitHub data
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: FaGithub, label: 'Repositories', value: stats.repos },
                { icon: FaStar, label: 'Stars Earned', value: stats.followers },
                { icon: FaCodeBranch, label: 'Contributions', value: '1.5k+' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10 rounded-2xl text-center shadow-lg dark:shadow-xl transition-all"
                  >
                    <Icon className="text-3xl text-cyan mb-3 mx-auto" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10 rounded-2xl transition-all group shadow-lg dark:shadow-xl hover:border-cyan/40"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-normal">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><FaCodeBranch className="text-cyan" /> {repo.forks}</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">{repo.language}</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHub;
