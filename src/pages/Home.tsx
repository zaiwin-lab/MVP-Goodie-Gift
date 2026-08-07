import { Hero } from "../components/Hero";
import { IdeaWall } from "../components/IdeaWall";
import { Collections, Seasonal, Trending } from "../components/Discovery";
import {
  About,
  FooterCTA,
  HowItWorks,
  Organisations,
  PricePositioning,
  SarawakAdvantage,
  Trust,
} from "../components/Sections";

export function Home() {
  return (
    <main id="main">
      <Hero />
      <IdeaWall />
      <Trending />
      <Collections />
      <Seasonal />
      <HowItWorks />
      <SarawakAdvantage />
      <Organisations />
      <PricePositioning />
      <About />
      <Trust />
      <FooterCTA />
    </main>
  );
}
