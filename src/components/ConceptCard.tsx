import { Link } from "react-router-dom";
import type { GoodiePackage, Recommendation } from "../types";
import { getItems } from "../data/items";
import { useStore } from "../state/store";
import { Icon } from "./ui/Icon";
import "./ConceptCard.css";

interface Props {
  pkg: GoodiePackage;
  rec?: Recommendation;
  variant?: "result" | "wall";
  index?: number;
  onImprove?(pkg: GoodiePackage): void;
}

export function ConceptArt({ pkg, size = "md" }: { pkg: GoodiePackage; size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={`art art--${size}`}
      style={{
        ["--from" as string]: pkg.art.from,
        ["--to" as string]: pkg.art.to,
      }}
      aria-hidden="true"
    >
      <span className="art__glyph">{pkg.art.glyph}</span>
      <span className="art__grain" />
    </div>
  );
}

export function ConceptCard({ pkg, rec, variant = "result", index = 0, onImprove }: Props) {
  const { isSaved, toggleSave, openQuote } = useStore();
  const saved = isSaved(pkg.id);

  const items = rec?.items ?? getItems(pkg.itemIds).slice(0, 5);
  const min = rec?.estimate.min ?? pkg.priceMin;
  const max = rec?.estimate.max ?? pkg.priceMax;

  const quote = () =>
    openQuote({ conceptId: pkg.id, conceptName: pkg.name, estimate: { min, max } });

  if (variant === "wall") {
    return (
      <article
        className="concept concept--wall card card--lift reveal"
        style={{ ["--reveal-delay" as string]: `${Math.min(index, 8) * 45}ms` }}
      >
        <Link to={`/idea/${pkg.slug}`} className="concept__link">
          <ConceptArt pkg={pkg} size="sm" />
          <div className="concept__body">
            <h3 className="concept__name">{pkg.name}</h3>
            <p className="concept__tagline">{pkg.tagline}</p>

            <ul className="concept__items concept__items--compact">
              {items.slice(0, 4).map((it) => (
                <li key={it.id}>{it.name}</li>
              ))}
            </ul>

            <div className="concept__wall-foot">
              <span className="concept__best">Best for: {pkg.bestFor.slice(0, 2).join(" • ")}</span>
              <span className="concept__range-inline">
                RM{min}–RM{max}
              </span>
            </div>
          </div>
        </Link>

        <button
          className={`concept__heart ${saved ? "is-saved" : ""}`}
          onClick={() => toggleSave(pkg.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${pkg.name} from saved` : `Save ${pkg.name}`}
        >
          <Icon name={saved ? "heart-fill" : "heart"} size={17} />
        </button>
      </article>
    );
  }

  return (
    <article
      className="concept concept--result card"
      style={{ ["--delay" as string]: `${index * 90}ms` }}
    >
      <div className="concept__top">
        <ConceptArt pkg={pkg} />
        {rec && (
          <div className="concept__score" title="How well this matches your brief">
            <span className="concept__score-ring">
              <svg viewBox="0 0 36 36" width="46" height="46" aria-hidden="true">
                <circle cx="18" cy="18" r="15.5" className="concept__score-track" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  className="concept__score-arc"
                  style={{ strokeDasharray: `${(rec.score / 100) * 97.4} 97.4` }}
                />
              </svg>
              <span className="concept__score-num">{rec.score}</span>
            </span>
            <span className="concept__score-label">Goodie Score</span>
          </div>
        )}
      </div>

      <div className="concept__body">
        <h3 className="concept__name">
          <Link to={`/idea/${pkg.slug}`}>{pkg.name}</Link>
        </h3>
        <p className="concept__suitable">
          Suitable for: <strong>{pkg.bestFor.join(" • ")}</strong>
        </p>

        <div className="concept__block">
          <span className="concept__block-label">Possible contents</span>
          <ul className="concept__items">
            {items.map((it) => (
              <li key={it.id}>
                <Icon name="check" size={13} />
                {it.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="concept__estimate">
          <div className="concept__estimate-top">
            <span className="concept__block-label">Estimated idea range</span>
            {rec && <span className="tag tag--jade">{rec.tier.label}</span>}
          </div>
          <strong>
            RM{min}–RM{max}
            <em> / person</em>
          </strong>
        </div>

        <p className="concept__why">
          <span className="concept__why-label">Why it works</span>
          {rec?.why ?? pkg.whyItWorks}
        </p>

        <ul className="concept__tags">
          {pkg.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="concept__actions">
        <button
          className={`concept__action ${saved ? "is-saved" : ""}`}
          onClick={() => toggleSave(pkg.id)}
          aria-pressed={saved}
        >
          <Icon name={saved ? "heart-fill" : "heart"} size={16} />
          {saved ? "Saved" : "Save Idea"}
        </button>
        <button className="concept__action" onClick={() => onImprove?.(pkg)}>
          <span aria-hidden="true">✨</span>
          Make It Better
        </button>
        <button className="concept__action concept__action--primary" onClick={quote}>
          <Icon name="check" size={16} />
          Get Quotation
        </button>
      </div>
    </article>
  );
}
