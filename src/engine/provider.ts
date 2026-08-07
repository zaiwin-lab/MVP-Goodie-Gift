import type {
  EventBrief,
  RecommendRequest,
  Recommendation,
  RecommendationProvider,
} from "../types";
import { PACKAGES } from "../data/packages";
import { parseBrief } from "./parse";
import { buildRecommendation } from "./score";

/* ==========================================================================
   Provider seam.

   Everything the UI knows about "the AI" is the RecommendationProvider
   interface. The rule-based engine below is the default; pointing
   VITE_AI_API_URL at a real LLM service swaps it out with no UI changes.
   ========================================================================== */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Deterministic per-request jitter so repeat clicks don't return an identical
 * order. Kept small on purpose: it should break ties, never outrank a genuinely
 * better match.
 */
function jitter(seed: number, i: number): number {
  return Math.abs((Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453) % 1) * 1.5;
}

export const mockProvider: RecommendationProvider = {
  id: "mock",
  label: "GoodieAI rule engine",

  async understand(input, prior) {
    await wait(120);
    return parseBrief(input, prior);
  },

  async recommend({ brief, count = 4, refinement, exclude = [] }: RecommendRequest) {
    // Perceived work. The staged thinking UI runs against this window.
    await wait(420 + Math.random() * 380);

    const seed = brief.raw.length + (refinement?.length ?? 0) * 7 + exclude.length * 13;

    let pool = PACKAGES.filter((p) => !exclude.includes(p.id));
    if (pool.length < count) pool = PACKAGES; // ran out of catalogue — start over

    const ranked = pool
      .map((pkg, i) => {
        const rec = buildRecommendation(pkg, brief, refinement);
        return { rec, sort: rec.score + jitter(seed, i) };
      })
      .sort((a, b) => b.sort - a.sort);

    // "Something unexpected" deliberately reaches past the obvious answer.
    if (refinement === "unexpected") {
      const wild = ranked
        .slice(0, 12)
        .sort((a, b) => b.rec.pkg.creativity - a.rec.pkg.creativity)
        .slice(0, count);
      return wild.map((r) => r.rec);
    }

    return ranked.slice(0, count).map((r) => r.rec);
  },
};

/* ---- Real LLM service (wire up when an endpoint exists) ------------------ */

const API_URL = import.meta.env.VITE_AI_API_URL as string | undefined;

function remoteProvider(url: string): RecommendationProvider {
  const post = async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`${url}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`GoodieAI service ${res.status}`);
    return (await res.json()) as T;
  };

  return {
    id: "remote",
    label: "GoodieAI service",

    async understand(input: string, prior?: EventBrief | null) {
      try {
        return await post<EventBrief>("/understand", { input, prior });
      } catch {
        return mockProvider.understand(input, prior);
      }
    },

    async recommend(req: RecommendRequest) {
      try {
        return await post<Recommendation[]>("/recommend", req);
      } catch {
        // A failed model call must never dead-end the visitor.
        return mockProvider.recommend(req);
      }
    },
  };
}

export const provider: RecommendationProvider = API_URL ? remoteProvider(API_URL) : mockProvider;
