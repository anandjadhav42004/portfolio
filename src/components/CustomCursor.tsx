import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0px)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 5}px, ${dotY - 5}px, 0px)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <div className={isVisible ? 'block' : 'opacity-0'}>
      {/* Outer Studio Ghibli Magical Starlight Aura */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[999999] transition-transform duration-150 ease-out shadow-2xl ${
          isHovering
            ? 'scale-175 border-amber-300 bg-amber-400/20 shadow-amber-400/50 backdrop-blur-[2px]'
            : 'scale-100 border-cyan-400 bg-cyan-400/15 shadow-cyan-400/40'
        }`}
      />
      {/* Inner Glowing Spirit Core */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[999999] transition-all duration-100 ${
          isHovering
            ? 'scale-150 bg-amber-200 shadow-[0_0_12px_#FBBF24]'
            : 'scale-100 bg-cyan-300 shadow-[0_0_10px_#38BDF8]'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
