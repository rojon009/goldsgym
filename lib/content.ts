export const navLinks = [
  { href: "#facilities", label: "Facilities" },
  { href: "#schedule", label: "Schedule" },
  { href: "#professionals", label: "Team" },
  { href: "#membership", label: "Membership" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const hero = {
  memberAvatars: [
    u("photo-1560250097-0b93528c311a"),
    u("photo-1573496359142-b8d87734a5a2"),
    u("photo-1472099645785-5658abf4ff4e"),
  ],
};

export type FacilityIconKey = "dumbbell" | "userRound" | "users" | "bath";

export const facilities: {
  title: string;
  icon: FacilityIconKey;
  imageSrc: string;
  description: string;
}[] = [
  {
    title: "Elite Equipment",
    icon: "dumbbell",
    imageSrc: u("photo-1534438327276-14e5300c3a48"),
    description: "Custom-engineered machines and Olympic-grade free weights.",
  },
  {
    title: "Exclusive Slots",
    icon: "userRound",
    imageSrc: u("photo-1599058917212-d750089bc07e"),
    description:
      "Private women-only hours for a focused, comfortable training environment.",
  },
  {
    title: "Expert Coaches",
    icon: "users",
    imageSrc: u("photo-1517836357463-d25dfeac3438"),
    description:
      "Masters of their craft ready to guide your transformation journey.",
  },
  {
    title: "Luxury Recovery",
    icon: "bath",
    imageSrc: u("photo-1770573322077-ecce9b2807b9"),
    description:
      "Premium steam baths and saunas for post-workout muscle restoration.",
  },
];

export type ScheduleSlotType = "combined" | "womenOnly";

export type ScheduleSlot = {
  timeLabel: string;
  type: ScheduleSlotType;
  /** Short line for card (trainers, etc.) */
  detail: string;
};

/** Saturday through Thursday */
export const scheduleWeekday: {
  title: string;
  subtitle: string;
  slots: ScheduleSlot[];
} = {
  title: "Saturday – Thursday",
  subtitle:
    "Mixed floor access with coaches on shift. Women-only block mid-afternoon.",
  slots: [
    {
      timeLabel: "7:00 AM – 2:00 PM",
      type: "combined",
      detail: "Combined hours — men & women · Trainer available",
    },
    {
      timeLabel: "2:00 PM – 5:00 PM",
      type: "womenOnly",
      detail: "Women only · Trainer available",
    },
    {
      timeLabel: "5:00 PM – 11:00 PM",
      type: "combined",
      detail: "Combined hours — men & women · Trainer available",
    },
  ],
};

export const scheduleFriday: {
  title: string;
  subtitle: string;
  slots: ScheduleSlot[];
} = {
  title: "Friday",
  subtitle: "Evening combined sessions only — full coaching support.",
  slots: [
    {
      timeLabel: "5:00 PM – 11:00 PM",
      type: "combined",
      detail: "Combined hours only · Trainer available",
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
    name: "Marcus Cole",
    designation: "Head of Performance",
    experience:
      "15+ years coaching competitive lifters and field athletes; former national-level strength consultant.",
    expertise: [
      "Powerlifting & barbell",
      "Long-term periodization",
      "Athletic preparation",
    ],
    imageSrc: facilities[2].imageSrc,
    imageAlt: "Marcus Cole, Head of Performance at Gold's GYM",
  },
  {
    name: "Nina Okoro",
    designation: "Women’s Program Lead",
    experience:
      "8+ years focused on high-intensity training, confidence on the floor, and sustainable body composition.",
    expertise: [
      "HIIT & conditioning",
      "Pre/postnatal training",
      "Small-group coaching",
    ],
    imageSrc: hero.memberAvatars[1],
    imageAlt: "Nina Okoro, Women’s Program Lead at Gold's GYM",
  },
  {
    name: "David Reyes",
    designation: "Senior Strength Coach",
    experience:
      "10+ years in Olympic lifting progressions and return-to-play strength for weekend warriors and desk athletes alike.",
    expertise: ["Olympic lifting", "Mobility stacks", "Injury-aware loading"],
    imageSrc: hero.memberAvatars[2],
    imageAlt: "David Reyes, Senior Strength Coach at Gold's GYM",
  },
  {
    name: "Aisha Khan",
    designation: "Recovery & Mobility Specialist",
    experience:
      "7+ years blending soft-tissue work patterns, breath, and loaded mobility for faster bounce-back between sessions.",
    expertise: [
      "Mobility flows",
      "Post-session recovery",
      "Breath & core integration",
    ],
    imageSrc: hero.memberAvatars[0],
    imageAlt: "Aisha Khan, Recovery & Mobility Specialist at Gold's GYM",
  },
  {
    name: "James Whitaker",
    designation: "Group Training Director",
    experience:
      "11+ years running large floor classes—energy high, standards higher, every rep accountable.",
    expertise: ["Metabolic conditioning", "Team training", "Rowing & bike erg"],
    imageSrc: facilities[0].imageSrc,
    imageAlt: "James Whitaker, Group Training Director at Gold's GYM",
  },
];

export type HeroBadgeIcon = "zap" | "dumbbell" | "userRound" | "users" | "bath";

export type HeroSlide = {
  src: string;
  alt: string;
  badge: string;
  badgeIcon: HeroBadgeIcon;
  /** First line of the headline (upper line) */
  line1: string;
  /** Accent word on the second line */
  highlight: string;
  /** Text after the highlight on the second line (leading space if needed) */
  line2Suffix: string;
  description: string;
  ctaLabel: string;
  /** In-page section id (hash link), e.g. #membership */
  ctaHref: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: u("photo-1571902943202-507ec2618e8f"),
    alt: "Determined athlete training at Gold's GYM",
    badgeIcon: "zap",
    badge: "Premium Fitness Experience",
    line1: "Forge your",
    highlight: "Finest",
    line2Suffix: " self",
    description:
      "Expert coaching and premium facilities tailored for those who demand more. Experience exclusive spaces and elite gear.",
    ctaLabel: "Join the Elite",
    ctaHref: "#membership",
  },
  {
    src: facilities[0].imageSrc,
    alt: `${facilities[0].title} — Gold's GYM`,
    badgeIcon: "dumbbell",
    badge: "Elite equipment floor",
    line1: "Built for",
    highlight: "serious",
    line2Suffix: " training",
    description: facilities[0].description,
    ctaLabel: "Explore the floor",
    ctaHref: "#gallery",
  },
  {
    src: facilities[1].imageSrc,
    alt: `${facilities[1].title} — Gold's GYM`,
    badgeIcon: "userRound",
    badge: "Dedicated training windows",
    line1: "Focus in",
    highlight: "your",
    line2Suffix: " space",
    description: facilities[1].description,
    ctaLabel: "See schedules",
    ctaHref: "#schedule",
  },
  {
    src: facilities[2].imageSrc,
    alt: `${facilities[2].title} — Gold's GYM`,
    badgeIcon: "users",
    badge: "Expert-led progression",
    line1: "Coached to",
    highlight: "break",
    line2Suffix: " through",
    description: facilities[2].description,
    ctaLabel: "Meet the coaches",
    ctaHref: "#professionals",
  },
  {
    src: facilities[3].imageSrc,
    alt: `${facilities[3].title} — Gold's GYM`,
    badgeIcon: "bath",
    badge: "Recovery that restores",
    line1: "Train hard,",
    highlight: "recover",
    line2Suffix: " smarter",
    description: facilities[3].description,
    ctaLabel: "Discover recovery",
    ctaHref: "#facilities",
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
    name: "Base Pack",
    price: "1300",
    variant: "default",
    features: [
      { text: "24/7 Gym Access", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Standard Equipment", included: true },
      { text: "Personal Training", included: false },
    ],
    cta: "Select Plan",
  },
  {
    name: "Elite Pack",
    price: "1600",
    variant: "featured",
    badge: "Most Popular",
    features: [
      { text: "Everything in Base", included: true },
      { text: "2 Guest Passes / Mo", included: true },
      { text: "Steam Bath & Sauna", included: true },
      { text: "Women-Only Slots", included: true },
      { text: "Group Classes", included: true },
    ],
    cta: "Go Elite",
  },
  {
    name: "Pro Pack",
    price: "2000",
    variant: "pro",
    features: [
      { text: "Everything in Elite", included: true },
      { text: "1-on-1 Personal Trainer", included: true },
      { text: "Nutritional Planning", included: true },
      { text: "Premium Laundry Service", included: true },
    ],
    cta: "Select Plan",
  },
];

export const reviews: {
  name: string;
  tenure: string;
  imageSrc: string;
  quote: string;
  /** 1–5 stars */
  rating: number;
}[] = [
  {
    name: "Marcus Thorne",
    tenure: "Member for 2 years",
    imageSrc: hero.memberAvatars[0],
    rating: 5,
    quote:
      "The atmosphere here is unmatched. It's not just a gym; it's a high-performance lab. The equipment is always pristine and the trainers actually care about your form.",
  },
  {
    name: "Elena Rodriguez",
    tenure: "Member for 1 year",
    imageSrc: hero.memberAvatars[1],
    rating: 5,
    quote:
      "The women-only slots changed the game for me. I feel so empowered and focused during my sessions. Plus, the steam bath is the ultimate post-leg day reward.",
  },
  {
    name: "Jason Carter",
    tenure: "Member for 6 months",
    imageSrc: hero.memberAvatars[2],
    rating: 4,
    quote:
      "I've trained in gyms all over the world, but Forge has a unique vibe. It's edgy, intense, and clean. The Pro membership with personal coaching is worth every penny.",
  },
  {
    name: "Sarah Vane",
    tenure: "Member for 3 years",
    imageSrc: hero.memberAvatars[0],
    rating: 5,
    quote:
      "From the custom machines to the expert advice, Forge is simply the best in the city. The community here pushes you to be your absolute best self.",
  },
];

export const galleryImages: { src: string; alt: string }[] = [
  {
    src: u("photo-1571902943202-507ec2618e8f"),
    alt: "Bright gym floor with members using strength equipment",
  },
  {
    src: u("photo-1517836357463-d25dfeac3438"),
    alt: "Coach guiding athletes through a barbell session",
  },
  {
    src: u("photo-1518611012118-696072aa579a"),
    alt: "High-energy indoor cycling class in session",
  },
  {
    src: u("photo-1540497077202-7c8a3999166f"),
    alt: "Group workout class stretching and warming up together",
  },
  {
    src: u("photo-1534438327276-14e5300c3a48"),
    alt: "Open training area with cardio machines and free weights",
  },
  {
    src: u("photo-1517963879433-6ad2b056d712"),
    alt: "Athletes training with kettlebells and functional gear",
  },
  {
    src: u("photo-1517438476312-10d79c077509"),
    alt: "Weight room with racks and mirrors at golden hour",
  },
  {
    src: u("photo-1552196563-55cd4e45efb3"),
    alt: "Small group strength circuit on the gym floor",
  },
  {
    src: u("photo-1434596922112-19c563067271"),
    alt: "Boxing bags and functional training zone",
  },
  {
    src: u("photo-1483721310020-03333e577078"),
    alt: "Close-up of dumbbells ready for the next set",
  },
];

/** Number of tiles shown in the landing mosaic before “view all” in lightbox */
export const galleryMosaicCount = 6;

export const contact = {
  address: "House: 1/B, Road: 14, Nikunja:2, Dhaka 1229",
  phone: "+8801797764296",
  email: "rojon038@gmail.com",
  /** Opens in Maps when users tap the address row */
  googleMapsUrl: "https://maps.app.goo.gl/zw8ibF4MLJuao4qm6",
  /** Prefills the WhatsApp chat when users tap the phone row */
  whatsappPrefillMessage:
    "Hi! \nI'd like more information about your membership plans—pricing, tiers, and what's included. \nThanks!",
  /** Prefill when users tap the email row (mailto subject & body) */
  emailSubject: "Membership plans — information request",
  emailBody: `Hi,

I'd like more information about your membership plans (pricing, tiers, and what's included).

Thanks!`,
  gymImageSrc: u("photo-1518611012118-696072aa579a"),
  gymImageAlt:
    "Members working out together in a lively group session at Gold's GYM",
};
