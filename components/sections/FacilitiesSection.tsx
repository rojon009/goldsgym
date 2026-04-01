import {
  FadeUp,
  Stagger,
  StaggerChild,
} from "@/components/motion/MotionPrimitives";
import { facilities } from "@/lib/content";

import { FacilityCard } from "./FacilityCard";

export function FacilitiesSection() {
  return (
    <section
      className="bg-background-dark py-24 px-6 relative overflow-hidden"
      id="facilities"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <FadeUp className="space-y-4">
            <p className="text-primary text-xs font-black uppercase tracking-[0.4em]">
              The Elite Standard
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Superior <span className="text-primary">Facilities</span>
            </h2>
          </FadeUp>
          <FadeUp
            className="max-w-md text-white/50 text-sm leading-relaxed"
            delay={0.06}
          >
            Designed for high performance. Every square inch of Gold&apos;s GYM
            is engineered to push you beyond your limits.
          </FadeUp>
        </div>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {facilities.map((f) => (
            <StaggerChild key={f.title}>
              <FacilityCard {...f} />
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
