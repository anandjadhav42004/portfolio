import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.4'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.22, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {w}
          </motion.span>
        );
      })}
    </p>
  );
}

export default ScrollText;
