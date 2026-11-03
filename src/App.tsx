import React from 'react';
import HamburgerMenu from './components/HamburgerMenu';
import HeroRevamp from './components/HeroRevamp';
import Projects from './components/Projects';
import MidRow from './components/MidRow';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-[#d3121f] selection:text-white font-sans overflow-x-hidden">
      {/* ── Top Bar / Header ── */}
      <HamburgerMenu />

      {/* ── Main Content Sections ── */}
      <main className="w-full">
        {/* 1. Hero Section with Giant PORTFOLIO backdrop & Anand's portrait */}
        <HeroRevamp />

        {/* 2. Selected Engineering Projects Grid */}
        <Projects />

        {/* 3. Three-Column Mid-Row: Academic Background, Credentials, Tech Stack, Engineering Workflow, Philosophy & Hilti Experience */}
        <MidRow />

        {/* 4. Contact & Direct Connection */}
        <Contact />
      </main>

      {/* ── Editorial Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
