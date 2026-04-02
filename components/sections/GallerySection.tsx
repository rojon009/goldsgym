"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";

import { FadeUp } from "@/components/motion/MotionPrimitives";
import { softEase } from "@/components/motion/variants";
import { CartoonButton } from "@/components/ui/cartoon-button";
import { galleryImages, galleryMosaicCount } from "@/lib/content";

/** Mobile: every cell gets an explicit aspect ratio so `Image fill` rows don’t collapse. Desktop: mosaic spans. */
const MOSAIC_TILE_CLASS = [
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-2 md:row-span-2",
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-2 md:row-span-1",
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-1 md:row-span-1",
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-1 md:row-span-1",
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-2 md:row-span-1",
  "col-span-1 aspect-[4/3] min-h-0 md:aspect-auto md:col-span-2 md:row-span-1",
] as const;

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const titleId = useId();
  const total = galleryImages.length;
  const mosaic = galleryImages.slice(0, galleryMosaicCount);

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

  return (
    <section
      className="bg-background-dark py-24 px-6 border-t border-white/5"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-4 max-w-2xl mx-auto">
          <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">
            See the clinic
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Calm <span className="text-primary">spaces</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed">
            Bright operatories, organized sterilization, and a reception that
            doesn’t feel like a waiting room. Tap any photo to browse the full tour.
          </p>
        </FadeUp>

        <div
          className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-2.5 sm:gap-3 md:gap-3 md:min-h-[460px] mt-12"
          aria-label="Gallery preview grid"
        >
          {mosaic.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={`relative overflow-hidden rounded-xl border border-white/10 bg-surface text-left shadow-lg transition-all hover:border-primary/40 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${MOSAIC_TILE_CLASS[i]}`}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-dark/70 via-transparent to-transparent" />
            </button>
          ))}
        </div>

        {total > 0 ? (
          <FadeUp className="mt-10 flex justify-center" delay={0.08}>
            <CartoonButton
              label="See all photos"
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
              className="absolute inset-0 z-0 cursor-pointer bg-black/92 backdrop-blur-md"
              aria-hidden
              onClick={close}
            />

            <div className="relative z-10 flex h-full min-h-0 flex-col">
              <button
                type="button"
                aria-label="Close gallery"
                className="absolute right-4 top-4 z-[110] flex size-11 items-center justify-center rounded-full border border-white/15 bg-surface text-white transition-colors hover:border-primary hover:text-primary"
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
                      exit={{ opacity: 0, x: -12, transition: { duration: 0.18 } }}
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
                    className="absolute left-0 top-1/2 z-[105] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-surface/95 text-white transition-colors hover:border-primary hover:text-primary md:left-2"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft className="size-6" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 z-[105] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-surface/95 text-white transition-colors hover:border-primary hover:text-primary md:right-2"
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
