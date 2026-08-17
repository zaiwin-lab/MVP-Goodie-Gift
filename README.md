# GOODIE — Smart Event Gifting Advisor

> **Portfolio maturity:** Working Public Prototype · Deterministic Recommendation and Quotation Journey

[Open the verified live demonstration](https://goodie-sarawak.netlify.app)

GOODIE is a Sarawak-focused event-gifting discovery experience that helps a buyer move from a vague event idea to a structured quotation brief.

The repository name retains MVP for development history. **GOODIE** is the permanent product identity.

## Business problem

Event organisers frequently know the occasion, audience and budget but not which gift concept is suitable. Conventional catalogue browsing creates too many choices, while a quotation form asks for details before the buyer has found inspiration.

GOODIE combines discovery and qualification in one guided journey:

**Discover → explore → personalise → compare suggestions → prepare quotation request**

## Intended users

- corporate and government event organisers;
- associations, community groups and programme teams;
- SMEs planning customer, staff or festive gifts;
- gifting suppliers who need clearer briefs before preparing quotations.

## Core capabilities

- a visual playground containing 36 demonstration gift ideas across six colour personalities;
- rotating and randomised discovery modes;
- an expanded concept view with example contents, suitability and estimated range;
- a one-question-at-a-time event brief covering event, quantity, budget, timing and location;
- deterministic suggestion matching using event keywords, budget and quantity;
- three ranked suggestions with an explained best match;
- a short quotation handoff that carries earlier answers forward;
- responsive interaction, keyboard-labelled controls and reduced-motion support.

## Strategic value

GOODIE demonstrates how a service business can turn an unstructured enquiry into a useful, standardised brief without forcing the customer into a long form at the beginning.

For an authorised commercial implementation, the journey could:

- improve customer confidence before requesting a quote;
- give a sales team more complete event requirements;
- separate inspiration from confidential sourcing and margin decisions;
- support repeatable matching logic before introducing more complex AI;
- create a foundation for supplier, inventory, CRM and quotation integrations.

These are potential operational outcomes, not claims of measured adoption or revenue.

## How the recommendation works

The current matcher is deliberately simple, local and inspectable. It scores the demonstration ideas using event keywords, budget fit and quantity fit. No external AI model or API is called.

That design keeps the prototype fast and explainable while providing a clear interface for a future recommendation service.

## What is implemented

The repository contains a React and TypeScript single-page application, the complete guided journey, structured domain types, 36 demonstration ideas, deterministic matching, responsive styling and Netlify deployment configuration.

### Technology

React 19 · TypeScript · Vite · CSS design tokens · deterministic local matching · Netlify

The core application uses only React and React DOM at runtime. It does not currently include a router, UI framework, authentication service, database or payment provider.

## Delivery role

**Ts. Zaiwin Kassim** leads product strategy, stakeholder requirements, solution architecture and supervised AI-assisted delivery with the **KOBIS AI Prodigy Team**. For GOODIE, that role covers the customer journey, recommendation concept, quotation workflow and responsible product boundaries.

This portfolio attribution does not imply endorsement, supplier participation, customer adoption or commercial deployment by any external organisation.

## Responsible-use boundaries

- Gift ideas, estimated ranges and supplier channels are demonstration data, not binding offers.
- The suggestion score is a planning aid; a person must review suitability, availability, lead time, budget, branding and delivery requirements.
- The current prototype does not verify suppliers, inventory, materials, sustainability claims or product safety.
- No live AI model is present, so the interface must not imply that an autonomous AI has sourced or priced an item.
- Contact details entered in the prototype are not sent to a real quotation backend.
- A production form would require consent, secure transmission, retention rules and access controls.
- Final prices, taxes, fulfilment terms and warranties require an authorised written quotation.

## Current limitations

- no backend, database, CRM or quotation delivery;
- no login, customer account or administrative workspace;
- no supplier, stock, logistics or payment integration;
- no live AI recommendation service;
- no verified commercial prices or margin calculations;
- no automated test suite is documented;
- the displayed confirmation and reference number are demonstration interactions only.

## Run locally

Requirements: Node.js 20 or later and npm.

    npm install
    npm run dev
    npm run typecheck
    npm run build
    npm run preview

## Deployment evidence

The connected hosting record identifies **goodie-sarawak** as the project for this repository and reports its current deployment as ready. The committed Netlify configuration builds with npm run build and publishes the dist directory.

## Repository map

- **src/App.tsx** — main public experience
- **src/components/Journey.tsx** — discovery-to-quotation journey
- **src/lib/match.ts** — readable suggestion scoring
- **src/data/ideas.ts** — 36 demonstration ideas
- **src/data/content.ts** — page copy and choice sets
- **src/types.ts** — event, idea and quotation types
- **src/styles** — responsive design system
- **netlify.toml** — build, caching and security headers

## Portfolio evidence

GOODIE demonstrates product-led conversion design, explainable recommendation logic, typed front-end architecture and a disciplined separation between a persuasive prototype and unimplemented commercial operations.
