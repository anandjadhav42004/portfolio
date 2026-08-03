import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import HeroRevamp from './components/HeroRevamp';
import ParticleBackground from './components/ParticleBackground';
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

  return (
    <>
      {/* Scroll indicator gradient bar at the absolute top of the viewport */}
      <ScrollProgress />

      {/* Global Interactive Elements & Overlays */}
      <CustomCursor />
      <KonamiEasterEgg />
      
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="relative w-full min-h-screen bg-void text-off-white overflow-hidden transition-colors duration-300">
          {/* Interactive 3D Background */}
            <ParticleBackground />
          
          {/* Global Sticky Navigation & Custom Themes */}
          <HamburgerMenu />
          <ThemeToggle />
          
          {/* Main Content Sections */}
          <main className="relative z-10 w-full">
            {/* Hero Banner with Code Typewriter & IST Clock */}
            <HeroRevamp />
            
            {/* About Profile & Business Card */}
            <About />
            
            {/* Project grids & stars */}
            <Projects />
            
            {/* Circular technical skills map */}
            <Skills />
            
            {/* GraphQL LeetCode Analytics concentric charts */}
            <LeetCodeStats />
            
            {/* AI Resume and Job Description Match diagnostics */}
            <ResumeAnalyzer />
            
            {/* Credentials and Certifications */}
            <Certifications />
            
            {/* Numeric Stats Grid */}
            <LiveStats />

            {/* Latest LinkedIn post preview */}
            <LinkedInPost />
            
            {/* Interactive Contact submission forms with custom animations */}
            <Contact />
          </main>
          
          {/* Standard Footer */}
          <Footer />

          {/* Floaters for convenient navigation and quick recruitment access */}
          <BackToTop />
          <AIChatbot />
        </div>
      )}
    </>
  );
}

export default App;
