import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(scrollY / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circle Calculations
  const radius = 24;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - scrollPercent * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 lg:right-10 z-[150] w-12 h-12 flex items-center justify-center rounded-full bg-void-2 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] focus:outline-none group hover:border-electric transition-colors"
          aria-label="Back to Top"
        >
          {/* SVG Progress Circle */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              className="text-white/5"
              strokeWidth={stroke}
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              className="text-electric"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>

          {/* Up Arrow Icon */}
          <FaArrowUp className="text-dim group-hover:text-electric transition-colors text-sm relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
