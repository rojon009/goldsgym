"use client";

import { useState } from "react";

import { JoinModal } from "@/components/layout/JoinModal";
import { FadeUp, Stagger, StaggerChild } from "@/components/motion/MotionPrimitives";
import { membershipPlans } from "@/lib/content";

import { FlashSaleBanner } from "./FlashSaleBanner";
import { PricingCard } from "./PricingCard";

export function MembershipSection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <section
      className="bg-background-dark py-24 px-6 border-y border-white/5"
      id="membership"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-20">
          <FlashSaleBanner />
        </FadeUp>
        <FadeUp className="text-center mb-16 space-y-4" delay={0.05}>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Predictable <span className="text-primary">care plans</span>
          </h2>
          <p className="text-white/50 text-sm tracking-widest uppercase max-w-xl mx-auto leading-relaxed normal-case">
            Membership-style preventive care so cleanings don&apos;t slip—and you
            save on the treatments you actually need.
          </p>
        </FadeUp>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan) => (
            <StaggerChild key={plan.name}>
              <PricingCard
                {...plan}
                onCtaClick={() => {
                  setIsJoinModalOpen(true);
                }}
              />
            </StaggerChild>
          ))}
        </Stagger>
      </div>
      <JoinModal open={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </section>
  );
}
