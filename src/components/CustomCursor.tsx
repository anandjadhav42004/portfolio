import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Use gsap.quickTo for high-performance mouse tracking
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.12, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.12, ease: 'power2.out' });
    const dotXTo = gsap.quickTo(dotRef.current, 'x', { duration: 0 });
    const dotYTo = gsap.quickTo(dotRef.current, 'y', { duration: 0 });

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
        target.closest('button')
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
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-indigo-400/40 pointer-events-none z-[9999] transition-transform duration-200 hidden lg:block ${
          isHovering ? 'scale-150 border-indigo-400 bg-indigo-500/10' : 'scale-100'
        }`}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-0.75 -mt-0.75 bg-indigo-400 rounded-full pointer-events-none z-[9999] hidden lg:block"
      />
    </>
  );
};

export default CustomCursor;

