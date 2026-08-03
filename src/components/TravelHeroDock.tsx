import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, ArrowRight, Sparkles } from 'lucide-react';

interface TravelHeroDockProps {
  onSelectCategory?: (category: string) => void;
}

export default function TravelHeroDock({ onSelectCategory }: TravelHeroDockProps) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Domains', icon: Sparkles },
    { id: 'sap', label: 'SAP ABAP', icon: Database },
    { id: 'ios', label: 'iOS Native', icon: Smartphone },
    { id: 'web', label: 'Full Stack', icon: Code2 },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-full max-w-4xl mx-auto mt-10 p-3 sm:p-4 rounded-3xl sm:rounded-full bg-void-2/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Domain Filter Pills */}
        <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-start to-accent-end text-void font-semibold shadow-lg shadow-cyan/20 scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-void' : 'text-cyan'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Separator for desktop */}
        <div className="hidden md:block h-8 w-[1px] bg-white/10" />

        {/* Availability & Action Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open for Q3 Contracts</span>
          </div>

          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-void font-semibold text-sm hover:bg-cyan hover:text-void transition-all duration-300 group shadow-lg hover:shadow-cyan/30"
          >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
