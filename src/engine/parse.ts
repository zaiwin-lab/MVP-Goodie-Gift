import type { AudienceId, EventBrief, EventTypeId, MissingField, PreferenceId } from "../types";
import { bandFor } from "../data/taxonomy";

/* ==========================================================================
   Brief understanding.

   A deterministic natural-language reader: it pulls quantity, budget, event
   type, audience, place and intent out of ordinary sentences. When a real LLM
   is wired up it produces the same EventBrief shape, so nothing downstream
   changes.
   ========================================================================== */

const EVENT_KEYWORDS: Record<EventTypeId, string[]> = {
  government: [
    "government",
    "kerajaan",
    "ministry",
    "agency",
    "state",
    "public sector",
    "official",
    "civil service",
    "glc",
    "digitalisation programme",
  ],
  corporate: [
    "company",
    "corporate",
    "staff",
    "employee",
    "annual dinner",
    "appreciation dinner",
    "town hall",
    "client",
    "team building",
    "office",
  ],
  conference: [
    "conference",
    "summit",
    "symposium",
    "convention",
    "delegate",
    "forum",
    "congress",
    "seminar",
    "expo",
  ],
  community: [
    "community",
    "kampung",
    "outreach",
    "public programme",
    "residents",
    "carnival",
    "gotong",
    "welfare",
    "charity",
  ],
  vip: [
    "vip",
    "launching",
    "ceremony",
    "guest of honour",
    "minister",
    "dignitary",
    "yb",
    "datuk",
    "premier",
    "ribbon",
  ],
  esg: [
    "esg",
    "sustainab",
    "environment",
    "green",
    "recycl",
    "csr",
    "carbon",
    "climate",
    "tree planting",
    "eco",
  ],
  university: [
    "university",
    "universiti",
    "campus",
    "student",
    "undergraduate",
    "orientation",
    "convocation",
    "college",
    "school",
    "faculty",
  ],
  training: [
    "training",
    "workshop",
    "bootcamp",
    "course",
    "capacity building",
    "incubator",
    "masterclass",
    "upskilling",
  ],
  festival: [
    "gawai",
    "raya",
    "christmas",
    "chinese new year",
    "cny",
    "deepavali",
    "festival",
    "open house",
    "ramadan",
    "hari",
  ],
  sports: ["sports", "fun run", "marathon", "tournament", "games", "futsal", "cycling", "athlete"],
  tourism: ["tourism", "delegation", "trade mission", "visitors", "inbound", "familiarisation", "tour"],
  family: ["family day", "children", "kids", "parents", "family", "carnival", "playground"],
};

const AUDIENCE_KEYWORDS: Record<AudienceId, string[]> = {
  youth: ["youth", "young", "belia", "teen", "gen z"],
  students: ["student", "undergraduate", "pelajar", "campus", "school", "pupil"],
  corporate: ["staff", "employee", "colleague", "team", "workforce", "corporate"],
  // "government" alone describes the *event*, not who receives the gift, so it
  // is deliberately absent here — otherwise every public programme reads as an
  // audience of civil servants rather than the participants who show up.
  government: ["officer", "civil servant", "public servant", "penjawat awam"],
  vip: ["vip", "guest of honour", "minister", "dignitary", "speaker", "panellist", "vvip"],
  international: ["international", "overseas", "foreign", "abroad", "delegate from", "global"],
  community: ["community", "resident", "villager", "kampung", "public", "participant"],
  children: ["children", "kids", "pupil", "primary school", "toddler"],
  women: ["women", "wanita", "mother", "female", "ladies"],
  entrepreneurs: ["entrepreneur", "founder", "startup", "sme", "business owner", "usahawan"],
  academics: ["academic", "lecturer", "researcher", "professor", "scholar"],
  athletes: ["runner", "athlete", "player", "participant runner", "sportsman"],
};

const PREFERENCE_KEYWORDS: Record<PreferenceId, string[]> = {
  esg: [
    "sustainab",
    "eco",
    "green",
    "environment",
    "recycl",
    "plastic",
    "carbon",
    "esg",
    "csr",
    "biodegrad",
  ],
  // Deliberately excludes town names: holding an event *in* Kuching is not the
  // same as asking for a Sarawak-themed gift. Places are read as location only.
  sarawak: [
    "sarawak",
    "local",
    "borneo",
    "cultural",
    "heritage",
    "traditional",
    "dayak",
    "iban",
    "bidayuh",
    "orang ulu",
    "melanau",
    "longhouse",
  ],
  tech: ["tech", "digital", "gadget", "electronic", "device", "online", "ai", "innovation"],
  premium: ["premium", "exclusive", "luxury", "high-end", "prestige", "vip", "special", "elegant"],
  creative: [
    "creative",
    "unique",
    "different",
    "not the usual",
    "not another",
    "unusual",
    "fresh",
    "modern",
    "interesting",
    "memorable",
  ],
  useful: ["useful", "practical", "won't throw", "wont throw", "actually use", "everyday", "functional"],
  unexpected: ["surprise", "unexpected", "wow", "bold", "shock"],
};

const SARAWAK_PLACES = [
  "Kuching",
  "Miri",
  "Sibu",
  "Bintulu",
  "Samarahan",
  "Kota Samarahan",
  "Sri Aman",
  "Kapit",
  "Limbang",
  "Mukah",
  "Betong",
  "Serian",
  "Sarikei",
  "Lawas",
  "Bau",
  "Sarawak",
];

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const PAX_NOUNS =
  "participants?|pax|people|persons?|delegates?|guests?|staff|students?|attendees?|runners?|visitors?|members?|recipients?|children|kids|families";

function toNumber(raw: string): number {
  return Number(raw.replace(/[,\s]/g, ""));
}

/** Strip "RM 20", "RM20-RM30" etc so money never gets mistaken for headcount. */
function withoutMoney(text: string): string {
  return text.replace(/rm\s?\d[\d,]*(?:\.\d+)?/gi, " ");
}

function parsePax(text: string): number | undefined {
  const clean = withoutMoney(text);

  const withNoun = clean.match(new RegExp(`(\\d[\\d,]*)\\s*(?:${PAX_NOUNS})`, "i"));
  if (withNoun) return toNumber(withNoun[1]);

  const approx = clean.match(
    /(?:around|about|approximately|roughly|expect(?:ing)?|estimated|some|nearly|up to|for)\s+(\d[\d,]*)/i,
  );
  if (approx) return toNumber(approx[1]);

  // A bare number of a plausible headcount magnitude.
  const bare = clean.match(/\b(\d{2,6})\b/);
  if (bare) {
    const n = toNumber(bare[1]);
    if (n >= 10 && n <= 200000) return n;
  }
  return undefined;
}

function parseBudget(text: string): number | undefined {
  const range = text.match(
    /rm\s?(\d[\d,]*(?:\.\d+)?)\s*(?:–|—|-|to|until)\s*(?:rm\s?)?(\d[\d,]*(?:\.\d+)?)/i,
  );
  if (range) {
    return (toNumber(range[1]) + toNumber(range[2])) / 2;
  }

  const capped = text.match(
    /(?:below|under|less than|maximum|max|up to|not more than|within)\s*rm\s?(\d[\d,]*(?:\.\d+)?)/i,
  );
  if (capped) {
    // "below RM50" means aim comfortably under the ceiling, not at it.
    return toNumber(capped[1]) * 0.8;
  }

  const perHead = text.match(
    /rm\s?(\d[\d,]*(?:\.\d+)?)\s*(?:per|each|\/|a head|apiece|per head|per person|per pax)/i,
  );
  if (perHead) return toNumber(perHead[1]);

  const any = text.match(/rm\s?(\d[\d,]*(?:\.\d+)?)/i);
  if (any) {
    const n = toNumber(any[1]);
    // Guard against a total budget being read as a per-head budget.
    return n <= 1000 ? n : undefined;
  }
  return undefined;
}

function parseLocation(text: string): string | undefined {
  const place = SARAWAK_PLACES.find((p) => new RegExp(`\\b${p}\\b`, "i").test(text));
  if (place) return place;

  const generic = text.match(/\bin\s+([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)?)/);
  return generic?.[1];
}

function parseDate(text: string): string | undefined {
  const dayMonth = text.match(
    new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTHS.join("|")})\\b`, "i"),
  );
  if (dayMonth) return `${dayMonth[1]} ${capitalise(dayMonth[2])}`;

  const monthDay = text.match(new RegExp(`\\b(${MONTHS.join("|")})\\s+(\\d{1,2})\\b`, "i"));
  if (monthDay) return `${monthDay[2]} ${capitalise(monthDay[1])}`;

  const monthOnly = text.match(new RegExp(`\\b(${MONTHS.join("|")})\\b`, "i"));
  if (monthOnly) return capitalise(monthOnly[1]);

  const relative = text.match(/\b(next month|next week|this month|end of the year|year end)\b/i);
  return relative?.[1];
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function scoreKeywordMap<T extends string>(
  text: string,
  map: Record<T, string[]>,
): { id: T; hits: number }[] {
  return (Object.keys(map) as T[])
    .map((id) => ({
      id,
      hits: map[id].reduce((n, kw) => (text.includes(kw) ? n + 1 : n), 0),
    }))
    .filter((r) => r.hits > 0)
    .sort((a, b) => b.hits - a.hits);
}

export function parseBrief(input: string, prior?: EventBrief | null): EventBrief {
  const raw = prior?.raw && prior.raw !== input ? `${prior.raw}\n${input}` : input;
  const lower = raw.toLowerCase();

  const pax = parsePax(raw) ?? prior?.pax;
  const budgetPerPax = parseBudget(raw) ?? prior?.budgetPerPax;

  const events = scoreKeywordMap(lower, EVENT_KEYWORDS);
  const audiences = scoreKeywordMap(lower, AUDIENCE_KEYWORDS)
    .slice(0, 3)
    .map((a) => a.id);
  const preferences = scoreKeywordMap(lower, PREFERENCE_KEYWORDS).map((p) => p.id);

  // A high-value, low-headcount brief is a VIP brief whatever else it says.
  let eventType = events[0]?.id ?? prior?.eventType;
  if (budgetPerPax && budgetPerPax >= 120 && (pax ?? 0) <= 120) eventType = "vip";

  const mergedAudiences = Array.from(new Set([...audiences, ...(prior?.audiences ?? [])])).slice(0, 4);
  const mergedPrefs = Array.from(new Set([...preferences, ...(prior?.preferences ?? [])]));

  const missing: MissingField[] = [];
  if (budgetPerPax === undefined) missing.push("budget");
  if (pax === undefined) missing.push("pax");
  if (mergedAudiences.length === 0) missing.push("audience");

  return {
    raw,
    pax,
    budgetPerPax,
    budgetBand: budgetPerPax !== undefined ? bandFor(budgetPerPax).id : prior?.budgetBand,
    eventType,
    audiences: mergedAudiences,
    location: parseLocation(raw) ?? prior?.location,
    dateText: parseDate(raw) ?? prior?.dateText,
    preferences: mergedPrefs,
    missing,
  };
}

/** Human-readable summary of what the AI understood — shown back to the user. */
export function describeBrief(brief: EventBrief): string[] {
  const bits: string[] = [];
  if (brief.pax) bits.push(`${brief.pax.toLocaleString("en-MY")} people`);
  if (brief.budgetPerPax) bits.push(`≈ RM${Math.round(brief.budgetPerPax)} per person`);
  if (brief.location) bits.push(brief.location);
  if (brief.dateText) bits.push(brief.dateText);
  if (brief.audiences.length) bits.push(brief.audiences[0]);
  return bits;
}
