import Image from "next/image";
import {
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

import {
  FadeUp,
  SideFade,
  Stagger,
  StaggerChild,
} from "@/components/motion/MotionPrimitives";
import { contact } from "@/lib/content";
import { whatsappConversationUrl } from "@/lib/whatsappHref";

const socialLinks: { Icon: LucideIcon; href: string; label: string }[] = [
  { Icon: Globe, href: "#", label: "Website" },
  { Icon: Camera, href: "#", label: "Social" },
  { Icon: PlayCircle, href: "#", label: "Video" },
];

function contactLinks(c: typeof contact) {
  const whatsapp = whatsappConversationUrl(c.whatsappPrefillMessage);
  const maps =
    c.googleMapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;

  // Use encodeURIComponent (not URLSearchParams): + for spaces breaks many mail clients.
  const mailPieces: string[] = [];
  if (c.emailSubject?.trim()) {
    mailPieces.push(`subject=${encodeURIComponent(c.emailSubject.trim())}`);
  }
  if (c.emailBody?.trim()) {
    mailPieces.push(`body=${encodeURIComponent(c.emailBody.trim())}`);
  }
  const mailQuery = mailPieces.join("&");
  const email = mailQuery
    ? `mailto:${c.email}?${mailQuery}`
    : `mailto:${c.email}`;

  return {
    whatsapp,
    email,
    maps,
  } as const;
}

export function ContactSection() {
  const { whatsapp, email: emailHref, maps } = contactLinks(contact);

  return (
    <section
      className="bg-zinc-950 py-24 border-t border-white/5 overflow-hidden"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <FadeUp className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                Get in <span className="text-primary">Touch</span>
              </h2>
              <p className="text-white/50 text-sm max-w-sm">
                Ready to start your journey? Our team is available 24/7 to
                answer your questions.
              </p>
            </FadeUp>
            <Stagger className="space-y-8">
              <StaggerChild>
                <ContactRow
                  Icon={MapPin}
                  label="Location"
                  value={contact.address}
                  href={maps}
                  external
                  linkLabel={`Open ${contact.address} in Google Maps`}
                />
              </StaggerChild>
              <StaggerChild>
                <ContactRow
                  Icon={Phone}
                  label="Phone"
                  value={contact.phone}
                  href={whatsapp}
                  external
                  linkLabel={
                    whatsapp
                      ? `Message ${contact.phone} on WhatsApp`
                      : undefined
                  }
                />
              </StaggerChild>
              <StaggerChild>
                <ContactRow
                  Icon={Mail}
                  label="Email"
                  value={contact.email}
                  href={emailHref}
                  linkLabel={`Send email to ${contact.email}`}
                />
              </StaggerChild>
            </Stagger>
            <FadeUp className="flex gap-4" delay={0.08}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary transition-all border border-white/5"
                  href={href}
                  aria-label={label}
                >
                  <Icon className="size-[18px]" strokeWidth={2} />
                </a>
              ))}
            </FadeUp>
          </div>
          <SideFade className="relative w-full" delay={0.06}>
            <div className="relative h-[300px] sm:h-[340px] lg:h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <Image
                alt={contact.gymImageAlt}
                className="object-cover opacity-90"
                src={contact.gymImageSrc}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent pointer-events-none" />
            </div>
          </SideFade>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  external,
  linkLabel,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  linkLabel?: string;
}) {
  const inner = (
    <>
      <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-primary transition-colors shrink-0">
        <Icon className="text-primary size-5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
          {label}
        </h4>
        <p className="text-sm font-bold wrap-break-word group-hover:text-primary transition-colors">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={linkLabel ?? `${label}: ${value}`}
        className="flex items-center gap-6 group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return <div className="flex items-center gap-6 group">{inner}</div>;
}
