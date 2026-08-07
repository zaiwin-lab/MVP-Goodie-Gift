import { useEffect, useRef } from "react";
import { useStore } from "../state/store";
import { REFINEMENTS, THINKING_STAGES } from "../data/taxonomy";
import { describeBrief } from "../engine/parse";
import { ConceptCard } from "./ConceptCard";
import { Icon } from "./ui/Icon";
import type { BudgetBandId } from "../types";
import "./Conversation.css";

export function Conversation() {
  const {
    phase,
    brief,
    results,
    stageIndex,
    aiMessage,
    followUp,
    refine,
    answerBudget,
    answerPax,
    reset,
    openQuote,
  } = useStore();

  const ref = useRef<HTMLDivElement>(null);
  const announced = useRef(0);

  useEffect(() => {
    if (phase === "results" && results.length && announced.current !== results.length) {
      announced.current = results.length;
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [phase, results.length]);

  if (phase === "idle") return null;

  const understood = brief ? describeBrief(brief) : [];

  return (
    <div className="convo" ref={ref}>
      {/* ---- Thinking ---- */}
      {phase === "thinking" && (
        <div className="convo__thinking" role="status" aria-live="polite">
          <div className="convo__orb" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <ul className="convo__stages">
            {THINKING_STAGES.map((s, i) => (
              <li
                key={s}
                className={i === stageIndex ? "is-current" : i < stageIndex ? "is-done" : ""}
              >
                {i < stageIndex ? <Icon name="check" size={14} /> : <span className="convo__dot" />}
                {s}
              </li>
            ))}
          </ul>
          <div className="convo__skeletons" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="convo__skeleton" style={{ animationDelay: `${i * 160}ms` }} />
            ))}
          </div>
        </div>
      )}

      {/* ---- Follow-up question ---- */}
      {phase === "asking" && followUp && (
        <div className="convo__ask">
          <div className="convo__bubble">
            <span className="convo__who">
              <span className="convo__who-mark" aria-hidden="true">
                ✦
              </span>
              GoodieAI
            </span>
            <p>{aiMessage}</p>
          </div>

          {understood.length > 0 && (
            <ul className="convo__understood">
              {understood.map((u) => (
                <li key={u} className="tag">
                  {u}
                </li>
              ))}
            </ul>
          )}

          <div className="convo__chips">
            {followUp.options.map((o, i) => (
              <button
                key={o.id}
                className="chip convo__chip"
                style={{ animationDelay: `${i * 55}ms` }}
                onClick={() =>
                  followUp.kind === "budget"
                    ? answerBudget(o.id as BudgetBandId | "surprise")
                    : answerPax(o.id)
                }
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---- Results ---- */}
      {phase === "results" && results.length > 0 && (
        <div className="convo__results">
          <div className="convo__results-head">
            <div>
              <h2 className="convo__title">
                {aiMessage || "GoodieAI found some ideas"} <span aria-hidden="true">✨</span>
              </h2>
              {understood.length > 0 && (
                <ul className="convo__understood">
                  {understood.map((u) => (
                    <li key={u} className="tag">
                      {u}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="convo__restart" onClick={reset}>
              <Icon name="refresh" size={15} />
              Start over
            </button>
          </div>

          <div className="convo__grid">
            {results.map((r, i) => (
              <ConceptCard
                key={r.id}
                pkg={r.pkg}
                rec={r}
                index={i}
                onImprove={() => refine("creative")}
              />
            ))}
          </div>

          <div className="convo__refine">
            <p className="convo__refine-label">Not quite it? Tell me what to change.</p>
            <div className="convo__refine-row">
              {REFINEMENTS.map((r) => (
                <button key={r.id} className="chip convo__refine-chip" onClick={() => refine(r.id)}>
                  <span aria-hidden="true">{r.emoji}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="convo__foot">
            <p>
              <strong>AI suggests. Humans verify. You decide.</strong> Final pricing depends on
              quantity, customisation, availability and delivery requirements.
            </p>
            <button className="btn btn--primary" onClick={() => openQuote()}>
              Get My Free Quotation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
