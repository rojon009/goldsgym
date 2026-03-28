import { SideFade } from "@/components/motion/MotionPrimitives";
import { hero, heroSlides } from "@/lib/content";

import { HeroExperience } from "./HeroExperience";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <HeroExperience slides={heroSlides} memberAvatars={hero.memberAvatars} />
      <div className="pointer-events-none absolute inset-0 z-[11]">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
      </div>
      <SideFade
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4 z-20"
        delay={0.35}
      >
        <span className="vertical-lr text-[10px] uppercase tracking-[0.3em] font-black text-white/30 rotate-180">
          Explore Facilities
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent" />
      </SideFade>
    </section>
  );
}
