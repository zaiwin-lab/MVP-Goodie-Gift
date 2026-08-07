import { TRUST_LINE } from "../data/content";
import "./Hero.css";

interface Props {
  onQuote(): void;
  onExplore(): void;
}

/**
 * Floating goodie shapes — six colours, no stock photography.
 * All of them live in the outer margins: the headline column runs roughly
 * 17%–83%, so nothing here is allowed inside that band. The whole layer is
 * hidden below 1240px, where there is no margin left to float in.
 */
const FLOATERS = [
  { c: 1, side: "left", x: "4%", y: "22%", s: 92, d: "0s", g: "◆" },
  { c: 3, side: "right", x: "5%", y: "15%", s: 74, d: "0.8s", g: "✦" },
  { c: 4, side: "left", x: "7%", y: "68%", s: 66, d: "1.6s", g: "❋" },
  { c: 2, side: "right", x: "3%", y: "62%", s: 100, d: "0.4s", g: "●" },
  { c: 5, side: "right", x: "9%", y: "38%", s: 54, d: "2.1s", g: "▲" },
  { c: 6, side: "left", x: "9%", y: "45%", s: 48, d: "1.2s", g: "■" },
] as const;

export function Hero({ onQuote, onExplore }: Props) {
  return (
    <header className="hero">
      <div className="hero__wash" aria-hidden="true" />

      <div className="hero__floaters" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <span
            key={i}
            className={`hero__floater hero__floater--c${f.c}`}
            style={{
              [f.side]: f.x,
              top: f.y,
              width: f.s,
              height: f.s,
              animationDelay: f.d,
            }}
          >
            {f.g}
          </span>
        ))}
      </div>

      <div className="shell hero__inner">
        <p className="hero__kicker">Sarawak Event Goodies &amp; Gifts</p>

        <h1 className="hero__title">
          Need Goodies
          <br />
          <span>For Your Event?</span>
        </h1>

        <p className="hero__lead">
          Discover creative goodies, gifts and event packs for any occasion — then let us quote it
          for you, <strong>FREE</strong>.
        </p>

        <div className="hero__actions">
          <button className="btn btn--brand btn--lg" onClick={onQuote}>
            Get free quotation <span className="btn__arrow">→</span>
          </button>
          <button className="btn btn--ghost btn--lg" onClick={onExplore}>
            <span aria-hidden="true">✨</span> Explore goodie ideas
          </button>
        </div>

        <ul className="hero__trust">
          {TRUST_LINE.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <span className="smart-badge hero__badge">
          <span className="smart-badge__spark" aria-hidden="true">
            ✦
          </span>
          Powered by Smart AI Solutions
        </span>
      </div>
    </header>
  );
}
