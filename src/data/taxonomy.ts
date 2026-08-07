import type { BudgetBand, EventCategory, Refinement } from "../types";

export const BUDGET_BANDS: BudgetBand[] = [
  { id: "under10", label: "Below RM10", short: "< RM10", min: 0, max: 10 },
  { id: "10to30", label: "RM10 – RM30", short: "RM10–30", min: 10, max: 30 },
  { id: "30to50", label: "RM30 – RM50", short: "RM30–50", min: 30, max: 50 },
  { id: "50to100", label: "RM50 – RM100", short: "RM50–100", min: 50, max: 100 },
  { id: "premium", label: "Above RM100", short: "RM100+", min: 100, max: 400 },
];

export function bandFor(value: number): BudgetBand {
  return BUDGET_BANDS.find((b) => value >= b.min && value < b.max) ?? BUDGET_BANDS[4];
}

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "government",
    label: "Government programme",
    blurb: "Public programmes, launches, agency events and state-level initiatives.",
    icon: "building",
  },
  {
    id: "corporate",
    label: "Corporate event",
    blurb: "Annual dinners, staff appreciation, town halls and client gifting.",
    icon: "briefcase",
  },
  {
    id: "conference",
    label: "Conference",
    blurb: "Multi-day summits, delegate kits and speaker gifting.",
    icon: "mic",
  },
  {
    id: "community",
    label: "Community programme",
    blurb: "Outreach, kampung programmes and large-participation events.",
    icon: "users",
  },
  {
    id: "vip",
    label: "VIP & ceremonial",
    blurb: "Launching ceremonies, guests of honour and official appreciation.",
    icon: "star",
  },
  {
    id: "esg",
    label: "ESG & sustainability",
    blurb: "Environmental campaigns, CSR days and sustainability reporting.",
    icon: "leaf",
  },
  {
    id: "university",
    label: "University & campus",
    blurb: "Orientation, student programmes, competitions and convocation.",
    icon: "cap",
  },
  {
    id: "training",
    label: "Training & workshop",
    blurb: "Courses, bootcamps, incubators and capacity-building sessions.",
    icon: "book",
  },
  {
    id: "festival",
    label: "Festival & seasonal",
    blurb: "Gawai, Raya, Christmas, Chinese New Year and open houses.",
    icon: "sparkle",
  },
  {
    id: "sports",
    label: "Sports event",
    blurb: "Fun runs, tournaments, campus games and corporate sports days.",
    icon: "flag",
  },
  {
    id: "tourism",
    label: "Tourism & delegation",
    blurb: "Inbound visits, trade missions and destination promotion.",
    icon: "globe",
  },
  {
    id: "family",
    label: "Family day",
    blurb: "Family days, children's programmes and community carnivals.",
    icon: "heart",
  },
];

/** Filter chips on the idea wall. Order is deliberate: budget, then theme. */
export const IDEA_FILTERS: { id: string; label: string; group: "budget" | "theme" }[] = [
  { id: "under10", label: "Under RM10", group: "budget" },
  { id: "10to30", label: "RM10–RM30", group: "budget" },
  { id: "30to50", label: "RM30–RM50", group: "budget" },
  { id: "premium", label: "Premium", group: "budget" },
  { id: "vip", label: "VIP", group: "theme" },
  { id: "sarawak", label: "Sarawak", group: "theme" },
  { id: "eco", label: "Eco", group: "theme" },
  { id: "tech", label: "Technology", group: "theme" },
  { id: "youth", label: "Youth", group: "theme" },
  { id: "corporate", label: "Corporate", group: "theme" },
  { id: "government", label: "Government", group: "theme" },
  { id: "conference", label: "Conference", group: "theme" },
  { id: "family", label: "Family", group: "theme" },
  { id: "children", label: "Children", group: "theme" },
  { id: "sports", label: "Sports", group: "theme" },
  { id: "festival", label: "Festivals", group: "theme" },
  { id: "education", label: "Education", group: "theme" },
  { id: "tourism", label: "Tourism", group: "theme" },
  { id: "women", label: "Women", group: "theme" },
  { id: "entrepreneurship", label: "Entrepreneurship", group: "theme" },
];

export const REFINEMENTS: Refinement[] = [
  {
    id: "more",
    label: "Give me 3 more ideas",
    emoji: "🔄",
    reply: "Sure — here are three directions you haven't seen yet.",
  },
  {
    id: "premium",
    label: "Make it more premium",
    emoji: "💎",
    reply: "Taking it up a level. Better materials, better packaging, fewer items.",
  },
  {
    id: "cheaper",
    label: "Lower my budget",
    emoji: "💰",
    reply: "Bringing the cost down while keeping the part people actually keep.",
  },
  {
    id: "esg",
    label: "Make it ESG-friendly",
    emoji: "🌿",
    reply: "Reweighted for low plastic, recycled materials and community sourcing.",
  },
  {
    id: "sarawak",
    label: "Make it more Sarawak",
    emoji: "🦅",
    reply: "Leaning into local makers, local materials and local design.",
  },
  {
    id: "creative",
    label: "Make it more creative",
    emoji: "🎨",
    reply: "Pushing towards things people will photograph and talk about.",
  },
  {
    id: "unexpected",
    label: "Give me something unexpected",
    emoji: "🔥",
    reply: "Alright — this is the one nobody in the room will have suggested.",
  },
];

/** Staged "thinking" copy. Perceived intelligence beats a spinner. */
export const THINKING_STAGES = [
  "Understanding your event…",
  "Thinking about your audience…",
  "Checking your budget…",
  "Exploring useful ideas…",
  "Adding a little creativity…",
  "Building your recommendations…",
];

export const ORGANISATIONS = [
  {
    name: "Government Agencies",
    icon: "building",
    blurb:
      "Programme launches, public campaigns and participant kits — with quotations formatted for procurement.",
  },
  {
    name: "Corporations",
    icon: "briefcase",
    blurb: "Annual dinners, staff appreciation and client gifting that doesn't end up in a drawer.",
  },
  {
    name: "Event Organisers",
    icon: "mic",
    blurb: "Multiple events, tight timelines, one sourcing partner who already knows your format.",
  },
  {
    name: "Universities",
    icon: "cap",
    blurb: "Orientation packs, competitions and convocation gifts priced for large cohorts.",
  },
  {
    name: "Associations",
    icon: "users",
    blurb: "Member appreciation, AGM kits and conference merchandise with predictable unit costs.",
  },
  {
    name: "NGOs",
    icon: "leaf",
    blurb: "Community programmes and awareness campaigns where every ringgit is accounted for.",
  },
  {
    name: "SMEs",
    icon: "star",
    blurb: "Small quantities, no minimum-order panic, and ideas that punch above the budget.",
  },
  {
    name: "Community Organisations",
    icon: "heart",
    blurb: "Family days, kampung programmes and festivals with high-participation logistics.",
  },
];
