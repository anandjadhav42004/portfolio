import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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
      // Smooth linear interpolation (lerp)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX - 18}px, ${cursorY - 18}px, 0px)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0px)`;
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
  }, []);

  return (
    <>
      {/* Outer Glowing Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-cyan/60 pointer-events-none z-[9999] hidden lg:block transition-all duration-200 ease-out shadow-lg shadow-cyan/20 ${
          isHovering
            ? 'scale-150 border-cyan bg-cyan/20 backdrop-blur-[1px]'
            : 'scale-100 bg-cyan/5'
        }`}
      />
      {/* Core Glowing Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan pointer-events-none z-[9999] hidden lg:block transition-all duration-150 shadow-md shadow-cyan ${
          isHovering ? 'scale-150 bg-white' : 'scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
