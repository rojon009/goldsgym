import {
  FadeUp,
  Stagger,
  StaggerChild,
} from "@/components/motion/MotionPrimitives";
import { facilities } from "@/lib/content";
import { GlowCard } from "@/components/ui/spotlight-card";

import { FacilityCard } from "./FacilityCard";

export function FacilitiesSection() {
  return (
    <section
      className="glass-section py-24 px-6 relative overflow-hidden"
      id="facilities"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <FadeUp className="space-y-4">
            <p className="text-primary text-xs font-black uppercase tracking-[0.4em]">
              Modern, transparent care
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Everything <span className="text-primary">you need</span>
            </h2>
          </FadeUp>
          <FadeUp
            className="max-w-md text-white/50 text-sm leading-relaxed"
            delay={0.06}
          >
            Prevention, repair, and cosmetics—under one roof. We prioritize
            comfort, explain costs upfront, and never rush you through a chair.
          </FadeUp>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {facilities.map((f) => (
            <StaggerChild key={f.title}>
              <GlowCard
                glowColor="cyan"
                customSize
                className="w-full h-full p-0 gap-0 rounded-xl bg-transparent border-white/15"
              >
                <FacilityCard {...f} />
              </GlowCard>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
