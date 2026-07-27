import React from 'react';
import { FiCompass, FiMapPin } from 'react-icons/fi';

interface LandmarkPos {
  id: string;
  name: string;
  x: number;
  z: number;
  color: string;
}

interface MinimapProps {
  activeLandmarkId?: string | null;
  onSelectLandmark: (id: string) => void;
}

const landmarks: LandmarkPos[] = [
  { id: 'anand-hq', name: 'Central HQ', x: 50, z: 50, color: '#34d399' },
  { id: 'proflow-sap', name: 'SAP AI Tower', x: 38, z: 40, color: '#6366f1' },
  { id: 'elvora-media', name: 'Elvora Media', x: 26, z: 42, color: '#38bdf8' },
  { id: 'ks-beauty', name: 'KS Beauty', x: 24, z: 66, color: '#f472b6' },
  { id: 'funflix', name: 'FunFlix Cinema', x: 14, z: 22, color: '#fbbf24' },
  { id: 'anashi-store', name: 'Anashi Store', x: 30, z: 82, color: '#ec4899' },
  { id: 'event-management', name: 'Event Center', x: 36, z: 18, color: '#818cf8' },
  { id: 'react-stack', name: 'React Tower', x: 74, z: 62, color: '#38bdf8' },
  { id: 'abap-cloud', name: 'ABAP Cloud', x: 70, z: 40, color: '#6366f1' },
  { id: 'sap-cert-tower', name: 'SAP Cert Museum', x: 40, z: 2, color: '#a855f7' },
  { id: 'ai-hub-node', name: 'AI Innovation Hub', x: 82, z: 82, color: '#22c55e' },
];

export const Minimap: React.FC<MinimapProps> = ({ activeLandmarkId, onSelectLandmark }) => {
  return (
    <div className="fixed top-24 right-6 z-[180] hidden sm:block p-3 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl shadow-card w-44 font-mono text-[10px] select-none text-left">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-300">
        <span className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
          <FiCompass className="text-sky-400 text-xs" />
          City Radar
        </span>
        <span className="text-[9px] text-emerald-400 font-semibold">LIVE 2D</span>
      </div>

      {/* Minimap Grid Canvas Container */}
      <div className="relative w-full h-32 rounded-xl bg-slate-950/80 border border-white/10 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* River Blue Strip on right */}
        <div className="absolute top-0 bottom-0 right-0 w-4 bg-sky-500/20 border-l border-sky-500/30" />

        {/* Landmark Dots */}
        {landmarks.map((lm) => {
          const isSelected = activeLandmarkId === lm.id;
          return (
            <button
              key={lm.id}
              onClick={() => onSelectLandmark(lm.id)}
              title={lm.name}
              style={{ left: `${lm.x}%`, top: `${lm.z}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'w-4 h-4 ring-4 ring-sky-400/50 z-20 animate-pulse'
                  : 'w-2.5 h-2.5 hover:scale-150 z-10'
              }`}
            >
              <span
                style={{ backgroundColor: lm.color }}
                className="w-full h-full rounded-full block shadow-glow"
              />
            </button>
          );
        })}
      </div>

      {/* Selected Landmark Legend */}
      <div className="mt-2 text-slate-400 flex items-center gap-1.5 truncate">
        <FiMapPin className="text-indigo-400 shrink-0" />
        <span className="truncate text-white font-medium">
          {landmarks.find((l) => l.id === activeLandmarkId)?.name || 'Anand Central HQ'}
        </span>
      </div>
    </div>
  );
};
