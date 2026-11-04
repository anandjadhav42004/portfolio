import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, TrendingUp, Users, Layout, Sliders, ArrowUpRight, 
  Award, Search, Compass, MousePointerClick, Layers, ShieldCheck, FileCheck
} from 'lucide-react';
import { ease } from '../lib/motion';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface UXCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UXCaseStudyModal({ isOpen, onClose }: UXCaseStudyModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Problem Identification',
      icon: Search,
      tag: 'Discovery',
      content: 'Plant supply chain planners operated on fragmented Excel sheets and disconnected ML notebooks. Lack of real-time visual forecast comparisons caused frequent stockouts, excess inventory, and an average 18% planning discrepancy.',
      deliverable: 'Problem statement canvas & stakeholder impact map'
    },
    {
      num: '02',
      title: 'User Research',
      icon: Users,
      tag: 'Empathy',
      content: 'Conducted 4 contextual interviews with industrial planners and inventory controllers. Found 82% felt overwhelmed by raw mathematical outputs and needed confidence metrics over raw model statistics.',
      deliverable: 'Synthesized interview insights & affinity map'
    },
    {
      num: '03',
      title: 'User Personas',
      icon: Compass,
      tag: 'Modeling',
      content: 'Crafted primary persona "Vikram (38), Lead Inventory Planner". Goal: Validate demand swings before weekly purchase orders. Pain point: No unified dashboard to cross-check Prophet vs. XGBoost without writing code.',
      deliverable: 'Primary & secondary behavioral personas'
    },
    {
      num: '04',
      title: 'User Journey Mapping',
      icon: Layers,
      tag: 'Flow Design',
      content: 'Mapped end-to-end user journey across 3 core phases: Ingest Data → Compare Predictions → Sync to SAP ERP. Eliminated 6 redundant confirmation modals, streamlining end-to-end task flow.',
      deliverable: 'As-is vs. To-be journey maps & decision matrix'
    },
    {
      num: '05',
      title: 'Wireframing & IA',
      icon: Layout,
      tag: 'Architecture',
      content: 'Sketched low-fidelity paper wireframes exploring split-screen comparison vs. tabbed inspection. Chose hierarchical progressive disclosure to keep historical MAPE error curves visible while tweaking lead-time parameters.',
      deliverable: 'Lo-fi wireframes & 3-stage information architecture'
    },
    {
      num: '06',
      title: 'UI Design & Tokens',
      icon: Sliders,
      tag: 'Visual System',
      content: 'Built high-fidelity design system aligned with SAP Fiori 3.0 Horizon. Enforced WCAG 2.1 AA accessibility contrast, calibrated 8px layout grid, and applied deep charcoal backgrounds with signature crimson telemetry alerts (#d3121f).',
      deliverable: 'Figma component library & design token spec'
    },
    {
      num: '07',
      title: 'Interactive Prototypes',
      icon: MousePointerClick,
      tag: 'Interaction',
      content: 'Constructed responsive interactive prototype with realistic data filtering, hover states, and drill-down sliders. Verified smooth micro-interactions under 100ms response time on mobile and desktop viewports.',
      deliverable: 'High-fidelity clickable Figma & SAPUI5 prototypes'
    },
    {
      num: '08',
      title: 'Usability Testing & Metrics',
      icon: ShieldCheck,
      tag: 'Validation',
      content: 'Conducted unmoderated usability sessions with 6 participants: System Usability Scale (SUS) reached 88/100 (Grade A). Average task completion time dropped by 34%, with 100% first-trial task success rate.',
      deliverable: 'Usability evaluation report & SUS benchmarks'
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 text-white p-5 sm:p-8 md:p-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#2a2a2a] bg-black/60 hover:border-[#d3121f] hover:text-[#d3121f] transition-colors flex items-center justify-center text-[#a0a0a0] cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Designer Viewport Coordinates & Header Badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#666] mb-3">
            <div className="flex items-center gap-2 text-[#d3121f] font-bold tracking-[0.2em] uppercase">
              <Award className="w-4 h-4 text-[#d3121f]" />
              <span>UX/UI METHODOLOGY &bull; 8-STEP END-TO-END CASE STUDY</span>
            </div>
            <div className="hidden sm:block font-mono tracking-widest text-[#555]">
              FIGMA // SAPUI5 // HORIZON DS
            </div>
          </div>

          <h2 className="font-anton text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-2 leading-tight">
            SAP PROGNOS — AI DEMAND FORECASTING
          </h2>
          <p className="text-xs sm:text-sm text-[#888] mb-6">
            A comprehensive design thinking journey from manufacturing shopfloor friction to an accessible enterprise forecasting cockpit.
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mb-8 pb-6 border-b border-[#1f1f1f]">
            <span className="px-3 py-1 rounded bg-[#141414] border border-[#262626] text-white font-medium">
              Role: Lead UX/UI &amp; Frontend
            </span>
            <span className="px-3 py-1 rounded bg-[#141414] border border-[#262626] text-white font-medium">
              Method: 8-Stage Double Diamond
            </span>
            <span className="px-3 py-1 rounded bg-[#141414] border border-[#262626] text-white font-medium">
              Validation: 88 SUS Score (Grade A)
            </span>
            <span className="px-3 py-1 rounded bg-[#141414] border border-[#d3121f]/40 text-[#ff4d5a] font-medium">
              34% Faster Task Completion
            </span>
          </div>

          {/* 8-Step Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f] hover:border-[#d3121f]/50 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f]">
                        <span className="font-mono text-xs bg-[#d3121f]/15 border border-[#d3121f]/40 px-2 py-0.5 rounded text-[#ff4d5a]">
                          {s.num}
                        </span>
                        <span>{s.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#181818] border border-[#2a2a2a] text-[#888]">
                        {s.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#a0a0a0] leading-relaxed mt-2.5">
                      {s.content}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center gap-2 text-[11px] text-[#777] font-mono">
                    <FileCheck className="w-3.5 h-3.5 text-[#d3121f] flex-shrink-0" />
                    <span className="truncate">{s.deliverable}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Interactive Before & After Transformation Slider ── */}
          <BeforeAfterSlider />

          {/* Key Design Impact Banner */}
          <div className="p-5 rounded-lg bg-gradient-to-r from-[#180a0c] via-[#121212] to-[#121212] border border-[#d3121f]/40 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#ff4d5a] mb-1">
                Measured UX Design Impact
              </div>
              <p className="text-xs text-[#a0a0a0]">
                Validated through standardized System Usability Scale (SUS) benchmark testing with actual enterprise users.
              </p>
            </div>
            <div className="flex items-center gap-6 sm:border-l sm:border-[#2a2a2a] sm:pl-6 flex-shrink-0">
              <div>
                <div className="text-2xl font-anton text-[#ff3344] leading-none">34%</div>
                <div className="text-[10px] text-[#888] uppercase tracking-wider mt-1">Faster Workflow</div>
              </div>
              <div>
                <div className="text-2xl font-anton text-white leading-none">88/100</div>
                <div className="text-[10px] text-[#888] uppercase tracking-wider mt-1">SUS Score (Grade A)</div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4">
            <a
              href="https://sap-forecast.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-[#d3121f] transition-colors"
            >
              <span>Explore Live Platform</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/anandjadhav42004/sap_Forecast"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded border border-[#2a2a2a] bg-[#141414] hover:border-[#d3121f] text-xs font-semibold tracking-[0.14em] uppercase text-[#a0a0a0] hover:text-white transition-colors"
              >
                GitHub Repo
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded bg-[#d3121f] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#e01422] transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default UXCaseStudyModal;
