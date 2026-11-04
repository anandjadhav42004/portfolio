import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, TrendingUp, Users, Layout, Sliders, ArrowUpRight, Award } from 'lucide-react';
import { ease } from '../lib/motion';

interface UXCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UXCaseStudyModal({ isOpen, onClose }: UXCaseStudyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
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
          transition={{ duration: 0.4, ease }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] z-10 text-white p-6 sm:p-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#2a2a2a] bg-black/60 hover:border-[#d3121f] hover:text-[#d3121f] transition-colors flex items-center justify-center text-[#a0a0a0]"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#d3121f] mb-3">
            <Award className="w-4 h-4 text-[#d3121f]" />
            <span>UI/UX DESIGN CASE STUDY &bull; 8-WEEK SPRINT</span>
          </div>

          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-4">
            SAP PROGNOS — AI DEMAND FORECASTING
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#a0a0a0] mb-8 pb-6 border-b border-[#1f1f1f]">
            <span className="px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-white">
              Role: Lead UX/UI &amp; Frontend
            </span>
            <span className="px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-white">
              Tools: Figma, SAPUI5, React, Python
            </span>
            <span className="px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-white">
              Output: Production Fiori Web Platform
            </span>
          </div>

          {/* Grid of Case Study Steps */}
          <div className="space-y-8 text-sm">
            
            {/* Step 1 & 2: Problem & Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f] mb-2">
                  <span className="font-mono text-sm">01.</span> Problem Statement
                </div>
                <p className="text-[#a0a0a0] leading-relaxed text-xs sm:text-sm">
                  Plant supply chain planners operated on fragmented Excel sheets and disparate ML notebooks. Lack of real-time visual forecast comparisons caused frequent stockouts and an average 18% planning discrepancy.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f] mb-2">
                  <span className="font-mono text-sm">02.</span> User Research &amp; Personas
                </div>
                <p className="text-[#a0a0a0] leading-relaxed text-xs sm:text-sm">
                  Conducted 4 qualitative interviews with industrial planners. Created persona <em>"Vikram, Lead Inventory Planner"</em> who needed transparent model validation without requiring raw Python coding knowledge.
                </p>
              </div>
            </div>

            {/* Step 3: Wireframes & Information Architecture */}
            <div className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f] mb-3">
                <Layout className="w-4 h-4 text-[#d3121f]" />
                <span className="font-mono text-sm">03.</span> Wireframing &amp; Progressive Disclosure
              </div>
              <p className="text-[#a0a0a0] leading-relaxed text-xs sm:text-sm mb-4">
                Structured the user journey into 3 distinct stages:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded bg-[#0a0a0a] border border-[#222]">
                  <div className="font-bold text-white mb-1">1. Ingest &amp; Clean</div>
                  <div className="text-[#777]">Drag-and-drop CSV validation with automated anomaly flags.</div>
                </div>
                <div className="p-3 rounded bg-[#0a0a0a] border border-[#222]">
                  <div className="font-bold text-white mb-1">2. Model Compare</div>
                  <div className="text-[#777]">Side-by-side Prophet vs. XGBoost MAPE error curves.</div>
                </div>
                <div className="p-3 rounded bg-[#0a0a0a] border border-[#222]">
                  <div className="font-bold text-white mb-1">3. Executive Export</div>
                  <div className="text-[#777]">One-click SAP ERP scenario sync and PDF executive summaries.</div>
                </div>
              </div>
            </div>

            {/* Step 4: UI Design System & Usability Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f] mb-2">
                  <Sliders className="w-4 h-4 text-[#d3121f]" />
                  <span className="font-mono text-sm">04.</span> Design System &amp; Tokens
                </div>
                <ul className="space-y-2 text-xs text-[#a0a0a0]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d3121f] mt-0.5 flex-shrink-0" />
                    <span>Adhered strictly to SAP Fiori 3.0 Horizon accessibility guidelines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d3121f] mt-0.5 flex-shrink-0" />
                    <span>Tested for WCAG 2.1 AA color contrast across dark and high-contrast modes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d3121f] mt-0.5 flex-shrink-0" />
                    <span>Reduced visual cognitive load by grouping 14 parameters into 3 accordion presets.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-lg bg-[#121212] border border-[#1f1f1f]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3121f] mb-2">
                  <TrendingUp className="w-4 h-4 text-[#d3121f]" />
                  <span className="font-mono text-sm">05.</span> Usability Testing Results
                </div>
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#222]">
                    <span className="text-[#a0a0a0]">Workflow Duration:</span>
                    <span className="font-bold text-[#ff3344] font-mono">34% Faster</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#222]">
                    <span className="text-[#a0a0a0]">System Usability Scale (SUS):</span>
                    <span className="font-bold text-white font-mono">88 / 100 (Grade A)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a0a0a0]">User Task Completion Rate:</span>
                    <span className="font-bold text-[#ff3344] font-mono">100% on First Trial</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="mt-8 pt-6 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4">
            <a
              href="https://github.com/anandjadhav42004/sap_Forecast"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-[#d3121f] transition-colors"
            >
              <span>View GitHub Source Repository</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded bg-[#d3121f] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#e01422] transition-colors"
            >
              Close Case Study
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default UXCaseStudyModal;
