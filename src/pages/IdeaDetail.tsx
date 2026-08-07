import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PACKAGES, PACKAGES_BY_SLUG } from "../data/packages";
import { getItems } from "../data/items";
import { useStore } from "../state/store";
import { ConceptArt, ConceptCard } from "../components/ConceptCard";
import { Icon } from "../components/ui/Icon";
import type { PackageTier } from "../types";
import "./IdeaDetail.css";

export function IdeaDetail() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES_BY_SLUG[slug];
  const { openQuote, isSaved, toggleSave, ask } = useStore();
  const [tierId, setTierId] = useState<PackageTier["id"]>("plus");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setTierId("plus");
  }, [slug]);

  if (!pkg) {
    return (
      <main className="section shell detail__missing">
        <h1>That idea has moved.</h1>
        <p>It may have been renamed. The full idea wall is still where you left it.</p>
        <Link to="/#ideas" className="btn btn--primary">
          Back to all ideas
        </Link>
      </main>
    );
  }

  const tier = pkg.tiers.find((t) => t.id === tierId) ?? pkg.tiers[1];
  const items = getItems(tier.itemIds);
  const saved = isSaved(pkg.id);

  const related = PACKAGES.filter(
    (p) => p.id !== pkg.id && p.filters.some((f) => pkg.filters.includes(f)),
  ).slice(0, 4);

  const customise = () => {
    navigate("/");
    window.setTimeout(() => {
      ask(
        `Customise the "${pkg.name}" concept for my event. Keep what makes it work but adapt it to my audience and budget.`,
      );
      document.getElementById("ai-finder")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const share = async () => {
    const url = window.location.href;
    const text = `${pkg.name} — ${pkg.tagline} (RM${pkg.priceMin}–RM${pkg.priceMax} per person) via GOODIE.AI`;
    if (navigator.share) {
      try {
        await navigator.share({ title: pkg.name, text, url });
        return;
      } catch {
        /* dismissed — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing useful to do */
    }
  };

  return (
    <main className="detail">
      <div className="shell">
        <Link to="/#ideas" className="detail__back">
          <Icon name="arrow-right" size={15} />
          All ideas
        </Link>
      </div>

      {/* ---- Hero ---- */}
      <section className="shell detail__hero">
        <div className="detail__hero-art">
          <ConceptArt pkg={pkg} size="lg" />
        </div>

        <div className="detail__hero-text">
          <ul className="detail__tags">
            {pkg.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <h1>{pkg.name}</h1>
          <p className="detail__tagline">{pkg.tagline}</p>
          <p className="detail__story">{pkg.story}</p>

          <div className="detail__hero-actions">
            <button className="btn btn--primary btn--lg" onClick={() => openQuote({
              conceptId: pkg.id,
              conceptName: pkg.name,
              estimate: { min: tier.min, max: tier.max },
            })}>
              Get Free Quotation
            </button>
            <button className={`btn btn--ghost ${saved ? "is-saved" : ""}`} onClick={() => toggleSave(pkg.id)}>
              <Icon name={saved ? "heart-fill" : "heart"} size={16} />
              {saved ? "Saved" : "Save Idea"}
            </button>
            <button className="btn btn--ghost" onClick={share}>
              <Icon name={copied ? "check" : "share"} size={16} />
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* ---- Recommended for ---- */}
      <section className="shell detail__strip">
        <div>
          <span className="detail__label">Recommended for</span>
          <ul className="detail__pills">
            {pkg.bestFor.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="detail__label">Signals</span>
          <ul className="detail__meters">
            {[
              { k: "Usefulness", v: pkg.usefulness },
              { k: "Creativity", v: pkg.creativity },
              { k: "ESG", v: pkg.esgScore },
              { k: "Sarawak", v: pkg.sarawakRelevance },
            ].map((m) => (
              <li key={m.k}>
                <span>{m.k}</span>
                <span className="detail__meter">
                  <span style={{ width: `${m.v}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Budget variations ---- */}
      <section className="section detail__tiers">
        <div className="shell">
          <div className="sec-head">
            <div className="sec-head__text">
              <span className="eyebrow">Budget variations</span>
              <h2>Same idea. Three levels.</h2>
              <p>
                Pick the build that fits your per-person budget. Everything here is an indicative
                idea range — never a quotation.
              </p>
            </div>
          </div>

          <div className="detail__tier-row" role="tablist" aria-label="Budget variations">
            {pkg.tiers.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === tierId}
                className={`detail__tier ${t.id === tierId ? "is-active" : ""}`}
                onClick={() => setTierId(t.id)}
              >
                <span className="detail__tier-name">{t.label}</span>
                <span className="detail__tier-price">
                  RM{t.min}–RM{t.max}
                </span>
                <span className="detail__tier-note">{t.note}</span>
              </button>
            ))}
          </div>

          <div className="detail__contents" key={tier.id}>
            <div className="detail__contents-head">
              <h3>{tier.label} build</h3>
              <span className="tag tag--jade">
                RM{tier.min}–RM{tier.max} / person
              </span>
            </div>

            <ul className="detail__items">
              {items.map((it, i) => (
                <li key={it.id} style={{ ["--delay" as string]: `${i * 55}ms` }}>
                  <div className="detail__item-main">
                    <strong>{it.name}</strong>
                    <span className="detail__item-cat">{it.category}</span>
                    <p>{it.description}</p>
                    <ul className="detail__item-tags">
                      {it.tags.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <dl className="detail__item-spec">
                    <div>
                      <dt>Est. range</dt>
                      <dd>
                        RM{it.priceMin}–RM{it.priceMax}
                      </dd>
                    </div>
                    <div>
                      <dt>Min. qty</dt>
                      <dd>{it.moq}</dd>
                    </div>
                    <div>
                      <dt>Lead time</dt>
                      <dd>~{it.leadTimeDays} days</dd>
                    </div>
                    <div>
                      <dt>Customisable</dt>
                      <dd>{it.customisable ? "Yes" : "As supplied"}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>

            <p className="detail__disclaimer">
              <Icon name="shield" size={15} />
              Final pricing depends on quantity, customisation, availability and delivery
              requirements. Our team confirms every line before quoting.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Why it works + AI customise ---- */}
      <section className="section section-dark detail__why">
        <div className="shell detail__why-inner">
          <div>
            <span className="eyebrow">Why it works</span>
            <p className="detail__why-text">{pkg.whyItWorks}</p>
          </div>
          <div className="detail__ai-card">
            <span className="detail__ai-mark" aria-hidden="true">
              ✦
            </span>
            <h3>Not quite right for your event?</h3>
            <p>
              Ask GoodieAI to rework this concept around your audience, quantity and budget. It keeps
              what makes the idea work and changes the rest.
            </p>
            <button className="btn btn--light btn--lg" onClick={customise}>
              <span aria-hidden="true">✨</span> Ask AI to customise this idea
            </button>
          </div>
        </div>
      </section>

      {/* ---- Related ---- */}
      <section className="section detail__related">
        <div className="shell">
          <div className="sec-head">
            <div className="sec-head__text">
              <span className="eyebrow">Nearby thinking</span>
              <h2>People who liked this also considered</h2>
            </div>
          </div>
          <div className="detail__related-grid">
            {related.map((p, i) => (
              <ConceptCard key={p.id} pkg={p} variant="wall" index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
