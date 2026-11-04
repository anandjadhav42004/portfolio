import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export function Cursor() {
  const isDesktop = useIsDesktop();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 35 });
  const sy = useSpring(y, { stiffness: 450, damping: 35 });
  const [big, setBig] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      
      const target = e.target as HTMLElement | null;
      const customEl = target?.closest('[data-cursor]') as HTMLElement | null;
      if (customEl) {
        setCursorText(customEl.getAttribute('data-cursor') || '');
        setBig(true);
      } else {
        setCursorText('');
        setBig(Boolean(target?.closest('a, button, [role="button"], input, textarea')));
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [isDesktop, x, y]);

  // Completely unmounted on touch/mobile
  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorText ? 84 : big ? 36 : 14,
        height: cursorText ? 28 : big ? 36 : 14,
        borderRadius: cursorText ? 14 : 9999,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 28,
        opacity: { duration: 0.15 },
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-white uppercase transition-colors duration-200 ${
        cursorText
          ? 'bg-[#d3121f] shadow-[0_0_20px_rgba(211,18,31,0.8)] border border-white/20'
          : big
          ? 'bg-[#d3121f]/35 border border-[#d3121f] shadow-[0_0_15px_rgba(211,18,31,0.5)]'
          : 'bg-[#d3121f] shadow-[0_0_12px_rgba(211,18,31,0.85)] mix-blend-screen'
      }`}
      aria-hidden="true"
    >
      {cursorText && (
        <span className="select-none animate-fadeIn">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}

export default Cursor;
