import { FadeUp } from "@/components/motion/MotionPrimitives";
import { BrandMark } from "@/components/layout/BrandMark";
import { site } from "@/lib/content";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Contact Us" },
] as const;

export function SiteFooter() {
  return (
    <footer className="glass-section-deep border-t border-white/10 py-16 px-6">
      <FadeUp className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <BrandMark
          iconClassName="size-12"
          titleClassName="text-lg"
          wrapClassName="gap-3"
          iconWrapClassName="p-1.5 rounded-lg glass-panel"
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
          © {new Date().getFullYear()} {site.practiceName}. Crafted for confident smiles.
        </p>
      </FadeUp>
    </footer>
  );
}
