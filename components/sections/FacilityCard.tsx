import Image from "next/image";
import {
  Shield,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import type { FacilityIconKey } from "@/lib/content";

const facilityIcons: Record<FacilityIconKey, LucideIcon> = {
  sparkles: Sparkles,
  shield: Shield,
  stethoscope: Stethoscope,
  smile: Smile,
};

export type FacilityCardProps = {
  title: string;
  icon: FacilityIconKey;
  imageSrc: string;
  description: string;
};

export function FacilityCard({
  title,
  icon,
  imageSrc,
  description,
}: FacilityCardProps) {
  const Icon = facilityIcons[icon];

  const imageMotion =
    "absolute inset-0 size-full origin-center scale-100 object-cover opacity-70 md:opacity-60 transform-gpu will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:md:group-hover:scale-100 motion-reduce:md:group-hover:opacity-60 md:group-hover:scale-[1.06] md:group-hover:opacity-[0.75]";

  const descriptionMotion =
    "text-[0.7rem] sm:text-xs text-white/70 md:text-white/60 leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:md:opacity-100 md:translate-y-1 md:group-hover:translate-y-0";

  return (
    <div className="group relative h-[280px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl bg-surface border border-white/5 transition-all duration-500 ease-out md:hover:border-primary/50 md:hover:shadow-lg md:hover:shadow-primary/10">
      <Image
        alt={title}
        className={imageMotion}
        src={imageSrc}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-500 ease-out md:from-black md:via-black/20 md:to-transparent md:group-hover:opacity-95" />
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 space-y-1.5 md:space-y-2">
        <Icon className="text-primary size-6 md:size-8 shrink-0" strokeWidth={1.75} />
        <h3 className="text-base sm:text-lg md:text-xl font-black uppercase italic">{title}</h3>
        <p className={descriptionMotion}>{description}</p>
      </div>
    </div>
  );
}
