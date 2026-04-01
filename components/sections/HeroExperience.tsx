"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Bath, ChevronLeft, ChevronRight, Dumbbell, UserRound, Users, Zap } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

import { softEase } from "@/components/motion/variants";
import type { HeroBadgeIcon, HeroSlide } from "@/lib/content";

const AUTOPLAY_MS = 6500;

const BADGE_ICONS: Record<
  HeroBadgeIcon,
  ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>
> = {
  zap: Zap,
  dumbbell: Dumbbell,
  userRound: UserRound,
  users: Users,
  bath: Bath,
};

/** Mobile: chevron only (no pill). md+: rounded bordered control. */
const heroCarouselArrowClass =
  "pointer-events-auto touch-manipulation absolute top-1/2 z-30 flex size-14 -translate-y-1/2 items-center justify-center " +
  "rounded-none border-0 bg-transparent shadow-none ring-0 backdrop-blur-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] " +
  "md:rounded-full md:border md:border-white/25 md:bg-zinc-950/80 md:shadow-[0_4px_28px_rgba(0,0,0,0.55)] md:backdrop-blur-md md:ring-1 md:ring-inset md:ring-white/10 md:drop-shadow-none " +
  "transition-all duration-200 hover:text-primary md:hover:border-primary/50 md:hover:bg-zinc-950 md:hover:text-primary md:hover:shadow-[0_6px_32px_rgba(240,109,15,0.2)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.96]";

function HeroCarouselNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const edge =
    direction === "prev"
      ? "left-[calc(0.25rem+env(safe-area-inset-left,0px))] md:left-[max(2rem,env(safe-area-inset-left,0px))]"
      : "right-[calc(0.25rem+env(safe-area-inset-right,0px))] md:right-[max(2rem,env(safe-area-inset-right,0px))]";

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={`${heroCarouselArrowClass} ${edge}`}
      onClick={onClick}
    >
      <Icon
        className="size-8 shrink-0 md:size-6"
        strokeWidth={2.35}
        aria-hidden
      />
    </button>
  );
}

type HeroExperienceProps = {
  slides: HeroSlide[];
  memberAvatars: string[];
};

export function HeroExperience({ slides, memberAvatars }: HeroExperienceProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const count = slides.length;
  const safeIndex = count ? index % count : 0;
  const slide = slides[safeIndex];

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!count) return;
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const goTo = useCallback(
    (i: number) => {
      if (!count) return;
      setIndex(((i % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleManual = useCallback((action: () => void) => {
    action();
    setPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  }, []);

  const contentTransition = reduce
    ? { duration: 0 }
    : { duration: 0.48, ease: softEase };
  const exitTransition = reduce
    ? { duration: 0 }
    : { duration: 0.3, ease: softEase };

  if (!count || !slide) return null;

  const BadgeIcon = BADGE_ICONS[slide.badgeIcon];

  return (
    <>
      <div
        className="absolute inset-0 z-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <Image
            key={s.src}
            alt={s.alt}
            aria-hidden={i !== safeIndex}
            className={`absolute inset-0 size-full object-cover object-center grayscale transition-opacity duration-[1200ms] ease-out ${
              i === safeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            src={s.src}
            fill
            priority={i === 0}
            sizes="100vw"
          />
        ))}
      </div>

      {count > 1 ? (
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-auto absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:bottom-10">
            {slides.map((s, i) => (
              <button
                key={`${s.src}-${i}`}
                type="button"
                aria-label={`Show slide ${i + 1} of ${count}`}
                aria-current={i === safeIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === safeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/35 hover:bg-white/55"
                }`}
                onClick={() => handleManual(() => goTo(i))}
              />
            ))}
          </div>

          <HeroCarouselNavButton
            direction="prev"
            onClick={() => handleManual(() => go(-1))}
          />
          <HeroCarouselNavButton
            direction="next"
            onClick={() => handleManual(() => go(1))}
          />
        </div>
      ) : null}

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div
          className="max-w-2xl space-y-8"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              className="space-y-8"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, transition: contentTransition }
              }
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -14,
                      transition: exitTransition,
                    }
              }
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/20 border border-primary/30">
                <BadgeIcon
                  className="text-primary size-3.5 shrink-0"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  {slide.badge}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
                {slide.line1}
                <br />
                <span className="text-primary">{slide.highlight}</span>
                {slide.line2Suffix}
              </h1>
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <a
                  href={slide.ctaHref}
                  className="inline-flex w-full sm:w-auto items-center justify-center bg-primary hover:bg-primary/90 text-white text-base font-black uppercase tracking-widest px-10 py-5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40"
                >
                  {slide.ctaLabel}
                </a>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {memberAvatars.map((src) => (
                      <Image
                        key={src}
                        alt="Member"
                        className="w-10 h-10 rounded-full border-2 border-background-dark object-cover"
                        src={src}
                        width={40}
                        height={40}
                        loading="eager"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-widest font-bold">
                    Trusted by 2,000+ athletes
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
