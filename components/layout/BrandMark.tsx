import { Smile } from "lucide-react";

import { site } from "@/lib/content";

type BrandMarkProps = {
  iconClassName?: string;
  titleClassName?: string;
  wrapClassName?: string;
  iconWrapClassName?: string;
  href?: string;
};

export function BrandMark({
  iconClassName = "size-8",
  titleClassName = "text-xl",
  wrapClassName = "gap-3",
  iconWrapClassName = "p-2 rounded-xl bg-primary/15 ring-1 ring-primary/25",
  href,
}: BrandMarkProps) {
  const inner = (
    <>
      <div
        className={`${iconWrapClassName} flex items-center justify-center shrink-0 text-primary`}
      >
        <Smile className={iconClassName} strokeWidth={2} aria-hidden />
      </div>
      <span
        className={`${titleClassName} font-black tracking-tighter italic text-slate-100`}
      >
        {site.practiceName}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center ${wrapClassName} rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark`}
        aria-label={`${site.practiceName} — back to top`}
      >
        {inner}
      </a>
    );
  }

  return <div className={`flex items-center ${wrapClassName}`}>{inner}</div>;
}
