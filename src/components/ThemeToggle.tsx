import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved === 'dark' || (!saved && prefersDark);

    if (initialDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    setIsDark(initialDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;

    if (nextDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-20 lg:top-8 lg:right-24 z-[210] w-12 h-12 flex items-center justify-center rounded-xl bg-void-2/90 border border-white/10 text-white backdrop-blur-md shadow-card hover:bg-void-3 transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <FiSun className="text-amber-400 text-lg" />
      ) : (
        <FiMoon className="text-indigo-400 text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
