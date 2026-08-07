import type { Idea } from "../types";
import "./IdeaCard.css";

interface Props {
  idea: Idea;
  index: number;
  onOpen(): void;
  /** Compact variant used in the suggestion step. */
  compact?: boolean;
  /** Compact cards pick rather than explore, so the CTA changes meaning. */
  selected?: boolean;
}

export function IdeaCard({ idea, index, onOpen, compact = false, selected = false }: Props) {
  return (
    <button
      type="button"
      aria-pressed={compact ? selected : undefined}
      className={`icard icard--c${idea.colour} ${compact ? "icard--compact" : ""} ${
        selected ? "is-selected" : ""
      }`}
      style={{ ["--deal-delay" as string]: `${index * 65}ms` }}
      onClick={onOpen}
      aria-label={`${idea.name} — ${idea.label}. ${idea.description} Estimated ${idea.price}.`}
    >
      <span className="icard__glow" aria-hidden="true" />

      <span className="icard__label">{idea.label}</span>
      <span className="icard__name">{idea.name}</span>
      <span className="icard__desc">{idea.description}</span>

      <span className="icard__tags">
        {idea.tags.map((t) => (
          <span key={t} className="icard__tag">
            {t}
          </span>
        ))}
      </span>

      <span className="icard__foot">
        <span className="icard__price">
          <span className="icard__price-label">Estimated</span>
          {idea.price}
        </span>
        <span className="icard__cta">
          {compact ? (selected ? "Selected" : "Choose this") : "Explore idea"}
          <span className="icard__arrow" aria-hidden="true">
            {compact ? (selected ? "✓" : "→") : "↗"}
          </span>
        </span>
      </span>
    </button>
  );
}
