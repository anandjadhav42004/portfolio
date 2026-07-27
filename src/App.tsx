import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { Background3D, buildingDatabase } from './components/Background3D';
import { BuildingDrawer, BuildingDetails } from './components/BuildingDrawer';
import { AIChatbot } from './components/AIChatbot';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';

// Floating HUD controls & Overlays
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import BackToTop from './components/BackToTop';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import { FiLayers, FiCompass, FiCpu, FiMail, FiCheckCircle, FiInfo } from 'react-icons/fi';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState('hero');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingDetails | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDetails | null>(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSelectBuilding = (building: BuildingDetails) => {
    setSelectedBuilding(building);
  };

  const handleHoverBuilding = (building: BuildingDetails | null) => {
    setHoveredBuilding(building);
  };

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <KonamiEasterEgg />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative w-screen h-screen overflow-hidden bg-void text-white font-sans select-none">
          
          {/* 100% Full-Screen 3D Code City Engine */}
          <Background3D
            activeDistrict={activeDistrict}
            selectedFilter={selectedFilter}
            onSelectBuilding={handleSelectBuilding}
            onHoverBuilding={handleHoverBuilding}
          />

          {/* Top 3D City HUD Navigation Command Bar */}
          <header className="fixed top-6 left-6 right-6 z-[180] flex items-center justify-between pointer-events-none">
            
            {/* Left: Brand / Developer Logo */}
            <div className="flex items-center gap-3 p-2 px-4 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl shadow-card pointer-events-auto">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-display font-bold text-base flex items-center justify-center">
                AJ
              </div>
              <div className="text-left font-mono">
                <h1 className="text-sm font-bold text-white leading-none">Anand Jadhav</h1>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3D Code City Live
                </span>
              </div>
            </div>

            {/* Middle: 3D District Flight Controller */}
            <div className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl shadow-card pointer-events-auto font-mono text-xs">
              {[
                { id: 'hero', label: '🏙️ Central HQ' },
                { id: 'projects', label: '🏢 Projects District' },
                { id: 'skills', label: '⚡ Tech Towers' },
                { id: 'certifications', label: '📜 Credentials' },
                { id: 'ai-lab', label: '🤖 AI Hub' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDistrict(d.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeDistrict === d.id
                      ? 'bg-indigo-600 text-white shadow-glow'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                onClick={() => setShowAnalyzer(true)}
                className="px-4 py-2 rounded-xl bg-void-2/90 border border-white/10 hover:bg-white/10 backdrop-blur-xl text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-card"
              >
                <FiCompass />
                <span className="hidden sm:inline">Job Match AI</span>
              </button>

              <button
                onClick={() => setShowContactModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-glow cursor-pointer"
              >
                <FiMail />
                <span>Contact</span>
              </button>

              <ThemeToggle />
            </div>
          </header>

          {/* Hover Building 3D HTML Tooltip */}
          {hoveredBuilding && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[170] px-4 py-2 rounded-xl bg-void-2/90 border border-indigo-500/40 backdrop-blur-xl text-white text-xs font-mono shadow-glow pointer-events-none flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="font-bold">{hoveredBuilding.title}</span>
              <span className="text-slate-400">• Click tower to inspect</span>
            </div>
          )}

          {/* Bottom Left: Interactive Controls Instruction Guide */}
          <div className="fixed bottom-6 left-6 z-[170] hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-300 shadow-card">
            <FiInfo className="text-indigo-400 text-base" />
            <span>Mouse Drag to Rotate • Wheel to Zoom • Click Skyscraper to Open Drawer</span>
          </div>

          {/* Building Inspection Drawer Modal */}
          <BuildingDrawer
            building={selectedBuilding}
            onClose={() => setSelectedBuilding(null)}
          />

          {/* AI Resume Analyzer Popup */}
          {showAnalyzer && (
            <div className="fixed inset-0 z-[240] flex items-center justify-center p-4 bg-void/80 backdrop-blur-md">
              <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowAnalyzer(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  ✕
                </button>
                <ResumeAnalyzer />
              </div>
            </div>
          )}

          {/* Direct Contact Modal */}
          {showContactModal && (
            <div className="fixed inset-0 z-[240] flex items-center justify-center p-4 bg-void/80 backdrop-blur-md">
              <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md w-full text-center relative">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-sm text-slate-300 mb-6">
                  Available for SAP ABAP Cloud, Full-Stack Web (MEAN/MERN), and native iOS SwiftUI roles.
                </p>
                <a
                  href="mailto:anandjadhav42004@gmail.com"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-glow block mb-3"
                >
                  Email: anandjadhav42004@gmail.com
                </a>
                <p className="text-xs font-mono text-slate-400">
                  Phone: +91 8308008154 • Mumbai / Vadodara
                </p>
              </div>
            </div>
          )}

          <BackToTop />
          <AIChatbot />
        </div>
      )}
    </>
  );
}

export default App;
