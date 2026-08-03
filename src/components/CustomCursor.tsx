import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Smooth GSAP spring tracking
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.25, ease: 'power3.out' });
    const dotXTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.05, ease: 'power1.out' });
    const dotYTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.05, ease: 'power1.out' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
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

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-9 h-9 -ml-4.5 -mt-4.5 rounded-full border border-cyan/50 pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden lg:block shadow-lg shadow-cyan/20 ${
          isHovering
            ? 'scale-175 border-cyan bg-cyan/15 backdrop-blur-[1px]'
            : 'scale-100 bg-cyan/5'
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyan rounded-full pointer-events-none z-[9999] hidden lg:block transition-all duration-200 shadow-md shadow-cyan ${
          isHovering ? 'scale-150 bg-white' : 'scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;

