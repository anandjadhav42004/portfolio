import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ArrowLeftRight, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { fadeUp } from '../lib/motion';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.18em] uppercase text-[#d3121f]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>INTERACTIVE UX TRANSFORMATION SLIDER</span>
          </div>
          <h4 className="font-anton text-lg sm:text-xl text-white uppercase tracking-wide mt-0.5">
            Legacy Excel Bottleneck vs. Redesigned SAP Fiori Cockpit
          </h4>
        </div>
        <div className="text-[11px] font-mono text-[#888] flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#d3121f]" />
          <span>DRAG SLIDER TO COMPARE</span>
        </div>
      </div>

      {/* ── Comparison Container ── */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        data-cursor="DRAG"
        className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] rounded-xl overflow-hidden border border-[#2a2a2a] select-none cursor-ew-resize bg-[#0d0d0d]"
      >
        {/* ── AFTER (Clean Modern SAP Fiori Dashboard) — Layer 1 (Full Width) ── */}
        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#140a0b]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#222]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  AFTER: SAP Prognos Fiori Cockpit
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] text-[10px] font-mono font-semibold">
                  SUS 88/100
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#a0a0a0]">WCAG 2.1 AA COMPLIANT</span>
            </div>

            {/* Simulated UI Cards */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
                <div className="text-[10px] text-[#888] font-mono uppercase">Forecast Accuracy</div>
                <div className="text-xl sm:text-2xl font-anton text-white mt-1">97.9%</div>
                <div className="text-[10px] text-[#10b981] font-mono mt-0.5">+18% vs Manual</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
                <div className="text-[10px] text-[#888] font-mono uppercase">Workflow Duration</div>
                <div className="text-xl sm:text-2xl font-anton text-[#ff4d5a] mt-1">31 MIN</div>
                <div className="text-[10px] text-[#10b981] font-mono mt-0.5">34% Faster</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
                <div className="text-[10px] text-[#888] font-mono uppercase">ERP Sync Status</div>
                <div className="text-xl sm:text-2xl font-anton text-white mt-1">REAL-TIME</div>
                <div className="text-[10px] text-[#10b981] font-mono mt-0.5">Automated</div>
              </div>
            </div>

            {/* Simulated Forecast Chart Graphic */}
            <div className="p-4 rounded-lg bg-[#141414] border border-[#242424]">
              <div className="flex items-center justify-between text-[11px] text-[#888] font-mono mb-2">
                <span>DEMAND CURVE (PROPHET VS XGBOOST)</span>
                <span className="text-[#d3121f]">CONFIDENCE 95%</span>
              </div>
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradFiori" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d3121f" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#d3121f" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q50,60 100,65 T200,35 T300,50 T400,20 L400,100 L0,100 Z"
                  fill="url(#gradFiori)"
                />
                <path
                  d="M0,80 Q50,60 100,65 T200,35 T300,50 T400,20"
                  fill="none"
                  stroke="#d3121f"
                  strokeWidth="3"
                />
                <path
                  d="M0,75 Q50,70 100,55 T200,45 T300,40 T400,25"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#a0a0a0] font-mono pt-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Progressive disclosure: 14 complex parameters grouped into 3 smart presets.</span>
          </div>
        </div>

        {/* ── BEFORE (Fragmented Legacy Excel Interface) — Layer 2 (Clipped by sliderPos) ── */}
        <div
          className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between bg-[#191919] border-r border-[#d3121f]"
          style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
        >
          <div className="w-[800px] max-w-none">
            <div className="flex items-center justify-between pb-3 border-b border-[#333]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  BEFORE: Fragmented Excel &amp; Python Scripts
                </span>
                <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] text-[10px] font-mono font-semibold">
                  SUS 42/100
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#888]">NO DESIGN SYSTEM</span>
            </div>

            {/* Cluttered Excel Table Simulation */}
            <div className="my-4 font-mono text-[10px] border border-[#333] rounded overflow-hidden">
              <div className="grid grid-cols-5 bg-[#252525] p-2 font-bold text-[#bbb] border-b border-[#333]">
                <div>PLANT_ID</div>
                <div>SKU_NUM</div>
                <div>RAW_ACTUAL</div>
                <div>XLS_FORMULA</div>
                <div>DISCREPANCY</div>
              </div>
              {[
                { id: 'VAD_PLANT_01', sku: '40912-A', act: '12,450', form: '=SUM(D2:D18)*1.14', disc: '+18.4% ERR' },
                { id: 'VAD_PLANT_02', sku: '88219-X', act: '4,120', form: '=VLOOKUP(B3,A1..)', disc: 'REF# NOT FOUND' },
                { id: 'VAD_PLANT_03', sku: '10944-C', act: '29,800', form: '=IF(E4>200,...)', disc: '+12.1% WARN' },
                { id: 'VAD_PLANT_04', sku: '33100-M', act: '8,950', form: '=AVERAGE(...)', disc: '+22.0% CRIT' },
              ].map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-5 p-2 border-b border-[#2a2a2a] bg-[#1a1a1a] text-[#888]">
                  <div className="text-white">{row.id}</div>
                  <div>{row.sku}</div>
                  <div>{row.act}</div>
                  <div className="font-mono text-[#eab308]">{row.form}</div>
                  <div className="text-[#ef4444] font-bold">{row.disc}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded bg-[#201515] border border-[#ef4444]/30 text-xs text-[#ef4444] font-mono">
              <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5" />
              Pain points: Manual CSV reconciliations took 47 minutes per planning cycle with zero error validation.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#888] font-mono pt-2">
            <span>High cognitive load &bull; Fragmented data silos &bull; Vulnerable to formula errors</span>
          </div>
        </div>

        {/* ── Vertical Divider Line & Draggable Handle ── */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#d3121f] cursor-ew-resize z-20 shadow-[0_0_15px_rgba(211,18,31,0.9)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#d3121f] text-white flex items-center justify-center shadow-[0_0_20px_rgba(211,18,31,0.9)] border-2 border-white cursor-ew-resize">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Badge labels */}
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono uppercase text-[#ef4444] border border-[#ef4444]/40">
          BEFORE (LEGACY)
        </div>
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono uppercase text-[#10b981] border border-[#10b981]/40">
          AFTER (REDESIGN)
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
