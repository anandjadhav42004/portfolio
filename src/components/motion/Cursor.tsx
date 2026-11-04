import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 38 });
  const sy = useSpring(y, { stiffness: 500, damping: 38 });
  const [big, setBig] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Don't render or listen on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);
      const target = e.target as HTMLElement | null;
      setBig(Boolean(target?.closest('a, button, [role="button"], input, textarea')));
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      animate={{
        scale: big ? 2.6 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 350, damping: 24 },
        opacity: { duration: 0.15 },
      }}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#d3121f] pointer-events-none z-[100] hidden md:block shadow-[0_0_15px_rgba(211,18,31,0.85)] mix-blend-screen"
      aria-hidden="true"
    />
  );
}

export default Cursor;
