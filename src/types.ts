/* ==========================================================================
   GOODIE.AI — Domain model
   Deliberately provider-agnostic: the mock engine and a future LLM service
   both speak these types, so swapping one for the other changes no UI code.
   ========================================================================== */

export type BudgetBandId = "under10" | "10to30" | "30to50" | "50to100" | "premium";

export interface BudgetBand {
  id: BudgetBandId;
  label: string;
  short: string;
  min: number;
  max: number;
}

export type AudienceId =
  | "youth"
  | "students"
  | "corporate"
  | "government"
  | "vip"
  | "international"
  | "community"
  | "children"
  | "women"
  | "entrepreneurs"
  | "academics"
  | "athletes";

export type EventTypeId =
  | "government"
  | "corporate"
  | "conference"
  | "community"
  | "vip"
  | "esg"
  | "university"
  | "festival"
  | "sports"
  | "training"
  | "tourism"
  | "family";

export interface EventCategory {
  id: EventTypeId;
  label: string;
  blurb: string;
  icon: string;
}

/** A single sourceable product. The unit a quotation is eventually built from. */
export interface GoodieItem {
  id: string;
  name: string;
  category: string;
  priceMin: number;
  priceMax: number;
  moq: number;
  customisable: boolean;
  leadTimeDays: number;
  audiences: AudienceId[];
  events: EventTypeId[];
  /** 0–100. How defensible this is in an ESG / sustainability programme. */
  esgScore: number;
  /** 0–100. Local sourcing, local design or local cultural relevance. */
  sarawakRelevance: number;
  /** 1 (mass giveaway) – 5 (VIP appreciation gift). */
  premiumLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  tags: string[];
}

export interface PackageTier {
  id: "smart" | "plus" | "premium";
  label: string;
  min: number;
  max: number;
  note: string;
  itemIds: string[];
}

/** A curated concept — what the AI actually recommends. */
export interface GooodiePackageBase {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  story: string;
  whyItWorks: string;
  itemIds: string[];
  bestFor: string[];
  audiences: AudienceId[];
  events: EventTypeId[];
  priceMin: number;
  priceMax: number;
  esgScore: number;
  sarawakRelevance: number;
  premiumLevel: 1 | 2 | 3 | 4 | 5;
  creativity: number;
  usefulness: number;
  memorability: number;
  tags: string[];
  filters: string[];
  tiers: PackageTier[];
  /** Visual identity for the concept card — no stock photography needed. */
  art: {
    glyph: string;
    from: string;
    to: string;
  };
}

export type GoodiePackage = GooodiePackageBase;

export type PreferenceId =
  | "esg"
  | "sarawak"
  | "tech"
  | "premium"
  | "creative"
  | "useful"
  | "unexpected";

/** What the AI understood from a free-text brief. */
export interface EventBrief {
  raw: string;
  pax?: number;
  budgetPerPax?: number;
  budgetBand?: BudgetBandId;
  eventType?: EventTypeId;
  audiences: AudienceId[];
  location?: string;
  dateText?: string;
  preferences: PreferenceId[];
  /** Ordered by how much answering would improve the recommendation. */
  missing: MissingField[];
}

export type MissingField = "budget" | "pax" | "audience";

export interface ScoreBreakdown {
  relevance: number;
  audience: number;
  budget: number;
  creativity: number;
  usefulness: number;
  impact: number;
  memorability: number;
}

export interface Recommendation {
  id: string;
  pkg: GoodiePackage;
  /** 0–100 "Goodie Score". */
  score: number;
  breakdown: ScoreBreakdown;
  why: string;
  estimate: { min: number; max: number };
  items: GoodieItem[];
  /** Which tier best matches the stated budget. */
  tier: PackageTier;
}

export type RefinementId =
  | "more"
  | "premium"
  | "cheaper"
  | "esg"
  | "sarawak"
  | "creative"
  | "unexpected";

export interface Refinement {
  id: RefinementId;
  label: string;
  emoji: string;
  /** Line GoodieAI "says" when this refinement is applied. */
  reply: string;
}

export interface RecommendRequest {
  brief: EventBrief;
  count?: number;
  refinement?: RefinementId;
  /** Package ids already shown — used by "give me 3 more ideas". */
  exclude?: string[];
}

/** The seam a real LLM service slots into. See engine/provider.ts. */
export interface RecommendationProvider {
  id: string;
  label: string;
  understand(input: string, prior?: EventBrief | null): Promise<EventBrief>;
  recommend(req: RecommendRequest): Promise<Recommendation[]>;
}

/* ---- Lead / quotation model (shaped for a future admin backend) ---------- */

export type LeadStatus =
  | "NEW LEAD"
  | "CONTACTED"
  | "SOURCING"
  | "QUOTATION PREPARING"
  | "QUOTATION SENT"
  | "FOLLOW-UP"
  | "WON"
  | "LOST";

export interface QuotationContact {
  name: string;
  organisation: string;
  whatsapp: string;
  email: string;
  requiredDate: string;
  quantity: string;
  notes: string;
}

export interface QuotationRequest {
  id: string;
  createdAt: string;
  status: LeadStatus;
  contact: QuotationContact;
  /** Everything the visitor already told the AI, carried over automatically. */
  context: {
    eventDescription: string;
    conceptId?: string;
    conceptName?: string;
    estimate?: { min: number; max: number };
    pax?: number;
    budgetPerPax?: number;
    preferences: PreferenceId[];
    savedConceptIds: string[];
  };
}
