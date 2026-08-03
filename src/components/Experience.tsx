import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';

const ExperienceItem = ({ exp, index }: any) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return '🎓';
      case 'hackathon':
        return '🏆';
      case 'freelance':
        return '💼';
      default:
        return '⭐';
    }
  };

  return (
    <motion.div className="relative">
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-md">
            {getIcon(exp.type)}
          </div>
          {index !== experience.length - 1 && (
            <div className="w-0.5 h-24 bg-gradient-to-b from-cyan to-transparent mt-2 opacity-50" />
          )}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1">
          <div className="p-6 bg-white/90 dark:bg-card-bg border border-slate-200 dark:border-white/10 rounded-2xl shadow-lg dark:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  {exp.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{exp.company}</p>
              </div>
              <span className="text-xs text-cyan font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                {exp.duration}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{exp.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 lg:px-20 bg-void border-b border-slate-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            05
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            My <span className="text-cyan">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div>
          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
