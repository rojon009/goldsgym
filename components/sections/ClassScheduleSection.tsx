import { Clock, Star } from "lucide-react";

import {
  FadeUp,
  Stagger,
  StaggerChild,
} from "@/components/motion/MotionPrimitives";
import {
  scheduleFriday,
  scheduleWeekday,
  type ScheduleSlot,
} from "@/lib/content";

function SlotCard({ slot }: { slot: ScheduleSlot }) {
  const Icon = slot.type === "featured" ? Star : Clock;
  const badge = slot.type === "featured" ? "Featured block" : "Open";

  return (
    <div
      className={`rounded-xl p-5 md:p-6 ${
        slot.type === "featured" ? "glass-panel-primary" : "glass-panel"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm md:text-base font-black text-white tracking-wide uppercase">
          {slot.timeLabel}
        </p>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
            slot.type === "featured"
              ? "bg-primary/20 text-primary"
              : "bg-white/10 text-white/70"
          }`}
        >
          <Icon className="size-3.5" strokeWidth={2} aria-hidden />
          {badge}
        </span>
      </div>
      <p className="text-xs md:text-sm text-white/55 leading-relaxed">
        {slot.detail}
      </p>
    </div>
  );
}

function ScheduleBlock({
  title,
  subtitle,
  slots,
}: {
  title: string;
  subtitle: string;
  slots: ScheduleSlot[];
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
          {title}
        </h3>
        <p className="text-sm text-white/45 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <StaggerChild key={slot.timeLabel}>
            <SlotCard slot={slot} />
          </StaggerChild>
        ))}
      </Stagger>
    </div>
  );
}

export function ClassScheduleSection() {
  return (
    <section
      className="glass-section-deep py-24 px-6"
      id="schedule"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 md:mb-16">
          <FadeUp className="space-y-4">
            <p className="text-primary text-xs font-black uppercase tracking-[0.4em]">
              Easy scheduling
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Clinic <span className="text-primary">hours</span>
            </h2>
          </FadeUp>
          <FadeUp
            className="max-w-md text-white/50 text-sm leading-relaxed"
            delay={0.06}
          >
            Evening and family blocks fill fast—tap WhatsApp in the contact
            section to hold your time. Emergency? Message us; we triage same day.
          </FadeUp>
        </div>

        <div className="space-y-16 md:space-y-20">
          <FadeUp>
            <ScheduleBlock
              title={scheduleWeekday.title}
              subtitle={scheduleWeekday.subtitle}
              slots={scheduleWeekday.slots}
            />
          </FadeUp>
          <FadeUp delay={0.06}>
            <ScheduleBlock
              title={scheduleFriday.title}
              subtitle={scheduleFriday.subtitle}
              slots={scheduleFriday.slots}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
