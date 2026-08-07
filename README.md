# GOODIE — V1

> Need goodies for your event?

A one-page prototype for a Sarawak event goodies and gifting platform. The
customer journey is:

**DISCOVER → PLAY → GET INSPIRED → PERSONALISE → FREE QUOTATION**

Simple engineering, mock data, no backend. The effort goes into the experience.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Node 20+. React 19 + TypeScript on Vite. Two runtime dependencies (`react`,
`react-dom`) — no router, no UI kit, no icon library, no animation library.

## The signature experience

**The Goodie Idea Playground.** Six colourful idea cards, each with its own
colour personality, and one irresistible button: **✨ Show me 6 more**.

36 mock ideas are stored as six ideas per colour, dealt in rounds. That means
six presses give six completely fresh sets, and every set always shows all six
colour personalities. **🎲 Surprise me** deals a random idea from each colour
instead of advancing the round.

Nothing is asked of the visitor here — they can look, press, look, press, and
discover for as long as they like.

## The journey

Clicking any card opens a single fluid surface (`Journey.tsx`) rather than a
separate page:

1. **Expanded idea** — story, possible contents, best-for, estimated range
2. **"Planning something similar?"** — one conversational input
3. **Five questions, one at a time** — event, quantity, budget, date, place,
   with quick-choice buttons and a progress bar. Back always works and answers
   are retained.
4. **Short processing moment** — rotating status lines, not a spinner
5. **Three personalised suggestions** — the best match is pre-selected
6. **Free quotation** — only four contact fields; everything already answered is
   carried over and shown as "no need to retype it"
7. **Success** — reference number and a short confetti burst

The quotation CTAs in the nav, hero, mid-page and footer skip straight to step 3.

## Structure

```
src/
  types.ts               Domain model
  data/ideas.ts          36 ideas, six per colour, dealt in rounds
  data/content.ts        All page copy, options and feature lists
  lib/match.ts           Suggestion scoring (keyword + budget + quantity)
  lib/hooks.ts           Reveal observer, scroll lock, cycling
  components/            One component + one stylesheet each
  styles/tokens.css      Design tokens, including the six colour triples
  styles/global.css      Reset, layout and shared UI
```

### The colour system

Each personality is a triple — a soft `tint` for the card, a deep `ink` for
type, and a saturated `accent` for labels and hover states — defined once in
`tokens.css` as `--c1-*` through `--c6-*`. The colours carry through everywhere:
card labels, the "Show me 6 more" hover sweep, the bento grid borders, the
Sarawak use-case chips, the confetti and the brand mark.

The rest of the page is deliberately near-white so the cards stay the signature.

### Sourcing model

`SourceChannel` in `types.ts` models the future mix — in-house, preferred
supplier, local Sarawak, marketplace, custom — but V1 exposes none of it.
Customers only ever see an **estimated range**; supplier identity, cost and
margin stay internal by construction.

## Not built (deliberately)

No login, accounts, payment, admin, database, CRM, inventory, real supplier
integration or AI API. AI is positioned as the technology *behind* the service —
a subtle badge up front, with the full "Smart Technology" reveal only after the
visitor understands what's being offered.

## Deployment

`netlify.toml` builds to `dist/` with long-lived caching for hashed assets and
no-cache on `index.html`.

## Verified

Checked in Chromium at 390px, 834px, 1180px and 1680px:

- Full journey works end to end from both entry points (card and quotation CTA)
- 6 presses → 36 distinct ideas, always 6 distinct colours
- Zero horizontal overflow at every breakpoint; no console errors
- Hero floating shapes never collide with the headline (hidden below 1240px)
- Single `h1`, every control has an accessible name, motion respects
  `prefers-reduced-motion`
- Scroll reveals fail safe: content is visible unless the observer has mounted
