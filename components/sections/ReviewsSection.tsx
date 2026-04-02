import { FadeUp } from "@/components/motion/MotionPrimitives";
import { reviews } from "@/lib/content";

import { ReviewsCarousel } from "./ReviewsCarousel";

export function ReviewsSection() {
  return (
    <section className="bg-background-elevated py-24 relative" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Real <span className="text-primary">patient stories</span>
          </h2>
        </FadeUp>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
