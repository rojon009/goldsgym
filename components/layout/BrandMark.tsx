import Image from "next/image";

type BrandMarkProps = {
  iconClassName?: string;
  titleClassName?: string;
  wrapClassName?: string;
  iconWrapClassName?: string;
  /** Whole mark (icon + name) is a link, e.g. `#top` */
  href?: string;
};

export function BrandMark({
  iconClassName = "size-14",
  titleClassName = "text-xl",
  wrapClassName = "gap-3",
  iconWrapClassName = "p-1.5 rounded",
  href,
}: BrandMarkProps) {
  const inner = (
    <>
      <div className={`${iconWrapClassName} flex items-center justify-center shrink-0`}>
        <Image
          src="/goldsgym-logo.png"
          alt="Gold's GYM logo"
          width={72}
          height={72}
          className={iconClassName}
          priority
        />
      </div>
      <span
        className={`${titleClassName} font-black tracking-tighter italic text-white`}
      >
        Gold&apos;s GYM
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center ${wrapClassName} rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark`}
        aria-label="Gold&apos;s GYM — back to top"
      >
        {inner}
      </a>
    );
  }

  return <div className={`flex items-center ${wrapClassName}`}>{inner}</div>;
}
