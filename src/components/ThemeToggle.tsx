import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const nextDark = !isDark;
    const clickX = e.clientX;
    const clickY = e.clientY;

    const ripple = document.createElement('div');
    const bgClass = nextDark ? '#0A0A0A' : '#FFFFFF';

    ripple.style.position = 'fixed';
    ripple.style.zIndex = '199';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.backgroundColor = bgClass;
    ripple.style.left = `${clickX}px`;
    ripple.style.top = `${clickY}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.transition = 'width 650ms cubic-bezier(0.1, 0.8, 0.25, 1.0), height 650ms cubic-bezier(0.1, 0.8, 0.25, 1.0)';

    document.body.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.width = '300vmax';
      ripple.style.height = '300vmax';
    });

    setTimeout(() => {
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

      setTimeout(() => {
        ripple.remove();
      }, 350);
    }, 450);
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      onClick={toggleTheme}
      className="fixed top-6 right-20 lg:top-10 lg:right-28 z-[210] w-12 h-12 flex items-center justify-center rounded-none bg-brutalist-yellow border-4 border-black text-black brutalist-shadow-black-sm hover:shadow-[4px_4px_0px_#000000] transition-all focus:outline-none cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <FiSun className="text-black text-lg sm:text-xl" />
      ) : (
        <FiMoon className="text-black text-lg sm:text-xl" />
      )}
    </motion.button>
  );
};
 
export default ThemeToggle;
