import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { Background3D, buildingDatabase } from './components/Background3D';
import { BuildingDrawer, BuildingDetails } from './components/BuildingDrawer';
import { Minimap } from './components/Minimap';
import { AIChatbot } from './components/AIChatbot';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';

// Floating HUD controls & Overlays
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import BackToTop from './components/BackToTop';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import { FiCompass, FiSearch, FiPlay, FiRefreshCw, FiMail, FiInfo, FiCheckCircle } from 'react-icons/fi';

const guidedTourSequence = [
  'anand-hq',
  'proflow-sap',
  'elvora-media',
  'ks-beauty',
  'funflix',
  'sap-cert-tower',
  'ai-hub-node'
];

function App() {
  const [loading, setLoading] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingDetails | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDetails | null>(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  // Guided Tour sequence step runner
  useEffect(() => {
    if (!isTourActive) return;

    const currentId = guidedTourSequence[tourIndex];
    const bData = buildingDatabase[currentId];
    if (bData) {
      setSelectedBuilding(bData);
    }

    const timer = setTimeout(() => {
      if (tourIndex < guidedTourSequence.length - 1) {
        setTourIndex((prev) => prev + 1);
      } else {
        setIsTourActive(false);
        setTourIndex(0);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [isTourActive, tourIndex]);

  // Hide onboarding toast after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectBuilding = (building: BuildingDetails) => {
    setSelectedBuilding(building);
  };

  const handleSelectLandmarkFromMinimap = (id: string) => {
    const bData = buildingDatabase[id];
    if (bData) {
      setSelectedBuilding(bData);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const match = Object.values(buildingDatabase).find(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.tags.some((t) => t.toLowerCase().includes(query))
    );

    if (match) {
      setSelectedBuilding(match);
    }
  };

  const resetView = () => {
    setActiveDistrict('hero');
    setSelectedBuilding(null);
    setIsTourActive(false);
  };

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <KonamiEasterEgg />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative w-screen h-screen overflow-hidden bg-void text-white font-sans select-none">
          
          {/* Bright Daylight PBR 3D City Engine */}
          <Background3D
            activeDistrict={activeDistrict}
            onSelectBuilding={handleSelectBuilding}
            onHoverBuilding={(b) => setHoveredBuilding(b)}
          />

          {/* Top 3D HUD Navigation Bar */}
          <header className="fixed top-6 left-6 right-6 z-[180] flex items-center justify-between pointer-events-none gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-3 p-2 px-4 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl shadow-card pointer-events-auto">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-display font-bold text-base flex items-center justify-center">
                AJ
              </div>
              <div className="text-left font-mono">
                <h1 className="text-sm font-bold text-white leading-none">Anand's Code City</h1>
                <span className="text-[10px] text-sky-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Bright Manhattan Skyline
                </span>
              </div>
            </div>

            {/* Middle: Guided Tour, Search & Reset View Controls */}
            <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl shadow-card pointer-events-auto font-mono text-xs">
              
              {/* Reset Overview Button */}
              <button
                onClick={resetView}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset Camera View (ESC)"
              >
                <FiRefreshCw />
                <span>Overview</span>
              </button>

              {/* Guided Tour Launcher */}
              <button
                onClick={() => {
                  setIsTourActive(true);
                  setTourIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isTourActive
                    ? 'bg-amber-500 text-slate-950 shadow-glow animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow'
                }`}
              >
                <FiPlay />
                <span>{isTourActive ? `Touring (${tourIndex + 1}/7)` : 'Guided Tour'}</span>
              </button>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search project/tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-400 w-44"
                />
                <FiSearch className="absolute left-2.5 text-slate-400 text-xs" />
              </form>
            </div>

            {/* Right: Action Buttons */}
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

          {/* 2D Minimap Radar */}
          <Minimap
            activeLandmarkId={selectedBuilding?.id || null}
            onSelectLandmark={handleSelectLandmarkFromMinimap}
          />

          {/* Onboarding Welcome Toast */}
          {showToast && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[190] px-5 py-3 rounded-2xl bg-void-2/95 border border-sky-400/40 backdrop-blur-xl text-white text-xs font-mono shadow-glow flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>
                <strong>Welcome to Anand's 3D Code City!</strong> Drag to Rotate • Scroll to Zoom • Click Skyscrapers to Inspect • Press ESC to Reset View
              </span>
              <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-white ml-2 font-bold">
                ✕
              </button>
            </div>
          )}

          {/* Hover Skyscraper Tooltip */}
          {hoveredBuilding && (
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[170] px-4 py-2 rounded-xl bg-void-2/90 border border-sky-500/40 backdrop-blur-xl text-white text-xs font-mono shadow-glow pointer-events-none flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="font-bold">{hoveredBuilding.title}</span>
              <span className="text-slate-400">• Click building to inspect</span>
            </div>
          )}

          {/* Bottom Left: Navigation Hints */}
          <div className="fixed bottom-6 left-6 z-[170] hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-void-2/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-300 shadow-card">
            <FiInfo className="text-sky-400 text-base" />
            <span>Mouse Drag to Orbit • Scroll to Zoom • ESC to Overview</span>
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

          {/* Contact Direct Modal */}
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
