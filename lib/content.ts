export const site = {
  practiceName: "Radiant Smile Dental",
  tagline: "Confidence starts with a healthy smile.",
  city: "Dhaka",
} as const;

export const navLinks = [
  { href: "#facilities", label: "Services" },
  { href: "#schedule", label: "Hours" },
  { href: "#professionals", label: "Team" },
  { href: "#membership", label: "Care plans" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const hero = {
  patientAvatars: [
    u("photo-1551601651-2a8555f1a136"),
    u("photo-1522337360788-8b13dee7a37e"),
    u("photo-1472099645785-5658abf4ff4e"),
  ],
};

export type FacilityIconKey = "sparkles" | "shield" | "stethoscope" | "smile";

export const facilities: {
  title: string;
  icon: FacilityIconKey;
  imageSrc: string;
  description: string;
}[] = [
  {
    title: "Digital dentistry",
    icon: "sparkles",
    imageSrc: u("photo-1606811841689-23dfddce3e95"),
    description:
      "Intra-oral scans, precision diagnostics, and treatment plans you can actually understand.",
  },
  {
    title: "Gentle hygiene & prevention",
    icon: "smile",
    imageSrc: u("photo-1629909613654-28e377c37b09"),
    description:
      "Thorough cleanings, fluoride guidance, and habits that keep problems small—before they hurt.",
  },
  {
    title: "Restorative & implants",
    icon: "stethoscope",
    imageSrc: u("photo-1771442873035-474765b40ac6"),
    description:
      "Fillings, crowns, bridges, and implants placed with comfort-first protocols and clear timelines.",
  },
  {
    title: "Sterile, calm suites",
    icon: "shield",
    imageSrc: u("photo-1572177215152-32f247303126"),
    description:
      "Hospital-grade sterilization, noise-aware care, and sedation options when you need extra ease.",
  },
];

export type ScheduleSlotType = "standard" | "featured";

export type ScheduleSlot = {
  timeLabel: string;
  type: ScheduleSlotType;
  /** Short line for card */
  detail: string;
};

export const scheduleWeekday: {
  title: string;
  subtitle: string;
  slots: ScheduleSlot[];
} = {
  title: "Saturday – Thursday",
  subtitle:
    "Same-day emergencies during open hours. Call or WhatsApp—we’ll fit you in when you need us most.",
  slots: [
    {
      timeLabel: "9:00 AM – 1:00 PM",
      type: "standard",
      detail:
        "Check-ups, hygiene, treatment starts · Dentist + hygienist on duty",
    },
    {
      timeLabel: "2:00 PM – 5:30 PM",
      type: "featured",
      detail:
        "Family block · Kids welcome · Extra time for anxious patients & first visits",
    },
    {
      timeLabel: "6:00 PM – 9:00 PM",
      type: "standard",
      detail:
        "Evening appointments for busy professionals · Limited chairs—book ahead",
    },
  ],
};

export const scheduleFriday: {
  title: string;
  subtitle: string;
  slots: ScheduleSlot[];
} = {
  title: "Friday",
  subtitle: "Short day focused on consults, hygiene touch-ups, and follow-ups.",
  slots: [
    {
      timeLabel: "10:00 AM – 4:00 PM",
      type: "standard",
      detail:
        "Open for scheduled visits · Call before noon for same-day concerns",
    },
  ],
};

export const professionals: {
  name: string;
  designation: string;
  experience: string;
  expertise: string[];
  imageSrc: string;
  imageAlt: string;
}[] = [
  {
    name: "Dr. Farhana Rahman",
    designation: "Lead Dentist · Cosmetic & restorative",
    experience:
      "14+ years helping patients rebuild worn teeth and love their smiles again—clear options, zero pressure.",
    expertise: ["Smile makeovers", "Crowns & veneers", "Full-mouth rehab"],
    imageSrc: u("photo-1559839734-2b71ea197ec2"),
    imageAlt: "Dr. Farhana Rahman, lead dentist at Radiant Smile Dental",
  },
  {
    name: "Dr. Arif Chowdhury",
    designation: "Oral surgeon · Implants",
    experience:
      "11+ years placing implants and handling extractions with IV sedation coordination when needed.",
    expertise: ["Dental implants", "Wisdom teeth", "Bone graft planning"],
    imageSrc: u("photo-1622253692010-333f2da6031d"),
    imageAlt: "Dr. Arif Chowdhury, implant and oral surgery specialist",
  },
  {
    name: "Nadia Islam, RDH",
    designation: "Registered dental hygienist",
    experience:
      "9+ years specializing in gentle deep cleanings, gum health coaching, and stain control that lasts.",
    expertise: ["Gum therapy", "Air polishing", "Sensitivity care"],
    imageSrc: u("photo-1594824476967-48c8b964273f"),
    imageAlt: "Nadia Islam, registered dental hygienist",
  },
  {
    name: "Dr. Samina Kabir",
    designation: "Family & pediatric dentistry",
    experience:
      "8+ years making kids and first-timers comfortable—parents trust her patience and predictable visits.",
    expertise: [
      "Kids’ dentistry",
      "Preventive sealants",
      "Early ortho screening",
    ],
    imageSrc: u("photo-1573496359142-b8d87734a5a2"),
    imageAlt: "Dr. Samina Kabir, family dentist",
  },
  {
    name: "Rafi Ahmed, CDA",
    designation: "Clinical care coordinator",
    experience:
      "Coordinates sedation visits, insurance questions, and financing so billing never blocks your care.",
    expertise: ["Treatment planning", "Insurance help", "Same-day scheduling"],
    imageSrc: hero.patientAvatars[2],
    imageAlt: "Rafi Ahmed, clinical care coordinator",
  },
];

export type HeroBadgeIcon =
  | "zap"
  | "sparkles"
  | "shield"
  | "stethoscope"
  | "smile";

export type HeroSlide = {
  src: string;
  alt: string;
  badge: string;
  badgeIcon: HeroBadgeIcon;
  /** First line of the headline (upper line) */
  line1: string;
  /** Accent word on the second line */
  highlight: string;
  /** Text after the highlight on the second line */
  line2Suffix: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: u("photo-1581939511501-4ec557ff0957"),
    alt: "Modern dental treatment suite with comfortable chair and lighting",
    badgeIcon: "zap",
    badge: "Same-week appointments",
    line1: "Your best smile,",
    highlight: "without",
    line2Suffix: " the stress",
    description:
      "Honest exams, gentle hands, and a team that explains every option—including what can wait. Book a free consult and leave with a clear plan.",
    ctaLabel: "Book free consult",
    ctaHref: "#contact",
  },
  {
    src: facilities[0].imageSrc,
    alt: `${facilities[0].title} — Radiant Smile Dental`,
    badgeIcon: "sparkles",
    badge: "Digital smile design",
    line1: "Look natural.",
    highlight: "Feel",
    line2Suffix: " amazing.",
    description: facilities[0].description,
    ctaLabel: "See services",
    ctaHref: "#facilities",
  },
  {
    src: facilities[1].imageSrc,
    alt: `${facilities[1].title} — Radiant Smile Dental`,
    badgeIcon: "smile",
    badge: "Comfort-first care",
    line1: "We slow down",
    highlight: "when",
    line2Suffix: " you need us to",
    description: facilities[1].description,
    ctaLabel: "View hours",
    ctaHref: "#schedule",
  },
  {
    src: facilities[2].imageSrc,
    alt: `${facilities[2].title} — Radiant Smile Dental`,
    badgeIcon: "stethoscope",
    badge: "Restorative experts",
    line1: "Fix pain.",
    highlight: "Rebuild",
    line2Suffix: " confidence.",
    description: facilities[2].description,
    ctaLabel: "Meet the team",
    ctaHref: "#professionals",
  },
  {
    src: facilities[3].imageSrc,
    alt: `${facilities[3].title} — Radiant Smile Dental`,
    badgeIcon: "shield",
    badge: "Safety you can see",
    line1: "Clean.",
    highlight: "Calm.",
    line2Suffix: " In control.",
    description: facilities[3].description,
    ctaLabel: "Explore the clinic",
    ctaHref: "#gallery",
  },
];

export type PlanVariant = "default" | "featured" | "pro";

export type PlanFeature = { text: string; included: boolean };

export const membershipPlans: {
  name: string;
  price: string;
  variant: PlanVariant;
  badge?: string;
  features: PlanFeature[];
  cta: string;
}[] = [
  {
    name: "Essential care",
    price: "990",
    variant: "default",
    features: [
      { text: "2 hygiene visits / year", included: true },
      { text: "2 dentist exams + X-rays", included: true },
      { text: "15% off basic treatment", included: true },
      { text: "Emergency exam included", included: false },
    ],
    cta: "Start essential",
  },
  {
    name: "Complete smile",
    price: "1490",
    variant: "featured",
    badge: "Best value",
    features: [
      { text: "Everything in Essential", included: true },
      { text: "1 emergency exam / year", included: true },
      { text: "Priority booking windows", included: true },
      { text: "20% off whitening", included: true },
      { text: "Cosmetic consult credit", included: true },
    ],
    cta: "Choose complete",
  },
  {
    name: "Total care+",
    price: "2190",
    variant: "pro",
    features: [
      { text: "Everything in Complete", included: true },
      { text: "3 hygiene visits / year", included: true },
      { text: "1 small filling / year*", included: true },
      { text: "Dedicated care coordinator", included: true },
    ],
    cta: "Go all-in",
  },
];

export const reviews: {
  name: string;
  tenure: string;
  imageSrc: string;
  quote: string;
  rating: number;
}[] = [
  {
    name: "Sabbir Hossain",
    tenure: "Patient since 2023",
    imageSrc: hero.patientAvatars[2],
    rating: 5,
    quote:
      "I avoided dentists for years. They didn’t judge—they numbed me properly, paused when I needed a break, and the bill matched what they quoted. Huge relief.",
  },
  {
    name: "Ayesha Khan",
    tenure: "Invisalign patient",
    imageSrc: hero.patientAvatars[1],
    rating: 5,
    quote:
      "Everything is digital and easy to follow. I got a timeline, reminders on WhatsApp, and my smile still looks like me—just straighter.",
  },
  {
    name: "Imran Mahmud",
    tenure: "Implant & crown",
    imageSrc: hero.patientAvatars[0],
    rating: 5,
    quote:
      "Professional from the first call. The implant process was explained step by step, and the follow-up calls after surgery were a nice touch.",
  },
  {
    name: "Rupa Das",
    tenure: "Family of four",
    imageSrc: hero.patientAvatars[0],
    rating: 5,
    quote:
      "Kids actually ask when we’re going back. The evening hours saved us—no missing school or work for cleanings.",
  },
];

export const galleryImages: { src: string; alt: string }[] = [
  {
    src: u("photo-1606811841689-23dfddce3e95"),
    alt: "Spacious treatment room with modern dental chair and lighting",
  },
  {
    src: u("photo-1629909613654-28e377c37b09"),
    alt: "Hygienist preparing instruments with patient comfort in mind",
  },
  {
    src: u("photo-1598256989800-fe5f95da9787"),
    alt: "Dental chair and sterile clinical workspace in a modern office",
  },
  {
    src: u("photo-1612349316228-5942a9b489c2"),
    alt: "Clinician reviewing care with a patient in a bright exam room",
  },
  {
    src: u("photo-1576091160550-2173dba999ef"),
    alt: "Bright, minimal reception and waiting area",
  },
  {
    src: u("photo-1579684385127-1ef15d508118"),
    alt: "Close-up of healthy smile after preventive care",
  },
  {
    src: u("photo-1490645935967-10de6ba17061"),
    alt: "Reception desk with friendly staff welcoming patients",
  },
  {
    src: u("photo-1631217868264-e5b90bb7e133"),
    alt: "Close-up of dental imaging and treatment planning at the chairside",
  },
  {
    src: u("photo-1538108149393-fbbd81895907"),
    alt: "Hospital and clinical interior—clean corridors and modern medical facility",
  },
  {
    src: u("photo-1551601651-2a8555f1a136"),
    alt: "Patient smiling confidently after cosmetic treatment",
  },
];

export const galleryMosaicCount = 6;

export const contact = {
  address: "House: 1/B, Road: 14, Nikunja:2, Dhaka 1229",
  phone: "+8801797764296",
  email: "rojon038@gmail.com",
  googleMapsUrl: "https://maps.app.goo.gl/zw8ibF4MLJuao4qm6",
  whatsappPrefillMessage: `Hi ${site.practiceName} — I’d like to book a free consult (or discuss pain/anxiety). Please share your next available slot. Thanks!`,
  emailSubject: "Appointment / consult request — Radiant Smile Dental",
  emailBody: `Hi,

I'd like to schedule a visit or free consultation. Please confirm availability and anything I should bring.

Thank you!`,
  clinicImageSrc: u("photo-1576091160399-112ba8d25d1d"),
  clinicImageAlt: "Welcoming reception area at Radiant Smile Dental in Dhaka",
};
