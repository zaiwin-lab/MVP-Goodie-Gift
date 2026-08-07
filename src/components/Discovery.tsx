import { Link } from "react-router-dom";
import { SEASONAL, TRENDING } from "../data/prompts";
import { PACKAGES_BY_ID } from "../data/packages";
import { Icon } from "./ui/Icon";
import { ConceptArt } from "./ConceptCard";
import "./Discovery.css";

export function Trending() {
  return (
    <section className="section section-dark trending">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">Live signal</span>
            <h2>
              <span aria-hidden="true">🔥</span> Trending Goodie Ideas
            </h2>
            <p>What organisers across Sarawak are asking for right now.</p>
          </div>
          <span className="trending__note">Sample data — prototype</span>
        </div>

        <ul className="trending__list">
          {TRENDING.map((t, i) => {
            const pkg = PACKAGES_BY_ID[t.packageId];
            return (
              <li
                key={t.id}
                className="reveal"
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <Link to={`/idea/${pkg.slug}`} className="trend">
                  <span className="trend__rank">{String(i + 1).padStart(2, "0")}</span>
                  <span className="trend__body">
                    <span className="trend__kicker">{t.kicker}</span>
                    <span className="trend__title">{t.title}</span>
                    <span className="trend__note">{t.note}</span>
                  </span>
                  <span className="trend__delta">
                    <Icon name="arrow-up" size={13} />
                    {t.delta}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Seasonal() {
  return (
    <section className="section seasonal" id="collections">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">Seasonal inspiration</span>
            <h2>What's happening soon?</h2>
            <p>
              Gifting in Sarawak follows a calendar. These are the moments organisers plan around.
            </p>
          </div>
        </div>

        <ul className="seasonal__rail">
          {SEASONAL.map((s, i) => {
            const pkg = PACKAGES_BY_ID[s.packageId];
            return (
              <li
                key={s.id}
                className="reveal"
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
              >
                <Link
                  to={`/idea/${pkg.slug}`}
                  className="season"
                  style={{ ["--from" as string]: s.from, ["--to" as string]: s.to }}
                >
                  <span className="season__wash" aria-hidden="true" />
                  <span className="season__when">{s.season}</span>
                  <span className="season__title">{s.title}</span>
                  <span className="season__blurb">{s.blurb}</span>
                  <span className="season__cta">
                    {pkg.name}
                    <Icon name="arrow-right" size={14} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Collections() {
  const featured = [
    "premium-sarawak-box",
    "digital-explorer",
    "eco-impact",
    "not-another-mug",
  ].map((id) => PACKAGES_BY_ID[id]);

  return (
    <section className="section section-tint collections">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">Collections</span>
            <h2>Four ways organisers usually go.</h2>
            <p>
              Most briefs land in one of these four instincts. Open one to see the budget variations.
            </p>
          </div>
        </div>

        <div className="collections__grid">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to={`/idea/${p.slug}`}
              className="collection reveal"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <ConceptArt pkg={p} size="lg" />
              <div className="collection__meta">
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <span className="collection__price">
                  RM{p.priceMin}–RM{p.priceMax}
                  <Icon name="arrow-right" size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
