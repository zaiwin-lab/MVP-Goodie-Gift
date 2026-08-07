import { useCallback, useState } from "react";
import type { Idea } from "./types";
import { useRevealObserver } from "./lib/hooks";
import { MobileBar, Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Playground } from "./components/Playground";
import { Journey } from "./components/Journey";
import {
  FinalCTA,
  Footer,
  HowItWorks,
  Organisations,
  PriceRange,
  QuoteNudges,
  Sarawak,
  SmartTech,
  Statement,
} from "./components/Sections";

export default function App() {
  useRevealObserver();

  /** null = closed. An Idea opens on its detail; "quote" starts the questions. */
  const [journey, setJourney] = useState<Idea | "quote" | null>(null);

  const openIdea = useCallback((idea: Idea) => setJourney(idea), []);
  const openQuote = useCallback(() => setJourney("quote"), []);
  const close = useCallback(() => setJourney(null), []);

  const exploreIdeas = useCallback(() => {
    document.getElementById("ideas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <a className="skip-link" href="#ideas">
        Skip to the ideas
      </a>

      <Nav onQuote={openQuote} />

      <main id="top">
        <Hero onQuote={openQuote} onExplore={exploreIdeas} />
        <Playground onOpen={openIdea} />
        <Statement />
        <HowItWorks />
        <QuoteNudges onQuote={openQuote} />
        <SmartTech />
        <Sarawak />
        <PriceRange />
        <Organisations />
        <FinalCTA onQuote={openQuote} onExplore={exploreIdeas} />
      </main>

      <Footer />
      <MobileBar onQuote={openQuote} onExplore={exploreIdeas} />

      {journey && (
        <Journey
          idea={journey === "quote" ? null : journey}
          quoteFirst={journey === "quote"}
          onClose={close}
        />
      )}
    </>
  );
}
