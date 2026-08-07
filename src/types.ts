/* ==========================================================================
   GOODIE PORTAL — V1 domain model (mock data only)
   ========================================================================== */

/** One of the six card personalities. The visual signature of the brand. */
export type ColourId = 1 | 2 | 3 | 4 | 5 | 6;

export type BudgetId = "u10" | "10-20" | "20-50" | "50-100" | "100+" | "unsure";

export interface Idea {
  id: string;
  colour: ColourId;
  /** Small label above the headline, e.g. "UNDER RM15". */
  label: string;
  name: string;
  description: string;
  tags: [string, string, string];
  /** Display string, e.g. "RM8–RM15/person". */
  price: string;
  priceMin: number;
  priceMax: number;
  /** Longer, warmer copy shown when the card expands. */
  story: string;
  contents: string[];
  bestFor: string[];
  /** Free-form matching keywords for the personalisation step. */
  categories: string[];
}

/** Answers gathered progressively — never as one big form. */
export interface EventAnswers {
  event: string;
  pax: string;
  budget: BudgetId | "";
  when: string;
  where: string;
}

export interface Contact {
  name: string;
  organisation: string;
  whatsapp: string;
  email: string;
}

export interface QuoteRecord {
  ref: string;
  createdAt: string;
  contact: Contact;
  answers: EventAnswers;
  ideaId?: string;
  ideaName?: string;
}

/**
 * Sourcing metadata is modelled but never surfaced. V1 shows customers an
 * estimated range only; supplier identity, cost and margin stay internal.
 */
export type SourceChannel =
  | "in-house"
  | "preferred-supplier"
  | "local-sarawak"
  | "marketplace"
  | "custom";
