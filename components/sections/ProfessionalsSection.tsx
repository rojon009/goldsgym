import Image from "next/image";

import {
  FadeUp,
  Stagger,
  StaggerChild,
} from "@/components/motion/MotionPrimitives";
import { GlowCard } from "@/components/ui/spotlight-card";
import { professionals } from "@/lib/content";

export function ProfessionalsSection() {
  return (
    <section
      className="glass-section py-24 px-6"
      id="professionals"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-12 md:mb-14 max-w-2xl">
          <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">
            Dentists you&apos;ll trust
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Meet <span className="text-primary">your team</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm leading-relaxed">
            Board-ready clinicians and hygienists who listen first—then tailor a
            plan to your goals, timeline, and budget.
          </p>
        </FadeUp>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {professionals.map((pro) => (
            <StaggerChild key={pro.name}>
              <GlowCard
                glowColor="cyan"
                customSize
                className="w-full h-full p-0 gap-0 rounded-xl bg-transparent border-white/12"
              >
                <article className="group flex flex-row sm:flex-col gap-4 rounded-xl glass-panel p-4 md:p-5 transition-all hover:border-primary/35 hover:shadow-[0_12px_40px_-8px_rgba(45,212,191,0.15)]">
                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg sm:h-44 sm:w-full sm:aspect-[4/3]">
                    <Image
                      src={pro.imageSrc}
                      alt={pro.imageAlt}
                      fill
                      className="origin-top scale-100 object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100px, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div>
                      <h3 className="text-lg font-black uppercase italic tracking-tight text-white">
                        {pro.name}
                      </h3>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">
                        {pro.designation}
                      </p>
                    </div>
                    <p className="text-xs text-white/55 leading-relaxed line-clamp-4 sm:line-clamp-none">
                      {pro.experience}
                    </p>
                    <ul className="flex flex-wrap gap-1.5 pt-1">
                      {pro.expertise.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </GlowCard>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
