import type { Transition, Variants } from "framer-motion";

/** Calm ease-out curve — no bounce */
export const softEase = [0.22, 1, 0.36, 1] as const;

export const transitionSoft: Transition = {
  duration: 0.52,
  ease: softEase,
};

export const transitionSnappy: Transition = {
  duration: 0.4,
  ease: softEase,
};

export const transitionHeader: Transition = {
  duration: 0.45,
  ease: softEase,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionSoft,
  },
};
