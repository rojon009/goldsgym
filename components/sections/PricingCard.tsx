import { CheckCircle2, CircleX } from "lucide-react";

import type { PlanFeature, PlanVariant } from "@/lib/content";
import { whatsappConversationUrl } from "@/lib/whatsappHref";

type PricingCardProps = {
  name: string;
  price: string;
  variant: PlanVariant;
  badge?: string;
  features: PlanFeature[];
  cta: string;
  onCtaClick?: () => void;
};

export function PricingCard({
  name,
  price,
  variant,
  badge,
  features,
  cta,
  onCtaClick,
}: PricingCardProps) {
  const isFeatured = variant === "featured";
  const isPro = variant === "pro";
  const waHref = whatsappConversationUrl();

  return (
    <div
      className={
        isFeatured
          ? "glass-panel-primary border-2 border-primary/55 p-10 rounded-2xl flex flex-col h-full relative transform md:-translate-y-4 shadow-[0_20px_50px_-12px_rgba(45,212,191,0.25)]"
          : "glass-panel p-10 rounded-2xl flex flex-col h-full hover:border-primary/35 transition-all duration-300"
      }
    >
      {badge ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary/95 backdrop-blur-sm text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-white/25 shadow-lg shadow-primary/20">
          {badge}
        </div>
      ) : null}
      <div className="mb-8">
        <h3
          className={`text-lg font-black uppercase tracking-widest mb-2 ${isFeatured ? "text-primary" : ""}`}
        >
          {name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">৳{price}</span>
          <span className="text-white/40 text-xs uppercase font-bold">
            / Month
          </span>
        </div>
      </div>
      <ul className="space-y-4 grow mb-10">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={`flex items-center gap-3 text-sm ${rowClass(feature, isFeatured, isPro)}`}
          >
            {feature.included ? (
              <CheckCircle2
                className={`size-[18px] shrink-0 ${checkIconClass(isFeatured, isPro)}`}
                strokeWidth={2}
              />
            ) : (
              <CircleX
                className="size-[18px] shrink-0 text-white/50"
                strokeWidth={2}
              />
            )}
            {feature.text}
          </li>
        ))}
      </ul>
      {onCtaClick ? (
        <button
          type="button"
          onClick={onCtaClick}
          className={`inline-flex items-center justify-center text-center ${ctaClass(isFeatured)}`}
        >
          {cta}
        </button>
      ) : (
        <a
          href={waHref ?? "#contact"}
          target={waHref ? "_blank" : undefined}
          rel={waHref ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center justify-center text-center ${ctaClass(isFeatured)}`}
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function rowClass(feature: PlanFeature, isFeatured: boolean, isPro: boolean) {
  if (isFeatured) {
    if (feature.text === "Cosmetic consult credit") return "text-white/70";
    return "";
  }
  if (isPro) return "text-white/70";
  if (feature.included) return "text-white/70";
  return "text-white/30";
}

function checkIconClass(isFeatured: boolean, isPro: boolean) {
  if (isFeatured) return "text-primary";
  if (isPro) return "text-green-500";
  return "text-green-500";
}

function ctaClass(isFeatured: boolean) {
  if (isFeatured) {
    return "w-full bg-primary/95 backdrop-blur-sm hover:bg-primary text-primary-foreground py-4 rounded-xl font-black uppercase tracking-widest text-xs border border-white/20 shadow-lg shadow-primary/25 transition-all active:scale-95";
  }
  return "w-full glass-panel border-white/18 hover:border-primary/45 hover:text-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all";
}

