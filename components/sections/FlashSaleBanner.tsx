import { Zap } from "lucide-react";

export function FlashSaleBanner() {
  return (
    <div className="bg-primary p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-20 shadow-2xl shadow-primary/20">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded animate-pulse">
          <Zap className="text-white size-6" strokeWidth={2.5} aria-hidden />
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white italic">
            Limited Time Flash Sale
          </h4>
          <p className="text-[10px] text-white/80 font-bold uppercase">
            50% Off Joining Fee + First Month Free for New Members
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xs font-black text-white/80 uppercase">
          Ends in:{" "}
          <span className="bg-black/20 px-2 py-1 rounded">08h 42m 12s</span>
        </p>
        <button
          type="button"
          className="bg-white text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded"
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
}
