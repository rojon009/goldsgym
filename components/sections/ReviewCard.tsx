import Image from "next/image";
import { Star } from "lucide-react";

export type ReviewCardProps = {
  name: string;
  tenure: string;
  imageSrc: string;
  quote: string;
  /** 1–5 */
  rating: number;
};

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${clamped} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < clamped
              ? "size-4 md:size-[1.125rem] text-accent fill-accent shrink-0"
              : "size-4 md:size-[1.125rem] text-white/20 fill-none shrink-0"
          }
          strokeWidth={i < clamped ? 1.5 : 1.25}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewCard({
  name,
  tenure,
  imageSrc,
  quote,
  rating,
}: ReviewCardProps) {
  return (
    <div className="w-full bg-zinc-900 p-8 md:p-10 lg:p-12 rounded-2xl border border-white/5 min-h-[240px] md:min-h-[260px] flex flex-col md:flex-row md:items-stretch md:gap-10 lg:gap-14">
      <div className="flex items-center gap-4 mb-6 md:mb-0 md:flex-col md:items-start md:gap-5 shrink-0 md:w-52 lg:w-56">
        <Image
          alt={name}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20 shrink-0"
          src={imageSrc}
          width={64}
          height={64}
        />
        <div className="min-w-0 flex-1 md:flex-none">
          <h4 className="font-black uppercase tracking-wider text-balance">
            {name}
          </h4>
          <p className="text-[10px] text-primary font-bold uppercase">
            {tenure}
          </p>
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
      <p className="text-white/60 italic leading-relaxed text-sm md:text-base md:leading-relaxed flex-1 md:flex md:items-center md:border-l md:border-white/10 md:pl-10 lg:pl-12 pt-6 md:pt-0 border-t border-white/10 md:border-t-0 mt-auto md:mt-0">
        &quot;{quote}&quot;
      </p>
    </div>
  );
}
