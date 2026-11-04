import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, Compass, Layout, Sliders, MousePointerClick, ShieldCheck, ArrowRight } from 'lucide-react';
import { fadeUp, ease } from '../lib/motion';

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string[];
  metric?: string;
}

const steps: ProcessStep[] = [
  {
    step: '01',
    phase: 'DISCOVER & EMPATHIZE',
    title: 'User Research & Problem Identification',
    icon: Search,
    description: 'Investigating operational friction through 1-on-1 contextual interviews and workflow shadowing. We uncover root pain points rather than treating superficial symptoms.',
    deliverables: ['Stakeholder Interviews', 'User Personas', 'Problem Statement Canvas'],
    metric: '4 Industry Interviews Conducted',
  },
  {
    step: '02',
    phase: 'DEFINE & STRUCTURE',
    title: 'Information Architecture & Journey Mapping',
    icon: Compass,
    description: 'Translating raw user insights into frictionless user flows and navigation trees. Eliminating redundant steps before a single line of high-fidelity UI is drawn.',
    deliverables: ['3-Stage User Journey Map', 'Hierarchical Site Tree', 'Task Flow Optimization'],
    metric: '6 Redundant Dialogs Removed',
  },
  {
    step: '03',
    phase: 'IDEATE & EXPLORE',
    title: 'Wireframing & Progressive Disclosure',
    icon: Layout,
    description: 'Rapid sketching of low-fidelity layouts to test content hierarchies. We design for progressive disclosure, keeping critical KPIs visible while secondary tools remain accessible.',
    deliverables: ['Paper Wireframes', 'Lo-Fi Figma Layouts', 'Responsive Grid Specs'],
    metric: '8 Layout Iterations Tested',
  },
  {
    step: '04',
    phase: 'DESIGN SYSTEM & CRAFT',
    title: 'UI Design System & Component Library',
    icon: Sliders,
    description: 'Building accessible, enterprise-grade design tokens adhering to SAP Fiori 3.0 Horizon and WCAG 2.1 AA contrast standards. Every token is unified across colors, spacing, and typography.',
    deliverables: ['Figma Atomic Library', 'WCAG 2.1 AA Audit', 'Design Token Variables'],
    metric: '100% Contrast Compliant',
  },
  {
    step: '05',
    phase: 'PROTOTYPE & VALIDATE',
    title: 'Interactive Prototyping & Usability Testing',
    icon: ShieldCheck,
    description: 'Bringing the system to life with clickable micro-interactions and realistic data models, followed by rigorous System Usability Scale (SUS) benchmark testing with actual users.',
    deliverables: ['Figma Clickable Prototype', 'SUS Benchmarking Report', 'Interactive React/SAPUI5'],
    metric: 'SUS 88/100 (Grade A) & 34% Speedup',
  },
];

export default function DesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 100, damping: 24, restDelta: 0.001 }
  );

  return (
    <section id="process" className="w-full bg-[#070707] border-b border-[#1f1f1f] py-20 md:py-32 px-5 sm:px-8 md:px-12 relative overflow-hidden select-none">
      
      {/* ── Background Subtle Designer Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#d3121f] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#d3121f] animate-pulse" />
              <span>UI/UX DESIGN PHILOSOPHY</span>
            </div>
            <h2
              className="font-anton tracking-[0.08em] text-white uppercase leading-none"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
            >
              HOW I DESIGN &amp; BUILD
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#888] max-w-md font-sans leading-relaxed">
            Every interface follows an intentional 5-stage human-centered design framework — bridging user empathy, accessibility tokens, and engineering feasibility.
          </p>
        </div>

        {/* ── Interactive Timeline with Scroll-Filling Line ── */}
        <div ref={containerRef} className="relative">

          {/* 1. Track: Background Inactive Line */}
          <div
            className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] bg-[#1a1a1a] -translate-x-1/2"
            aria-hidden="true"
          />

          {/* 2. Track: Active Scroll-Filling Glowing Crimson Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-4 w-[2px] bg-gradient-to-b from-[#d3121f] via-[#ff4d5a] to-[#d3121f] -translate-x-1/2 shadow-[0_0_16px_rgba(211,18,31,0.9)]"
            aria-hidden="true"
          />

          {/* 3. Steps List */}
          <div className="space-y-12 md:space-y-20">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={s.step}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central Timeline Milestone Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a] border-2 border-[#2a2a2a] group-hover:border-[#d3121f] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    >
                      <span className="font-anton text-xs md:text-sm text-[#d3121f]">
                        {s.step}
                      </span>
                    </motion.div>
                  </div>

                  {/* Left / Right Card Layout on Desktop */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.8, ease }}
                      className="p-6 md:p-8 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#d3121f]/50 hover:shadow-[0_10px_35px_rgba(211,18,31,0.15)] transition-all group"
                    >
                      {/* Phase Tag */}
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#d3121f] bg-[#d3121f]/10 px-2 py-0.5 rounded border border-[#d3121f]/30">
                          {s.phase}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-anton text-lg sm:text-xl md:text-2xl text-white uppercase tracking-wide mb-3 group-hover:text-[#d3121f] transition-colors">
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed mb-5">
                        {s.description}
                      </p>

                      {/* Deliverables Tags */}
                      <div className={`flex flex-wrap gap-1.5 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {s.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-[#141414] border border-[#242424] text-[#888]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Metric Highlight Badge */}
                      {s.metric && (
                        <div className={`pt-3 border-t border-[#1a1a1a] flex items-center gap-2 text-xs font-semibold text-[#ff4d5a] ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d3121f] animate-ping" />
                          <span>{s.metric}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
