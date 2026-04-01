"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { softEase } from "@/components/motion/variants";
import type { ReviewCardProps } from "@/components/sections/ReviewCard";

import { ReviewCard } from "./ReviewCard";

const AUTOPLAY_MS = 7000;

type ReviewsCarouselProps = {
  reviews: ReviewCardProps[];
};

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const count = reviews.length;
  const safeIndex = count ? index % count : 0;

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
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  useEffect(() => {
    return () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  const handleManual = useCallback((fn: () => void) => {
    fn();
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  }, []);

  const enter = reduce
    ? { duration: 0 }
    : { duration: 0.45, ease: softEase };
  const exit = reduce
    ? { duration: 0 }
    : { duration: 0.32, ease: softEase };

  if (!count) return null;

  const review = reviews[safeIndex];

  return (
    <div
      className="relative pb-14 md:pb-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-96 md:h-78 flex items-stretch justify-center px-11 sm:px-14 md:px-16">
        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous review"
              className="absolute left-0 top-1/2 z-10 flex size-9 sm:size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-white backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
              onClick={() => handleManual(() => go(-1))}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next review"
              className="absolute right-0 top-1/2 z-10 flex size-9 sm:size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-white backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
              onClick={() => handleManual(() => go(1))}
            >
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
          </>
        ) : null}

        <div
          className="w-full min-w-0 min-h-0 flex-1 flex flex-col"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={review.name}
              className="w-full h-full min-h-0 flex flex-col"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, transition: enter }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, x: -20, transition: exit }
              }
            >
              <ReviewCard {...review} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 ? (
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === safeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === safeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/25 hover:bg-white/45"
              }`}
              onClick={() => handleManual(() => goTo(i))}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
