"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";

import { FadeUp } from "@/components/motion/MotionPrimitives";
import { softEase } from "@/components/motion/variants";
import { CartoonButton } from "@/components/ui/cartoon-button";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { galleryImages } from "@/lib/content";

const SLIDE_W = 280;
const SLIDE_H = 210;

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const titleId = useId();
  const total = galleryImages.length;

  const close = useCallback(() => setLightbox(null), []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setLightbox((i) => {
        if (i === null || total === 0) return i;
        return (i + dir + total) % total;
      });
    },
    [total],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, go]);

  const fadeMask =
    "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";

  const renderSlides = () =>
    galleryImages.map((item, i) => (
      <button
        type="button"
        key={item.src}
        className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-white/12 transition-[transform,box-shadow,ring-color] duration-300 hover:z-[1] hover:ring-primary/40 hover:shadow-[0_12px_40px_-8px_rgba(45,212,191,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        style={{ width: SLIDE_W, height: SLIDE_H }}
        onClick={() => setLightbox(i)}
        aria-label={`Open gallery: ${item.alt}`}
      >
        <Image
          src={item.src}
          alt=""
          width={SLIDE_W}
          height={SLIDE_H}
          className="size-full object-cover"
          sizes="(max-width: 640px) 72vw, 280px"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
      </button>
    ));

  return (
    <section className="glass-section-deep py-24 px-6" id="gallery">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-4 max-w-2xl mx-auto">
          <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">
            See the clinic
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Calm <span className="text-primary">spaces</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed">
            A living tour of our operatories and team areas—scrolls
            automatically. Tap any image for the full-screen gallery.
          </p>
        </FadeUp>

        <div className="relative mt-12 space-y-5 md:space-y-7">
          <div className={`relative ${fadeMask}`}>
            <InfiniteSlider
              gap={20}
              duration={105}
              durationOnHover={90}
              direction="horizontal"
              className="cursor-grab active:cursor-grabbing"
            >
              {renderSlides()}
            </InfiniteSlider>
          </div>
          <div className={`relative ${fadeMask}`}>
            <InfiniteSlider
              gap={20}
              duration={110}
              durationOnHover={95}
              direction="horizontal"
              reverse
              className="cursor-grab active:cursor-grabbing"
            >
              {renderSlides()}
            </InfiniteSlider>
          </div>
        </div>

        {total > 0 ? (
          <FadeUp className="mt-12 flex justify-center" delay={0.08}>
            <CartoonButton
              label="Open full gallery"
              color="bg-primary"
              onClick={() => setLightbox(0)}
            />
          </FadeUp>
        ) : null}
      </div>

      <AnimatePresence>
        {lightbox !== null && total > 0 ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 z-0 cursor-pointer bg-black/88 backdrop-blur-2xl"
              aria-hidden
              onClick={close}
            />

            <div className="relative z-10 flex h-full min-h-0 flex-col">
              <button
                type="button"
                aria-label="Close gallery"
                className="absolute right-4 top-4 z-[110] flex size-11 items-center justify-center rounded-full glass-panel-strong text-white transition-colors hover:border-primary/50 hover:text-primary"
                onClick={close}
              >
                <X className="size-5" strokeWidth={2} />
              </button>

              <p id={titleId} className="sr-only">
                Gallery lightbox, image {lightbox + 1} of {total}
              </p>

              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-8 pt-16 md:px-10">
                <div className="relative flex h-[min(72vh,720px)] w-full max-w-5xl items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={galleryImages[lightbox].src}
                      className="relative h-full w-full"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.25, ease: softEase },
                      }}
                      exit={{
                        opacity: 0,
                        x: -12,
                        transition: { duration: 0.18 },
                      }}
                    >
                      <Image
                        src={galleryImages[lightbox].src}
                        alt={galleryImages[lightbox].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 z-[105] flex size-11 -translate-y-1/2 items-center justify-center rounded-full glass-panel-strong text-white transition-colors hover:border-primary/50 hover:text-primary md:left-2"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft className="size-6" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 z-[105] flex size-11 -translate-y-1/2 items-center justify-center rounded-full glass-panel-strong text-white transition-colors hover:border-primary/50 hover:text-primary md:right-2"
                    onClick={() => go(1)}
                  >
                    <ChevronRight className="size-6" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button
                      key={galleryImages[i].src}
                      type="button"
                      aria-label={`Go to image ${i + 1}`}
                      aria-current={i === lightbox}
                      className={`h-2 rounded-full transition-all ${
                        i === lightbox
                          ? "w-8 bg-primary"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                      onClick={() => setLightbox(i)}
                    />
                  ))}
                </div>

                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                  {lightbox + 1} / {total}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
