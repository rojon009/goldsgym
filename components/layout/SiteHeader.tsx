"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { BrandMark } from "@/components/layout/BrandMark";
import { JoinModal } from "@/components/layout/JoinModal";
import { transitionHeader, softEase } from "@/components/motion/variants";
import { CartoonButton } from "@/components/ui/cartoon-button";
import { navLinks } from "@/lib/content";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-3 sm:pt-4 md:pt-5 px-3 sm:px-4 md:px-6">
      <motion.div
        className="pointer-events-auto mx-auto w-full max-w-5xl md:max-w-6xl"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={transitionHeader}
      >
        <div className="header-frost flex w-full items-center justify-between gap-2 sm:gap-3 rounded-full border border-white/10 px-2.5 py-2 pr-2 shadow-lg shadow-black/40 sm:px-4 sm:py-2.5 md:px-5">
        <motion.div
          className="min-w-0 shrink"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, ease: softEase, delay: 0.06 }}
        >
          <BrandMark
            href="#top"
            iconClassName="size-6 sm:size-7 md:size-8"
            titleClassName="text-sm sm:text-base md:text-lg lg:text-xl"
            wrapClassName="gap-2 sm:gap-2.5"
            iconWrapClassName="p-1.5 sm:p-2 rounded-lg glass-panel"
          />
        </motion.div>
        <nav className="hidden min-w-0 flex-1 justify-center md:flex md:px-2">
          <div className="flex items-center gap-3 lg:gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                className="text-[10px] font-semibold text-white/80 transition-colors hover:text-primary lg:text-xs uppercase tracking-widest xl:text-sm"
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
          </div>
        </nav>
        <motion.div
          className="shrink-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, ease: softEase, delay: 0.28 }}
        >
          <CartoonButton
            label="Book visit"
            color="bg-primary"
            size="compact"
            onClick={() => setIsJoinModalOpen(true)}
          />
        </motion.div>
        </div>
      </motion.div>
      <JoinModal
        open={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </header>
  );
}
