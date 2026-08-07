import type { BudgetId } from "../types";

/* ==========================================================================
   Static page content — copy lives here so the components stay about layout.
   ========================================================================== */

export const NAV_LINKS = [
  { href: "#ideas", label: "Ideas" },
  { href: "#how", label: "How It Works" },
  { href: "#smart", label: "Smart Technology" },
  { href: "#organisations", label: "For Organisations" },
];

export const TRUST_LINE = [
  "Government",
  "Corporate",
  "Conference",
  "Community",
  "VIP",
  "Training",
  "Events",
];

export const BUDGETS: { id: BudgetId; label: string }[] = [
  { id: "u10", label: "Under RM10" },
  { id: "10-20", label: "RM10–RM20" },
  { id: "20-50", label: "RM20–RM50" },
  { id: "50-100", label: "RM50–RM100" },
  { id: "100+", label: "RM100+" },
  { id: "unsure", label: "Not sure" },
];

export const BUDGET_RANGE: Record<BudgetId, [number, number]> = {
  u10: [0, 10],
  "10-20": [10, 20],
  "20-50": [20, 50],
  "50-100": [50, 100],
  "100+": [100, 400],
  unsure: [0, 400],
};

export const PAX_OPTIONS = ["Under 50", "50–200", "200–500", "500–1,000", "1,000+"];

export const WHEN_OPTIONS = [
  "This month",
  "Next month",
  "In 2–3 months",
  "Later this year",
  "Not fixed yet",
];

export const WHERE_OPTIONS = ["Kuching", "Miri", "Sibu", "Bintulu", "Elsewhere in Sarawak", "Outside Sarawak"];

/** Rotating copy during the short processing moment. */
export const THINKING_LINES = [
  "Understanding your event…",
  "Matching your audience…",
  "Exploring suitable goodies…",
  "Working around your budget…",
  "Adding some creativity…",
];

export const HOW_STEPS = [
  {
    n: "01",
    title: "Explore the ideas",
    body: "Browse six ideas at a time. Press for six more as often as you like. No sign-up, no forms.",
  },
  {
    n: "02",
    title: "Find something interesting",
    body: "Open any idea to see what goes inside it, who it suits and roughly what it costs.",
  },
  {
    n: "03",
    title: "Tell us about your event",
    body: "A few quick questions — event, size, budget, date, place. It takes under a minute.",
  },
  {
    n: "04",
    title: "Get your free quotation",
    body: "Our team checks sourcing, customisation and real pricing, then sends you a proper quotation.",
  },
];

/** Bento grid. `span` drives the layout emphasis. */
export const SMART_FEATURES: { title: string; body: string; span?: "wide" | "tall" }[] = [
  {
    title: "Smart Event Matching",
    body: "Reads the kind of programme you're running and shortlists what fits it.",
    span: "wide",
  },
  { title: "Audience Intelligence", body: "Youth, VIPs and communities want very different things." },
  { title: "Budget Matching", body: "Works within your number instead of around it." },
  { title: "Quantity Awareness", body: "What works for 50 rarely works for 5,000." },
  {
    title: "Creative Combination",
    body: "Builds packs from thousands of possible item pairings.",
    span: "tall",
  },
  { title: "Sarawak Touch", body: "Adds local makers and materials when you want them." },
  { title: "ESG Suggestions", body: "Low plastic, recycled and community-sourced options." },
  { title: "VIP Mode", body: "Shifts spend into presentation where it counts." },
  { title: "Value Optimisation", body: "Optimises for what gets kept, not what costs least." },
  { title: "Customisation Ideas", body: "Print, engraving, packaging and personalisation." },
  { title: "Alternative Suggestions", body: "Always offers a second and third direction." },
  { title: "Multiple Budget Levels", body: "The same idea, built three ways." },
  { title: "Event-Type Intelligence", body: "Conferences, launches and family days differ." },
  { title: "Trend Discovery", body: "Notices what organisers are asking for lately." },
  {
    title: "Human Verification",
    body: "Every idea is checked by a real person before it becomes a quotation.",
    span: "wide",
  },
];

export const USE_CASES = [
  "Government Programmes",
  "Corporate Events",
  "Conferences",
  "Community Programmes",
  "Training",
  "Universities",
  "Festivals",
  "VIP Functions",
  "CSR",
  "ESG",
  "Product Launches",
  "Awards",
];

export const ORGANISATIONS = [
  {
    name: "Government Agencies",
    body: "Programme launches and participant kits, with quotations formatted for procurement.",
  },
  {
    name: "Corporations",
    body: "Annual dinners, staff appreciation and client gifting that doesn't end up in a drawer.",
  },
  {
    name: "Event Organisers",
    body: "Multiple events, tight timelines, one partner who already knows your format.",
  },
  {
    name: "Universities",
    body: "Orientation packs, competitions and convocation gifts priced for large cohorts.",
  },
  {
    name: "Associations & NGOs",
    body: "Member appreciation and community programmes where every ringgit is accounted for.",
  },
  {
    name: "SMEs",
    body: "Small quantities, no minimum-order panic, and ideas that punch above the budget.",
  },
];

/** Free-quotation reminders, placed between sections. */
export const QUOTE_NUDGES = [
  { q: "Found something interesting?", a: "We'll quote it for FREE." },
  { q: "Already know what you want?", a: "Send us your requirement." },
  { q: "Don't know what you want?", a: "Explore first. We'll help." },
  { q: "Have a budget?", a: "Tell us. We'll find the possibilities." },
];
