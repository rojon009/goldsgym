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
          ? "bg-zinc-900 border-2 border-primary p-10 rounded-2xl flex flex-col h-full relative transform md:-translate-y-4 shadow-2xl shadow-primary/10"
          : "bg-zinc-900 border border-white/10 p-10 rounded-2xl flex flex-col h-full hover:border-primary/50 transition-all duration-300"
      }
    >
      {badge ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
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
    if (feature.text === "Group Classes") return "text-white/70";
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
    return "w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all active:scale-95";
  }
  return "w-full border border-white/20 hover:border-primary hover:text-primary py-4 rounded-lg font-black uppercase tracking-widest text-xs transition-colors";
}
