import { useMemo, useState } from "react";
import { PACKAGES } from "../data/packages";
import { IDEA_FILTERS } from "../data/taxonomy";
import { useStore } from "../state/store";
import { ConceptCard } from "./ConceptCard";
import { Icon } from "./ui/Icon";
import "./IdeaWall.css";

export function IdeaWall() {
  const [active, setActive] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved } = useStore();

  const shown = useMemo(() => {
    let list = PACKAGES;
    if (active.length) list = list.filter((p) => active.every((f) => p.filters.includes(f)));
    if (onlySaved) list = list.filter((p) => saved.includes(p.id));
    return list;
  }, [active, onlySaved, saved]);

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const clear = () => {
    setActive([]);
    setOnlySaved(false);
  };

  return (
    <section className="section wall" id="ideas">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">Idea wall</span>
            <h2>Explore Goodie Ideas</h2>
            <p>Sometimes you just need a little inspiration.</p>
          </div>
          <p className="wall__count">
            <strong>{shown.length}</strong> concept{shown.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="wall__filters" role="group" aria-label="Filter ideas">
          <div className="wall__filter-rail">
            {IDEA_FILTERS.map((f) => (
              <button
                key={f.id}
                className={`chip wall__filter ${f.group === "budget" ? "wall__filter--budget" : ""}`}
                aria-pressed={active.includes(f.id)}
                onClick={() => toggle(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="wall__filter-actions">
            {saved.length > 0 && (
              <button
                className="chip wall__filter wall__filter--saved"
                aria-pressed={onlySaved}
                onClick={() => setOnlySaved((s) => !s)}
              >
                <Icon name={onlySaved ? "heart-fill" : "heart"} size={14} />
                Saved ({saved.length})
              </button>
            )}
            {(active.length > 0 || onlySaved) && (
              <button className="wall__clear" onClick={clear}>
                <Icon name="close" size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {shown.length > 0 ? (
          <div className="wall__grid">
            {shown.map((p, i) => (
              <ConceptCard key={p.id} pkg={p} variant="wall" index={i} />
            ))}
          </div>
        ) : (
          <div className="wall__empty">
            <span className="wall__empty-glyph" aria-hidden="true">
              ✦
            </span>
            <h3>No concept matches all of those at once.</h3>
            <p>
              Try removing a filter — or just describe the event and let GoodieAI build something
              that does.
            </p>
            <button className="btn btn--ghost" onClick={clear}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
