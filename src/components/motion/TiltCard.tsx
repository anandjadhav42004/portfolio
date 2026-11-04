import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isDesktop) {
    return <div className={`h-full ${className}`}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1000 }} className={`h-full ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.015 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TiltCard;
