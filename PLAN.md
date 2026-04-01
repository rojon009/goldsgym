# Plan: Replicate the Fitness Zone Gym marketing site

This document analyzes the **current codebase** in this repository (single-page marketing site for “Fitness Zone Gym”). If you meant a **different** live URL, add that URL and screenshots to your brief; the **master prompt** below can be adapted by replacing content and asset references.

---

## 1. What this site is

- **Type:** Single-page landing / marketing site (no separate routes in `app/` besides home).
- **Brand:** Fitness Zone Gym — tagline theme: “Forge Your Finest Self.”
- **Audience:** Premium gym positioning (elite equipment, women-only slots, coaches, recovery, membership tiers).
- **Language / locale:** English UI; contact block includes a Dhaka, Bangladesh address and `+880` phone.

---

## 2. Tech stack (as implemented)

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` in `app/globals.css`) |
| Font | Lexend via `next/font/google` — CSS variable `--font-lexend`, `font-display` |
| Motion | Framer Motion (`motion` components, reduced-motion aware) |
| Icons | `lucide-react` |
| Images | Remote Unsplash URLs in `lib/content.ts` (`images.unsplash.com`, `auto=format&fit=crop&w=2000&q=80`) |
| Integrations | WhatsApp deep link from phone (`lib/whatsappHref.ts`), `mailto` / Google Maps URL from `contact` object |

---

## 3. Information architecture

**Single route:** `/` (`app/page.tsx`).

**Section order (top → bottom):**

1. **SiteHeader** — Fixed, blurred dark bar; logo; desktop nav; “Join Now” → `#contact`.
2. **HeroSection** — Full-viewport hero with **carousel** of slides (`heroSlides`), gradient overlays, optional side “Explore Facilities” vertical label (md+).
3. **FacilitiesSection** — `#facilities` — Four facility cards (icon + image + copy).
4. **ClassScheduleSection** — `#schedule` — Weekday (Sat–Thu) vs Friday schedules, slot types (`combined` / `womenOnly`).
5. **ProfessionalsSection** — `#professionals` — Coach cards (image, role, bio, expertise tags).
6. **MembershipSection** — `#membership` — Three tiers (Base / Elite / Pro), pricing, feature checkmarks, CTAs.
7. **ReviewsSection** — `#reviews` — Testimonials (carousel / cards per implementation).
8. **GallerySection** — `#gallery` — Image mosaic + lightbox-style “view all” behavior (see `galleryMosaicCount`).
9. **ContactSection** — `#contact` — Address (maps link), phone (WhatsApp), email, gym image.

**SiteFooter** — Brand, links, legal placeholder as coded.

**Anchor nav** (`navLinks` in `lib/content.ts`): `#facilities`, `#schedule`, `#professionals`, `#membership`, `#reviews`, `#gallery`, `#contact`.

**Global UX:** `scroll-padding-top: 5rem` for fixed header; smooth scroll when reduced motion allows (`globals.css`).

---

## 4. Design system (tokens & patterns)

**Colors (`@theme inline`):**

- `--color-primary`: `#f06d0f` (orange CTA / accents)
- `--color-background-light`: `#f8f7f5`
- `--color-background-dark`: `#0a0a0a`
- `--color-accent`: `#ffcc00`
- Default presentation: `dark` class on `<html>`, body uses dark background + white text

**Typography:** Lexend, uppercase + wide tracking on nav and many labels; hierarchy uses size/weight and occasional `text-outline` utility.

**Effects:** Header `backdrop-blur`, borders `border-white/10`, primary shadows `shadow-primary/20`, `.hero-gradient` left-to-right dark fade, Framer Motion staggered entrance on header links.

**Responsive:** Nav links hidden below `md`; patterns follow `max-w-7xl mx-auto px-6` style in header.

---

## 5. Content & data

All copy, prices, schedule rules, team bios, reviews, gallery list, and contact fields live in **`lib/content.ts`**. Types include `FacilityIconKey`, `ScheduleSlot`, `HeroSlide`, `PlanVariant`, etc.

To clone behavior exactly, reproduce:

- `navLinks`, `hero`, `facilities`, `scheduleWeekday`, `scheduleFriday`, `professionals`, `heroSlides`, `membershipPlans`, `reviews`, `galleryImages`, `galleryMosaicCount`, `contact`.

---

## 6. Component map (high level)

| Area | Files |
|------|--------|
| Layout | `components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `BrandMark.tsx` |
| Hero | `HeroSection.tsx`, `HeroExperience.tsx` (client: slides, controls) |
| Sections | `FacilitiesSection`, `ClassScheduleSection`, `ProfessionalsSection`, `MembershipSection` + `PricingCard`, `ReviewsSection` + `ReviewsCarousel`, `ReviewCard`, `GallerySection`, `ContactSection` |
| Motion | `components/motion/MotionPrimitives.tsx`, `variants.ts` |
| Utilities | `lib/whatsappHref.ts` |

Unused in home but present: `FlashSaleBanner.tsx` (not imported in `app/page.tsx`).

---

## 7. Implementation plan (for a greenfield rebuild)

1. **Scaffold** — Next.js App Router, TypeScript, Tailwind v4, ESLint; add Framer Motion, Lucide.
2. **Design tokens** — Mirror `globals.css` `@theme` and utilities (`hero-gradient`, `text-outline`, `hide-scrollbar`, `vertical-lr`, scroll padding).
3. **Layout shell** — `layout.tsx`: metadata, Lexend, dark body classes.
4. **Content module** — Port `lib/content.ts` (or CMS later; structure types first).
5. **Header / footer** — Fixed header with anchor nav + CTA; footer matching current.
6. **Hero** — Full-height section, slide data-driven carousel, gradients, CTAs to hashes, `prefers-reduced-motion` branches.
7. **Sections 2–9** — Build in page order; reuse small cards (facility, pricing, review).
8. **Gallery** — Mosaic + expanded gallery / lightbox per existing behavior.
9. **Contact** — Maps, `wa.me`, `mailto` with prefills from `contact`.
10. **QA** — Keyboard focus, anchor offsets, mobile nav (if you add a drawer—current code is desktop nav only), Lighthouse, cross-browser.

---

## 8. Master prompt (copy for an AI or contractor)

Use this verbatim or tweak brand/geo fields. It is written to reproduce **this repository’s** design and structure.

```text
You are building a pixel- and behavior-faithful clone of a premium gym marketing site.

GOAL
- Single-page Next.js App Router site at route `/` only.
- Dark theme default: background #0a0a0a, white text, primary orange #f06d0f, accent yellow #ffcc00, optional light background token #f8f7f5 for rare surfaces.
- Font: Lexend (next/font/google), CSS variable --font-lexend; apply as main display font.

STACK
- Next.js (current stable App Router), React, TypeScript, Tailwind CSS v4 with @theme inline tokens matching the colors above, Framer Motion (respect prefers-reduced-motion), lucide-react for icons.

PAGE STRUCTURE (exact order)
1) Fixed header: height ~5rem (h-20), bg dark/80 + backdrop-blur + bottom border white/10; left: brand wordmark linking to #; center (md+): nav links uppercase tracking-widest text-sm; right: primary button “Join Now” → #contact. Animate header entrance with Framer Motion unless reduced motion.
2) Hero: min-h-screen, pt-20 for header offset, full-bleed image carousel with multiple slides. Each slide: background image, badge pill with icon, two-line headline with one accent word highlighted, short description, CTA button to an in-page hash. Left side: dark gradient overlay (.hero-gradient: black 100% → transparent to the right) plus bottom gradient from background-dark. Optional md+ decorative column: vertical “Explore Facilities” label and vertical gradient line. Use data-driven slides array.
3) Facilities: section#facilities — grid of four cards: image, icon, title, description (elite equipment, exclusive women slots, coaches, recovery).
4) Schedule: section#schedule — two blocks: “Saturday–Thursday” with three time slots (combined / women-only / combined) and “Friday” with one evening slot. Visual distinction between combined vs women-only slots.
5) Team: section#professionals — responsive grid of coach cards: photo, name, title, experience paragraph, expertise tags.
6) Membership: section#membership — three pricing cards: Base 1300, Elite 1600 (featured “Most Popular”), Pro 2000 — currency as implemented; feature lists with check/cross; primary CTA on featured tier.
7) Reviews: section#reviews — member quotes with star ratings, names, tenure; carousel or horizontal scroll as in reference.
8) Gallery: section#gallery — mosaic of Unsplash gym images; show first N tiles then expand/lightbox pattern; use shared gallery image list.
9) Contact: section#contact — gym photo, address row opening Google Maps URL, phone row opening WhatsApp wa.me with URL-encoded prefilled message, email row with mailto subject/body prefills.

CONTENT
- Implement a single lib/content.ts (or equivalent) exporting: navLinks, heroSlides, facilities, scheduleWeekday, scheduleFriday, professionals, membershipPlans, reviews, galleryImages, galleryMosaicCount, contact (address, phone, email, googleMapsUrl, whatsapp prefill, email subject/body, gym image).
- Use remote images from images.unsplash.com with auto=format&fit=crop&w=2000&q=80 for consistency.

GLOBAL CSS
- html scroll-padding-top: 5rem; smooth scroll if user does not prefer reduced motion.
- Utilities: .hero-gradient, .text-outline, .hide-scrollbar, .vertical-lr; pointer cursors on links/buttons.

FOOTER
- Match a typical marketing footer: brand, quick anchor links, copyright.

QUALITY BAR
- No horizontal overflow; accessible focus states; semantic sections and headings; metadata title “Fitness Zone Gym | Forge Your Finest Self” and SEO description about expert coaching and premium facilities.

Do not add unrelated pages or refactor scope beyond this single landing page unless asked.
```

---

## 9. Notes

- **“Exact copy”** in production also means matching **spacing, breakpoints, animation timings, and image crops**; compare side-by-side with `npm run dev` and adjust Tailwind classes until aligned.
- **Optional:** Add a mobile hamburger menu if parity with a future design requires it; the current header hides nav below `md`.
- **Legal:** Membership prices and contact details are as in `lib/content.ts` — update for your real business before launch.
