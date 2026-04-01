import { FadeUp } from "@/components/motion/MotionPrimitives";
import { BrandMark } from "@/components/layout/BrandMark";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Contact Us" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-background-dark border-t border-white/5 py-16 px-6">
      <FadeUp className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <BrandMark
          iconClassName="size-12"
          titleClassName="text-lg"
          wrapClassName="gap-3"
          iconWrapClassName="p-1 rounded"
        />
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
          © 2024 Gold&apos;s GYM. THE ELITE STANDARD.
        </p>
      </FadeUp>
    </footer>
  );
}
