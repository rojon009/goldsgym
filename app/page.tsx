import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { ClassScheduleSection } from "@/components/sections/ClassScheduleSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { ProfessionalsSection } from "@/components/sections/ProfessionalsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembershipSection } from "@/components/sections/MembershipSection";

const ReviewsSection = dynamic(
  () => import("@/components/sections/ReviewsSection").then((m) => m.ReviewsSection),
);
const GallerySection = dynamic(
  () => import("@/components/sections/GallerySection").then((m) => m.GallerySection),
);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FacilitiesSection />
        <ClassScheduleSection />
        <ProfessionalsSection />
        <MembershipSection />
        <ReviewsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
