# GOODIE.AI

> Tell us about your event. AI finds the right goodies.

An interactive prototype for an AI-powered event gifting, sourcing and quotation
platform based in Sarawak, Malaysia. A visitor describes their event in plain
language; GoodieAI proposes goodie concepts with reasoning and indicative budget
ranges; the visitor refines them and requests a free quotation.

**GOODIE.AI is a temporary working brand.** All prices are indicative idea
ranges, never quotations. Trending figures, trust statistics and client logos are
clearly-labelled sample content.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Node 20+. No API keys or backend required — the prototype ships with a working
rule-based recommendation engine.

## The journey it demonstrates

1. Describe an event in free text (or click one of six sample prompts, or roll
   *Surprise me*)
2. GoodieAI asks **one** follow-up question if — and only if — an answer would
   change the recommendation
3. Staged "thinking" reveal, then 3–6 scored concept cards, each explaining *why*
   it fits this brief
4. Conversational refinement: more ideas, more premium, lower budget, ESG,
   Sarawak, more creative, something unexpected
5. Browse and filter the idea wall without using the AI at all
6. Open a concept for budget variations (Smart / Plus / Premium) and per-item
   specs — MOQ, lead time, customisability
7. Request a free quotation; the event brief, concept, quantity, budget and saved
   ideas are carried over automatically
8. Confirmation with a reference number and lead status

## Architecture

```
src/
  types.ts            Domain model — shared by the mock engine and any future LLM
  data/
    items.ts          40 sourceable products with full sourcing metadata
    packages.ts       18 curated concepts, each with three budget tiers
    taxonomy.ts       Budget bands, event categories, filters, refinements
    prompts.ts        Sample prompts, trending, seasonal, surprise scenarios
  engine/
    parse.ts          Free text → EventBrief (quantity, budget, audience, place…)
    score.ts          Seven-dimension scoring, tier selection, explanations
    provider.ts       RecommendationProvider seam + mock and remote impls
  state/store.tsx     AI conversation, saved ideas, quotation leads
  components/         UI, one CSS file per component
  pages/              Home, idea detail
  styles/             Design tokens, reset and shared primitives
```

### Swapping in a real LLM

Everything the UI knows about "the AI" is the `RecommendationProvider` interface
in `src/types.ts`:

```ts
interface RecommendationProvider {
  understand(input: string, prior?: EventBrief | null): Promise<EventBrief>;
  recommend(req: RecommendRequest): Promise<Recommendation[]>;
}
```

Set `VITE_AI_API_URL` and `src/engine/provider.ts` will POST to
`/understand` and `/recommend` on that service instead of running the local
engine. If the service errors or times out it falls back to the mock engine, so a
failed model call never dead-ends a visitor. No component changes are needed.

### How recommendations are scored

Each concept is scored 0–100 (the "Goodie Score") across seven dimensions:
event relevance, audience suitability, budget fit, creativity, everyday
usefulness, ESG/local impact and memorability. Weights shift with what the
visitor said and with the refinement they clicked — *lower my budget* raises the
budget weight **and** moves the target budget so the estimates genuinely drop.

### Lead capture

Quotation requests are written as `QuotationRequest` records (contact + carried
event context + saved concepts + `LeadStatus`) to `localStorage` under
`goodie.leads`. The shape is what a real admin backend would persist; swapping
the store's `submitQuote` for an API call is the only change required.

## Deployment

`netlify.toml` builds to `dist/` with an SPA redirect so `/idea/:slug` resolves,
long-lived caching for hashed assets, and no-cache on `index.html`.

## Notes

- Mobile-first; verified at 390px, 834px and 1440px with zero horizontal overflow
- Animations respect `prefers-reduced-motion`
- Scroll reveals fail safe: content is visible unless the observer has mounted
- No icon library, no stock photography — concept artwork is generated from each
  package's own gradient and glyph
