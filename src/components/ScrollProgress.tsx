import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolledPercentage = (window.scrollY / totalHeight) * 100;
        setScrollWidth(scrolledPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-[220] pointer-events-none bg-white border-b-2 border-black">
      <div 
        className="h-full bg-black transition-all duration-75 ease-out"
        style={{ width: `${scrollWidth}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
