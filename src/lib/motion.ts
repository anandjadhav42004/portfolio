// ============================================================
// MOTION DESIGN SYSTEM — Anand Jadhav Portfolio
// Consistent easing, staggered entrances & spring micro-interactions
// ============================================================

/** Smooth "expo out" curve — feels crisp, fast to start, and luxurious to settle */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Standard section fade-up for headers and lead paragraphs */
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

/** Container variant that staggers direct children entrances */
export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/** Faster stagger for compact badge lists & skill chips */
export const staggerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/** Card entrance with subtle scale */
export const cardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease },
  },
};

/** Interactive button springs (tactile & responsive) */
export const buttonHover = { scale: 1.04 };
export const buttonTap = { scale: 0.97 };
export const springTransition = {
  type: 'spring' as const,
  stiffness: 340,
  damping: 22,
};

