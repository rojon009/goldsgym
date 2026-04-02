import { Gift } from "lucide-react";

export function FlashSaleBanner() {
  return (
    <div className="glass-panel-primary p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-20">
      <div className="flex items-center gap-4">
        <div className="bg-primary-foreground/12 backdrop-blur-sm p-2 rounded-xl border border-primary-foreground/20 animate-pulse">
          <Gift className="text-primary-foreground size-6" strokeWidth={2.5} aria-hidden />
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary-foreground italic">
            New patient offer
          </h4>
          <p className="text-[10px] text-primary-foreground/85 font-bold uppercase md:normal-case md:text-xs md:font-semibold">
            Free exam + digital X-rays + treatment roadmap when you start any paid hygiene visit this month.
          </p>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4 w-full md:w-auto">
        <p className="text-xs font-black text-primary-foreground/90 uppercase flex items-center gap-1 text-center md:text-left">
          Limited chairs:{" "}
          <span className="bg-primary-foreground/12 px-2 py-1 rounded-md text-primary-foreground">
            This month only
          </span>
        </p>
        <a
          href="#contact"
          className="w-full md:w-auto text-center glass-panel-strong text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border-white/15 hover:border-primary/40 transition-colors"
        >
          Claim new-patient visit
        </a>
      </div>
    </div>
  );
}
