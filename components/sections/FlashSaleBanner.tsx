import { Zap } from "lucide-react";

export function FlashSaleBanner() {
  return (
    <div className="bg-primary p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-20 shadow-2xl shadow-primary/25 border border-primary-foreground/15">
      <div className="flex items-center gap-4">
        <div className="bg-primary-foreground/15 p-2 rounded-lg animate-pulse">
          <Zap className="text-primary-foreground size-6" strokeWidth={2.5} aria-hidden />
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary-foreground italic">
            Limited Time Flash Sale
          </h4>
          <p className="text-[10px] text-primary-foreground/85 font-bold uppercase">
            50% Off Joining Fee + First Month Free for New Members
          </p>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4">
        <p className="text-xs font-black text-primary-foreground/90 uppercase flex items-center gap-1">
          Ends in:{" "}
          <span className="bg-primary-foreground/12 px-2 py-1 rounded-md text-primary-foreground">
            08h 42m 12s
          </span>
        </p>
        <button
          type="button"
          className="bg-background-dark text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 hover:bg-background-elevated transition-colors"
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
}
