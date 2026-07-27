import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import HamburgerMenu from './components/HamburgerMenu';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import LeetCodeStats from './components/LeetCodeStats';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Certifications from './components/Certifications';
import LiveStats from './components/LiveStats';
import LinkedInPost from './components/LinkedInPost';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Global Helpers & Overlay upgrades
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import BackToTop from './components/BackToTop';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import AIChatbot from './components/AIChatbot';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState('hero');

  // Track scroll position to update 3D camera district focus
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const heroEl = document.getElementById('hero');
      const projectsEl = document.getElementById('projects');
      const skillsEl = document.getElementById('skills');
      const certsEl = document.getElementById('certifications');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveDistrict('contact');
      } else if (certsEl && scrollPos >= certsEl.offsetTop) {
        setActiveDistrict('certifications');
      } else if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveDistrict('skills');
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveDistrict('projects');
      } else if (heroEl) {
        setActiveDistrict('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectBuilding = (buildingId: string) => {
    if (buildingId.includes('elvora') || buildingId.includes('ks') || buildingId.includes('funflix') || buildingId.includes('store') || buildingId.includes('event')) {
      setActiveDistrict('projects');
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (buildingId.includes('abap') || buildingId.includes('react') || buildingId.includes('swift') || buildingId.includes('node')) {
      setActiveDistrict('skills');
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (buildingId.includes('cert') || buildingId.includes('oracle')) {
      setActiveDistrict('certifications');
      document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
    } else if (buildingId.includes('ai')) {
      document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveDistrict('hero');
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <KonamiEasterEgg />
      
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="relative w-full min-h-screen bg-void text-off-white overflow-hidden transition-colors duration-300">
          
          {/* Interactive 3D City Engine Background */}
          <Background3D 
            activeDistrict={activeDistrict} 
            onSelectBuilding={handleSelectBuilding} 
          />
          
          {/* Floating 3D City Flight Controller Bar */}
          <div className="fixed top-6 left-6 z-[180] hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-void-2/80 border border-white/10 backdrop-blur-md shadow-card font-mono text-xs select-none">
            {[
              { id: 'hero', label: '🏙️ Hero HQ' },
              { id: 'projects', label: '🏢 Projects District' },
              { id: 'skills', label: '⚡ Tech Stack' },
              { id: 'certifications', label: '📜 Credentials' },
              { id: 'contact', label: '📍 Contact' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setActiveDistrict(d.id);
                  document.getElementById(d.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  activeDistrict === d.id
                    ? 'bg-indigo-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <HamburgerMenu />
          <ThemeToggle />
          
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <LeetCodeStats />
            <ResumeAnalyzer />
            <Certifications />
            <LiveStats />
            <LinkedInPost />
            <Contact />
          </main>
          
          <Footer />

          <BackToTop />
          <AIChatbot />
        </div>
      )}
    </>
  );
}

export default App;
