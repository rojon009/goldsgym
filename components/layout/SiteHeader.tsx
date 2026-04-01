"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { BrandMark } from "@/components/layout/BrandMark";
import { JoinModal } from "@/components/layout/JoinModal";
import { transitionHeader, softEase } from "@/components/motion/variants";
import { navLinks } from "@/lib/content";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10"
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={transitionHeader}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, ease: softEase, delay: 0.06 }}
        >
          <BrandMark href="#" />
        </motion.div>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
              href={link.href}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.38,
                ease: softEase,
                delay: 0.1 + i * 0.045,
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <motion.div
          className="flex items-center gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, ease: softEase, delay: 0.28 }}
        >
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Join Now
          </button>
        </motion.div>
      </div>
      <JoinModal
        open={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </motion.header>
  );
}
