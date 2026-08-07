import type {
  EventBrief,
  GoodiePackage,
  PackageTier,
  PreferenceId,
  RefinementId,
  Recommendation,
  ScoreBreakdown,
} from "../types";
import { getItems } from "../data/items";

/** Stated preferences that a concept can actually be tagged against. */
const PREFERENCE_FILTERS: Partial<Record<PreferenceId, string>> = {
  esg: "eco",
  sarawak: "sarawak",
  tech: "tech",
  premium: "premium",
};

/* ==========================================================================
   Concept scoring.

   Seven dimensions, weighted by what the visitor actually said. The weights —
   not the catalogue — are what a refinement button changes.
   ========================================================================== */

const BASE_WEIGHTS: ScoreBreakdown = {
  relevance: 0.22,
  audience: 0.16,
  budget: 0.22,
  creativity: 0.1,
  usefulness: 0.14,
  impact: 0.08,
  memorability: 0.08,
};

const REFINEMENT_WEIGHTS: Partial<Record<RefinementId, Partial<ScoreBreakdown>>> = {
  premium: { memorability: 0.2, budget: 0.1, creativity: 0.14 },
  cheaper: { budget: 0.38, usefulness: 0.2, creativity: 0.05 },
  esg: { impact: 0.3, usefulness: 0.16, budget: 0.14 },
  sarawak: { impact: 0.3, memorability: 0.16, relevance: 0.16 },
  creative: { creativity: 0.34, memorability: 0.18, usefulness: 0.08 },
  unexpected: { creativity: 0.4, memorability: 0.2, relevance: 0.08 },
};

function clamp(n: number): number {
  return Math.max(0, Math.min(100, n));
}

/** Overlap of two small sets, expressed 0–100 with a floor so nothing is zeroed out. */
function overlap(a: readonly string[], b: readonly string[]): number {
  if (!a.length) return 55;
  const hits = a.filter((x) => b.includes(x)).length;
  return clamp(30 + (hits / a.length) * 70);
}

/**
 * How well a tier's range brackets the target per-head budget. Returned
 * unclamped so distant tiers stay *comparably* bad — clamping here would make
 * every far-off tier score 0 and let tie-breaking pick arbitrarily.
 */
function budgetFitRaw(target: number | undefined, tier: PackageTier): number {
  if (target === undefined) return 62;
  const { min, max } = tier;
  if (target >= min && target <= max) return 100;
  const mid = (min + max) / 2;
  const drift = Math.abs(target - mid) / Math.max(mid, 1);
  // A tier that costs more than the budget (target below its floor) is punished
  // harder than one that comes in under: nobody is upset by savings.
  const penalty = target < min ? 130 : 95;
  return 100 - drift * penalty;
}

function budgetFit(target: number | undefined, tier: PackageTier): number {
  return clamp(budgetFitRaw(target, tier));
}

/**
 * The budget a tier is matched against. "Lower my budget" and "make it more
 * premium" have to move this — reweighting alone would reorder the same
 * estimates and the visitor would rightly say nothing happened.
 */
export function targetBudget(budgetPerPax: number | undefined, refinement?: RefinementId) {
  if (budgetPerPax === undefined) return undefined;
  if (refinement === "cheaper") return budgetPerPax * 0.55;
  if (refinement === "premium") return budgetPerPax * 1.7;
  return budgetPerPax;
}

export function pickTier(
  pkg: GoodiePackage,
  budgetPerPax?: number,
  refinement?: RefinementId,
): PackageTier {
  const target = targetBudget(budgetPerPax, refinement);

  if (target === undefined) {
    const fallback =
      refinement === "cheaper" ? "smart" : refinement === "premium" ? "premium" : "plus";
    return pkg.tiers.find((t) => t.id === fallback) ?? pkg.tiers[0];
  }

  return pkg.tiers.reduce((best, tier) =>
    budgetFitRaw(target, tier) > budgetFitRaw(target, best) ? tier : best,
  );
}

function impactScore(pkg: GoodiePackage, brief: EventBrief, refinement?: RefinementId): number {
  const wantsEsg = brief.preferences.includes("esg") || refinement === "esg";
  const wantsLocal = brief.preferences.includes("sarawak") || refinement === "sarawak";
  if (wantsEsg && wantsLocal) return (pkg.esgScore + pkg.sarawakRelevance) / 2;
  if (wantsEsg) return pkg.esgScore;
  if (wantsLocal) return pkg.sarawakRelevance;
  return (pkg.esgScore + pkg.sarawakRelevance) / 2;
}

function premiumFit(pkg: GoodiePackage, brief: EventBrief, refinement?: RefinementId): number {
  const wantsPremium = brief.preferences.includes("premium") || refinement === "premium";
  const wantsCheap = refinement === "cheaper";
  if (wantsPremium) return clamp(40 + pkg.premiumLevel * 14);
  if (wantsCheap) return clamp(120 - pkg.premiumLevel * 18);
  return 70;
}

export function scorePackage(
  pkg: GoodiePackage,
  brief: EventBrief,
  refinement?: RefinementId,
): { score: number; breakdown: ScoreBreakdown; tier: PackageTier } {
  const tier = pickTier(pkg, brief.budgetPerPax, refinement);
  const target = targetBudget(brief.budgetPerPax, refinement);

  // Relevance blends "is this the right kind of event?" with "does it carry the
  // qualities they asked for?" — so a tech brief favours tech concepts even when
  // several packages serve the same event type.
  const eventFit = brief.eventType ? (pkg.events.includes(brief.eventType) ? 100 : 45) : 68;
  const wanted = brief.preferences.map((p) => PREFERENCE_FILTERS[p]).filter(Boolean) as string[];
  const prefFit = wanted.length
    ? (wanted.filter((f) => pkg.filters.includes(f)).length / wanted.length) * 100
    : eventFit;

  const breakdown: ScoreBreakdown = {
    relevance: eventFit * 0.65 + prefFit * 0.35,
    audience: overlap(brief.audiences, pkg.audiences),
    budget: budgetFit(target, tier),
    creativity: pkg.creativity,
    usefulness: pkg.usefulness,
    impact: impactScore(pkg, brief, refinement),
    memorability: (pkg.memorability + premiumFit(pkg, brief, refinement)) / 2,
  };

  const weights: ScoreBreakdown = { ...BASE_WEIGHTS, ...(REFINEMENT_WEIGHTS[refinement!] ?? {}) };

  // Stated preferences nudge the weighting even without a refinement click.
  if (brief.preferences.includes("useful")) weights.usefulness += 0.1;
  if (brief.preferences.includes("creative")) weights.creativity += 0.1;
  if (brief.preferences.includes("esg") || brief.preferences.includes("sarawak")) {
    weights.impact += 0.12;
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const raw = (Object.keys(weights) as (keyof ScoreBreakdown)[]).reduce(
    (sum, key) => sum + breakdown[key] * weights[key],
    0,
  );

  return { score: Math.round(clamp(raw / total)), breakdown, tier };
}

/* ---- Explanations -------------------------------------------------------- */

/** Two phrasings per dimension so a grid of four cards never reads as a template. */
const DIMENSION_PHRASES: Record<keyof ScoreBreakdown, [string, string]> = {
  relevance: [
    "it maps directly onto the kind of programme you're running",
    "it was built for exactly this sort of event",
  ],
  audience: [
    "it is pitched at exactly the audience you described",
    "the people you named are the people this was designed around",
  ],
  budget: [
    "it lands inside your budget without looking like it",
    "the money goes into the part recipients actually notice",
  ],
  creativity: [
    "it is the kind of thing people photograph",
    "nobody in your planning meeting will have suggested it",
  ],
  usefulness: [
    "almost every item survives past the first week",
    "there is nothing in it that gets left on the chair",
  ],
  impact: [
    "the sourcing story holds up in a report",
    "you can name where every component came from",
  ],
  memorability: [
    "it is remembered long after the event ends",
    "it keeps your organisation in the room months later",
  ],
};

/**
 * Roughly the catalogue mean for each dimension. Explanations single out where a
 * concept beats the field, not simply where it scores high — otherwise every
 * card claims the same strength.
 */
const DIMENSION_BASELINE: Record<keyof ScoreBreakdown, number> = {
  relevance: 78,
  audience: 62,
  budget: 100,
  creativity: 73,
  usefulness: 84,
  impact: 58,
  memorability: 80,
};

/** Stable per-concept variation — same concept always reads the same way. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function explain(
  pkg: GoodiePackage,
  brief: EventBrief,
  breakdown: ScoreBreakdown,
  tier: PackageTier,
): string {
  const seed = hash(pkg.id);

  const top = (Object.keys(breakdown) as (keyof ScoreBreakdown)[])
    .filter((k) => k !== "budget")
    .sort(
      (a, b) =>
        breakdown[b] - DIMENSION_BASELINE[b] - (breakdown[a] - DIMENSION_BASELINE[a]),
    )[0];

  const context: string[] = [];

  if (brief.pax && brief.pax >= 500) {
    context.push(
      [
        `At ${brief.pax.toLocaleString("en-MY")} people, unit cost discipline matters`,
        `Across ${brief.pax.toLocaleString("en-MY")} recipients, every ringgit is multiplied`,
      ][seed % 2],
    );
  } else if (brief.pax && brief.pax <= 80) {
    context.push(
      [
        `At ${brief.pax} recipients you can afford presentation`,
        `With only ${brief.pax} to prepare, the packaging can carry real weight`,
      ][seed % 2],
    );
  }

  if (brief.budgetPerPax) {
    context.push(
      `the ${tier.label.toLowerCase()} build sits at RM${tier.min}–RM${tier.max} against your RM${Math.round(
        brief.budgetPerPax,
      )}`,
    );
  }

  const middle = context.length ? `${context.join(", and ")}. ` : "";
  const tail = `For your brief specifically, ${DIMENSION_PHRASES[top][seed % 2]}.`;

  return `${pkg.whyItWorks} ${middle}${tail}`;
}

export function buildRecommendation(
  pkg: GoodiePackage,
  brief: EventBrief,
  refinement?: RefinementId,
): Recommendation {
  const { score, breakdown, tier } = scorePackage(pkg, brief, refinement);
  return {
    id: `${pkg.id}-${tier.id}`,
    pkg,
    score,
    breakdown,
    why: explain(pkg, brief, breakdown, tier),
    estimate: { min: tier.min, max: tier.max },
    items: getItems(tier.itemIds),
    tier,
  };
}
