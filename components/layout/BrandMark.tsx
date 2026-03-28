import { Dumbbell } from "lucide-react";

type BrandMarkProps = {
  iconClassName?: string;
  titleClassName?: string;
  wrapClassName?: string;
  iconWrapClassName?: string;
  /** Whole mark (icon + name) is a link, e.g. `#top` */
  href?: string;
};

export function BrandMark({
  iconClassName = "size-6",
  titleClassName = "text-xl",
  wrapClassName = "gap-3",
  iconWrapClassName = "p-1.5 rounded",
  href,
}: BrandMarkProps) {
  const inner = (
    <>
      <div
        className={`bg-primary ${iconWrapClassName} text-white flex items-center justify-center shrink-0`}
      >
        <Dumbbell className={iconClassName} strokeWidth={2.5} />
      </div>
      <span
        className={`${titleClassName} font-black tracking-tighter italic text-white`}
      >
        Fitness Zone Gym
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center ${wrapClassName} rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark`}
        aria-label="Fitness Zone Gym — back to top"
      >
        {inner}
      </a>
    );
  }

  return <div className={`flex items-center ${wrapClassName}`}>{inner}</div>;
}
