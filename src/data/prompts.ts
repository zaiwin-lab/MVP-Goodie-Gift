/* ==========================================================================
   The six sample prompts.

   These are the most important teaching device on the site: they show — never
   instruct — that a good brief mentions what, when, where, who, how many,
   how much and what feeling.
   ========================================================================== */

export interface SamplePrompt {
  id: string;
  label: string;
  icon: string;
  accent: string;
  prompt: string;
}

export const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    id: "government",
    label: "Government Programme",
    icon: "building",
    accent: "#2C5AA0",
    prompt:
      "We have a government digitalisation programme in Kuching on 20 September for around 500 participants, mostly youth. Budget around RM20–RM30 per person. What should we give them?",
  },
  {
    id: "corporate",
    label: "Corporate Event",
    icon: "briefcase",
    accent: "#7A3E9D",
    prompt:
      "Our company is having an appreciation dinner for 200 staff. We want something useful and modern — not the usual mug or pen. Budget below RM50 each.",
  },
  {
    id: "conference",
    label: "Conference",
    icon: "mic",
    accent: "#B4581F",
    prompt:
      "We are organising a two-day international conference in Sarawak for 300 delegates from Malaysia and overseas. Suggest something that represents Sarawak but is easy for visitors to bring home.",
  },
  {
    id: "community",
    label: "Community Event",
    icon: "users",
    accent: "#1F7A5C",
    prompt:
      "We expect around 1,000 participants at our community programme. We need something below RM10 per person but useful enough that people won't throw it away.",
  },
  {
    id: "vip",
    label: "VIP / Premium",
    icon: "star",
    accent: "#96702A",
    prompt:
      "We have 50 VIP guests attending an official launching ceremony. We need a premium gift around RM150–RM250 that feels exclusive and carries a Sarawak identity.",
  },
  {
    id: "esg",
    label: "Sustainability / ESG",
    icon: "leaf",
    accent: "#2F7A2F",
    prompt:
      "We are organising an environmental programme for 400 participants. We want sustainable goodies with minimal plastic and preferably products supporting local communities.",
  },
];

/** Rotating placeholder lines in the hero input. */
export const PLACEHOLDER_PROMPTS = [
  "We're organising a conference for 300 delegates…",
  "We have RM20 per participant for 500 students…",
  "We need something special for 50 VIP guests…",
  "Our environmental programme needs sustainable goodies…",
  "1,000 people at a community day, under RM10 each…",
  "Appreciation dinner for 200 staff — not another mug…",
];

/** Fuel for the Surprise Me button. */
export const SURPRISE_SCENARIOS = [
  "Imagine you're organising a 300-person AI conference in Kuching for developers and policy makers, with RM40 per delegate.",
  "Imagine a state-level tree planting day with 800 participants, mostly school children and their parents, at RM12 each.",
  "Imagine an official launching ceremony with 60 VIP guests, including two ministers, and a gift budget of RM200 each.",
  "Imagine a two-day rural entrepreneurship bootcamp for 120 women running home businesses, RM35 per person.",
  "Imagine a Gawai open house for 500 staff and their families, with a warm local gift at RM25 each.",
  "Imagine an international trade delegation of 40 visitors who each have 8kg of luggage space left.",
  "Imagine a campus fun run with 1,200 student runners and a RM18 per person finisher pack.",
  "Imagine a hospital appreciation night for 250 frontline staff, RM60 each, something genuinely restful.",
];

export const TRENDING = [
  {
    id: "t1",
    kicker: "Most requested this month",
    title: "Insulated bottles with laser engraving",
    note: "Driven by single-use plastic policies at government venues.",
    delta: "+38%",
    packageId: "hydration-hero",
  },
  {
    id: "t2",
    kicker: "Popular for government programmes",
    title: "Digital Explorer Kit",
    note: "Youth digitalisation programmes across Sarawak keep landing here.",
    delta: "+24%",
    packageId: "digital-explorer",
  },
  {
    id: "t3",
    kicker: "Trending below RM20",
    title: "The RM10 Smart Goodie",
    note: "Organisers moving away from four cheap items to one kept item.",
    delta: "+31%",
    packageId: "rm10-smart",
  },
  {
    id: "t4",
    kicker: "Popular with conference organisers",
    title: "Sarawak Traveller Kit",
    note: "Requested whenever more than a third of delegates fly in.",
    delta: "+19%",
    packageId: "sarawak-traveller",
  },
  {
    id: "t5",
    kicker: "Popular Sarawak-inspired gifts",
    title: "Artisan First Collection",
    note: "CSR budgets increasingly routed to longhouse craft collectives.",
    delta: "+27%",
    packageId: "artisan-first",
  },
  {
    id: "t6",
    kicker: "Rising with corporate teams",
    title: "“Please, Not Another Mug” Pack",
    note: "Younger workforces reacting badly to default corporate merchandise.",
    delta: "+42%",
    packageId: "not-another-mug",
  },
];

export const SEASONAL = [
  {
    id: "s1",
    season: "June",
    title: "Gawai Dayak",
    blurb: "Open houses, staff hampers and community appreciation across Sarawak.",
    packageId: "festive-sarawak",
    from: "#6E1414",
    to: "#E8934A",
  },
  {
    id: "s2",
    season: "July",
    title: "Sarawak Day",
    blurb: "State programmes, identity-led gifting and local-maker sourcing.",
    packageId: "artisan-first",
    from: "#1F4225",
    to: "#79B24E",
  },
  {
    id: "s3",
    season: "August – September",
    title: "Malaysia Day & National Month",
    blurb: "Large public programmes with high participant counts and tight budgets.",
    packageId: "rm10-smart",
    from: "#0E3F6B",
    to: "#4FA3F7",
  },
  {
    id: "s4",
    season: "September – October",
    title: "Conference season",
    blurb: "Delegate kits, speaker gifts and multi-day programme essentials.",
    packageId: "delegate-essentials",
    from: "#23303C",
    to: "#7C93A8",
  },
  {
    id: "s5",
    season: "November – December",
    title: "Christmas & year-end dinners",
    blurb: "Appreciation gifting, long-service awards and client hampers.",
    packageId: "appreciation-set",
    from: "#6B1730",
    to: "#E0708C",
  },
  {
    id: "s6",
    season: "January – February",
    title: "Chinese New Year",
    blurb: "Client gifting, open houses and edible-led local hampers.",
    packageId: "festive-sarawak",
    from: "#8A1E1E",
    to: "#F0B04A",
  },
  {
    id: "s7",
    season: "March – April",
    title: "Ramadan & Raya",
    blurb: "Iftar programmes, staff appreciation and community distribution.",
    packageId: "community-care",
    from: "#2B2360",
    to: "#8E86D8",
  },
  {
    id: "s8",
    season: "Year-round",
    title: "Graduation & convocation",
    blurb: "Campus programmes, keepsakes and cohort-sized quantities.",
    packageId: "young-digital",
    from: "#242AA8",
    to: "#7C86FF",
  },
];

/** Clearly-labelled sample figures for the prototype trust section. */
export const TRUST_STATS = [
  { value: "1,480+", label: "Goodie concepts generated" },
  { value: "260+", label: "Quotations prepared" },
  { value: "94,000+", label: "Items delivered" },
  { value: "38", label: "Local makers in the network" },
];
