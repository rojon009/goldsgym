"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import {
  staggerContainer,
  staggerItem,
  transitionSoft,
  softEase,
} from "@/components/motion/variants";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
};

export function FadeUp({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: FadeUpProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px", amount }}
      transition={{ ...transitionSoft, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number | "some" | "all";
};

export function Stagger({ children, className, amount = 0.12 }: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-44px", amount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerChildProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerChild({ children, className }: StaggerChildProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

type HeroBlockProps = {
  children: ReactNode;
  className?: string;
};

export function HeroIntro({ children, className }: HeroBlockProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.085,
            delayChildren: 0.12,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroIntroItem({ children, className }: HeroBlockProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: softEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type SideFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SideFade({ children, className, delay = 0 }: SideFadeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.25 }}
      transition={{ ...transitionSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
