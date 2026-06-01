import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-electric pointer-events-none z-[9999] transition-transform duration-300 hidden lg:block mix-blend-difference ${
          isHovering ? 'scale-150 bg-electric/20' : 'scale-100'
        }`}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-electric rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
