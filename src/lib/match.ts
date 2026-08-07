import { IDEAS } from "../data/ideas";
import { BUDGET_RANGE } from "../data/content";
import type { EventAnswers, Idea } from "../types";

/* ==========================================================================
   Suggestion matching.

   Deliberately simple and local: no API, no key, no latency to design around.
   The scoring is readable enough that a future service can replace it without
   changing anything the UI depends on.
   ========================================================================== */

const KEYWORDS: Record<string, string[]> = {
  government: ["government", "kerajaan", "ministry", "agency", "official", "state", "launching"],
  corporate: ["company", "corporate", "staff", "employee", "annual dinner", "client", "office"],
  conference: ["conference", "summit", "delegate", "seminar", "forum", "convention", "symposium"],
  community: ["community", "kampung", "outreach", "residents", "public", "welfare"],
  vip: ["vip", "minister", "guest of honour", "dignitary", "launching", "ceremony", "premier"],
  esg: ["esg", "sustainab", "environment", "green", "recycl", "csr", "tree", "climate"],
  youth: ["youth", "young", "belia", "teen"],
  students: ["student", "school", "pelajar", "pupil"],
  university: ["university", "universiti", "campus", "college", "convocation", "orientation"],
  training: ["training", "workshop", "bootcamp", "course", "capacity"],
  family: ["family", "parents", "carnival", "open day"],
  children: ["children", "kids", "primary"],
  sports: ["sports", "run", "marathon", "tournament", "games", "futsal"],
  festival: ["gawai", "raya", "christmas", "chinese new year", "festival", "open house", "deepavali"],
  tourism: ["tourism", "visitor", "delegation", "trade mission", "inbound", "tour"],
  women: ["women", "wanita", "ladies", "mother"],
  entrepreneurship: ["entrepreneur", "founder", "startup", "sme", "usahawan", "incubator"],
  technology: ["tech", "digital", "hackathon", "innovation", "ai", "coding"],
  sarawak: ["sarawak", "borneo", "local", "cultural", "heritage", "dayak", "iban"],
  awards: ["award", "recognition", "appreciation night", "gala"],
  appreciation: ["appreciation", "thank", "long service", "retirement"],
  media: ["media", "press", "journalist"],
  creative: ["creative", "different", "unusual", "not the usual", "fun", "modern"],
};

function categoriesFrom(text: string): string[] {
  const lower = text.toLowerCase();
  return Object.keys(KEYWORDS).filter((cat) =>
    KEYWORDS[cat].some((kw) => lower.includes(kw)),
  );
}

function paxWeight(pax: string, idea: Idea): number {
  const big = /500|1,000|1000|\+/.test(pax);
  const small = /under 50|50–200|50-200/i.test(pax);
  if (big) return idea.priceMax <= 45 ? 18 : idea.priceMax <= 80 ? 6 : -10;
  if (small) return idea.priceMin >= 40 ? 14 : 4;
  return 6;
}

function budgetWeight(budget: EventAnswers["budget"], idea: Idea): number {
  if (!budget || budget === "unsure") return 8;
  const [min, max] = BUDGET_RANGE[budget];
  // Overlap between the stated band and the idea's range.
  const overlap = Math.min(max, idea.priceMax) - Math.max(min, idea.priceMin);
  if (overlap >= 0) return 34;
  const gap = Math.abs(overlap);
  // Coming in under budget is far less of a problem than blowing past it.
  return Math.max(-24, 20 - gap * (idea.priceMin > max ? 1.4 : 0.7));
}

export function suggestIdeas(answers: EventAnswers, count = 3): Idea[] {
  const cats = categoriesFrom(`${answers.event} ${answers.where}`);

  const scored = IDEAS.map((idea) => {
    const hits = idea.categories.filter((c) => cats.includes(c)).length;
    const relevance = cats.length ? (hits / cats.length) * 46 : 16;
    return {
      idea,
      score: relevance + budgetWeight(answers.budget, idea) + paxWeight(answers.pax, idea),
    };
  }).sort((a, b) => b.score - a.score);

  // Keep the three visually distinct — one colour each wherever possible.
  const picked: Idea[] = [];
  const usedColours = new Set<number>();

  for (const { idea } of scored) {
    if (picked.length >= count) break;
    if (usedColours.has(idea.colour)) continue;
    picked.push(idea);
    usedColours.add(idea.colour);
  }
  for (const { idea } of scored) {
    if (picked.length >= count) break;
    if (!picked.includes(idea)) picked.push(idea);
  }

  return picked;
}

/** Short line explaining the pick, in the customer's own terms. */
export function reasonFor(idea: Idea, answers: EventAnswers): string {
  const bits: string[] = [];
  if (answers.pax) bits.push(`sized for ${answers.pax.toLowerCase()} people`);
  if (answers.budget && answers.budget !== "unsure") bits.push("fits the budget you gave");
  if (answers.where && !/outside/i.test(answers.where)) bits.push(`easy to deliver to ${answers.where}`);
  if (!bits.length) return idea.description;
  return `${bits.join(", ")}.`;
}
