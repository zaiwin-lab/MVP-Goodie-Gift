import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { BudgetId, Contact, EventAnswers, Idea, QuoteRecord } from "../types";
import {
  BUDGETS,
  PAX_OPTIONS,
  THINKING_LINES,
  WHEN_OPTIONS,
  WHERE_OPTIONS,
} from "../data/content";
import { suggestIdeas, reasonFor } from "../lib/match";
import { useCycle, useScrollLock } from "../lib/hooks";
import { IdeaCard } from "./IdeaCard";
import "./Journey.css";

/* ==========================================================================
   The whole conversion journey in one fluid surface.

   EXPLORE → PERSONALISE (one question at a time) → SUGGEST → FREE QUOTATION
   Never more than a single question on screen, and nothing is ever asked twice.
   ========================================================================== */

type Step =
  | "detail"
  | "event"
  | "pax"
  | "budget"
  | "when"
  | "where"
  | "thinking"
  | "suggestions"
  | "form"
  | "done";

const QUESTION_STEPS: Step[] = ["event", "pax", "budget", "when", "where"];

const EMPTY_ANSWERS: EventAnswers = { event: "", pax: "", budget: "", when: "", where: "" };
const EMPTY_CONTACT: Contact = { name: "", organisation: "", whatsapp: "", email: "" };

interface Props {
  /** The idea that was opened, or null when the journey starts from a CTA. */
  idea: Idea | null;
  /** True when opened straight from a "free quotation" button. */
  quoteFirst: boolean;
  onClose(): void;
}

export function Journey({ idea, quoteFirst, onClose }: Props) {
  const [step, setStep] = useState<Step>(idea ? "detail" : "event");
  const [answers, setAnswers] = useState<EventAnswers>(EMPTY_ANSWERS);
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [sending, setSending] = useState(false);
  const [record, setRecord] = useState<QuoteRecord | null>(null);
  const [chosen, setChosen] = useState<Idea | null>(idea);

  const panelRef = useRef<HTMLDivElement>(null);
  const thinkingIndex = useCycle(THINKING_LINES.length, step === "thinking", 620);

  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Each step starts at the top of the panel, focused where the user must act.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 260);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== "thinking") return;
    const t = window.setTimeout(() => setStep("suggestions"), THINKING_LINES.length * 620 + 260);
    return () => window.clearTimeout(t);
  }, [step]);

  const suggestions = useMemo(
    () => (step === "suggestions" ? suggestIdeas(answers) : []),
    [step, answers],
  );

  // The top suggestion is the personalised answer, so it leads by default —
  // otherwise the recap would name the card they opened, not the one we matched.
  useEffect(() => {
    if (step === "suggestions" && suggestions.length) setChosen(suggestions[0]);
  }, [step, suggestions]);

  const set = <K extends keyof EventAnswers>(key: K, value: EventAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const next = (from: Step) => {
    const i = QUESTION_STEPS.indexOf(from);
    setStep(i === QUESTION_STEPS.length - 1 ? "thinking" : QUESTION_STEPS[i + 1]);
  };

  const back = () => {
    if (step === "form") return setStep(quoteFirst ? "where" : "suggestions");
    if (step === "suggestions") return setStep("where");
    const i = QUESTION_STEPS.indexOf(step);
    if (i > 0) return setStep(QUESTION_STEPS[i - 1]);
    if (i === 0 && idea) return setStep("detail");
  };

  const submitQuote = (e: FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<keyof Contact, string>> = {};
    if (!contact.name.trim()) found.name = "We need a name for the quotation.";
    if (!contact.organisation.trim()) found.organisation = "Which organisation is this for?";
    if (!contact.whatsapp.trim() && !contact.email.trim()) {
      found.whatsapp = "Give us one way to reach you — WhatsApp or email.";
    }
    if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) {
      found.email = "That email doesn't look right.";
    }
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    window.setTimeout(() => {
      setRecord({
        ref: `GQ-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        createdAt: new Date().toISOString(),
        contact,
        answers,
        ideaId: chosen?.id,
        ideaName: chosen?.name,
      });
      setSending(false);
      setStep("done");
    }, 950);
  };

  const questionIndex = QUESTION_STEPS.indexOf(step);
  const showProgress = questionIndex >= 0;

  return (
    <div
      className="jr-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`jr jr--c${chosen?.colour ?? 2}`}
        role="dialog"
        aria-modal="true"
        aria-label={chosen ? chosen.name : "Get a free quotation"}
        ref={panelRef}
      >
        <div className="jr__bar">
          {step !== "detail" && step !== "done" && (
            <button className="jr__back" onClick={back}>
              ← Back
            </button>
          )}
          <button className="jr__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {showProgress && (
          <div className="jr__progress" aria-hidden="true">
            {QUESTION_STEPS.map((s, i) => (
              <span key={s} className={i <= questionIndex ? "is-done" : ""} />
            ))}
          </div>
        )}

        {/* ---------- Expanded idea ---------- */}
        {step === "detail" && chosen && (
          <div className="jr__body jr__enter">
            <span className="jr__label">{chosen.label}</span>
            <h2 className="jr__title">{chosen.name}</h2>
            <p className="jr__story">{chosen.story}</p>

            <div className="jr__cols">
              <div>
                <h3 className="jr__minor">Possible contents</h3>
                <ul className="jr__list">
                  {chosen.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="jr__minor">Best for</h3>
                <ul className="jr__pills">
                  {chosen.bestFor.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="jr__estimate">
                  <span>Estimated</span>
                  <strong>{chosen.price}</strong>
                  <em>Final pricing depends on quantity, customisation and delivery.</em>
                </div>
              </div>
            </div>

            <div className="jr__ask">
              <h3>Planning Something Similar?</h3>
              <p>Tell us about your event and we'll adapt this idea for you.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (answers.event.trim()) next("event");
                }}
              >
                <div className="jr__field-lead">We're organising a…</div>
                <textarea
                  data-autofocus
                  className="jr__input"
                  rows={2}
                  value={answers.event}
                  placeholder="We have an official government launching in Kuching for 80 VIP guests…"
                  onChange={(e) => set("event", e.target.value)}
                />
                <button className="btn btn--brand btn--lg btn--block" disabled={!answers.event.trim()}>
                  <span aria-hidden="true">✨</span> Personalise this idea
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------- Question 1: the event ---------- */}
        {step === "event" && (
          <Question
            kicker="One minute, five questions"
            title="What's the event?"
            hint="Write it however you'd say it out loud."
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (answers.event.trim()) next("event");
              }}
            >
              <div className="jr__field-lead">We're organising a…</div>
              <textarea
                data-autofocus
                className="jr__input"
                rows={2}
                value={answers.event}
                placeholder="We have an official government launching in Kuching for 80 VIP guests…"
                onChange={(e) => set("event", e.target.value)}
              />
              <button className="btn btn--brand btn--lg btn--block" disabled={!answers.event.trim()}>
                Continue
              </button>
            </form>
          </Question>
        )}

        {/* ---------- Question 2: quantity ---------- */}
        {step === "pax" && (
          <Question title="Roughly how many people?" hint="An estimate is completely fine.">
            <Choices
              options={PAX_OPTIONS}
              value={answers.pax}
              onPick={(v) => {
                set("pax", v);
                next("pax");
              }}
            />
          </Question>
        )}

        {/* ---------- Question 3: budget ---------- */}
        {step === "budget" && (
          <Question
            title="What budget are you thinking?"
            hint="Per person. We'll work within it, not around it."
          >
            <Choices
              options={BUDGETS.map((b) => b.label)}
              value={BUDGETS.find((b) => b.id === answers.budget)?.label ?? ""}
              onPick={(label) => {
                const found = BUDGETS.find((b) => b.label === label);
                set("budget", (found?.id ?? "unsure") as BudgetId);
                next("budget");
              }}
            />
          </Question>
        )}

        {/* ---------- Question 4: date ---------- */}
        {step === "when" && (
          <Question title="When is your event?" hint="Lead time changes what's possible.">
            <Choices
              options={WHEN_OPTIONS}
              value={answers.when}
              onPick={(v) => {
                set("when", v);
                next("when");
              }}
            />
          </Question>
        )}

        {/* ---------- Question 5: place ---------- */}
        {step === "where" && (
          <Question title="Where is it happening?" hint="So we can plan delivery properly.">
            <Choices
              options={WHERE_OPTIONS}
              value={answers.where}
              onPick={(v) => {
                set("where", v);
                next("where");
              }}
            />
          </Question>
        )}

        {/* ---------- Processing ---------- */}
        {step === "thinking" && (
          <div className="jr__body jr__thinking" role="status" aria-live="polite">
            <div className="jr__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="jr__thinking-line" key={thinkingIndex}>
              {THINKING_LINES[thinkingIndex]}
            </p>
            <div className="jr__ghosts" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* ---------- Suggestions ---------- */}
        {step === "suggestions" && (
          <div className="jr__body jr__enter">
            <span className="jr__label">Your event</span>
            <h2 className="jr__title">
              Here's What We'd Suggest <span aria-hidden="true">✨</span>
            </h2>

            <ul className="jr__recap">
              {[answers.pax, BUDGETS.find((b) => b.id === answers.budget)?.label, answers.when, answers.where]
                .filter(Boolean)
                .map((v) => (
                  <li key={v as string}>{v}</li>
                ))}
            </ul>

            <div className="jr__suggestions">
              {suggestions.map((s, i) => (
                <div key={s.id} className="jr__suggestion">
                  <IdeaCard
                    idea={s}
                    index={i}
                    compact
                    selected={chosen?.id === s.id}
                    onOpen={() => setChosen(s)}
                  />
                  <p className={`jr__reason ${chosen?.id === s.id ? "is-chosen" : ""}`}>
                    {reasonFor(s, answers)}
                  </p>
                </div>
              ))}
            </div>

            <div className="jr__close-deal">
              <h3>
                Like What You See?
                <br />
                Let Us Price It Properly.
              </h3>
              <p>
                No obligation. Tell us where to send it and our team will work out the options.
              </p>
              <button className="btn btn--brand btn--lg" onClick={() => setStep("form")}>
                Get my FREE quotation <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------- Quotation form ---------- */}
        {step === "form" && (
          <div className="jr__body jr__enter">
            <span className="jr__label">Free quotation</span>
            <h2 className="jr__title">Where should we send it?</h2>
            <p className="jr__story">
              Just four details. We already have everything else from your answers.
            </p>

            <Recap answers={answers} idea={chosen} />

            <form className="jr__form" onSubmit={submitQuote} noValidate>
              <div className="jr__row">
                <Field label="Name" required error={errors.name}>
                  <input
                    data-autofocus
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  />
                </Field>
                <Field label="Organisation" required error={errors.organisation}>
                  <input
                    value={contact.organisation}
                    onChange={(e) => setContact((c) => ({ ...c, organisation: e.target.value }))}
                  />
                </Field>
              </div>
              <div className="jr__row">
                <Field label="WhatsApp" hint="012-345 6789" error={errors.whatsapp}>
                  <input
                    type="tel"
                    value={contact.whatsapp}
                    onChange={(e) => setContact((c) => ({ ...c, whatsapp: e.target.value }))}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  />
                </Field>
              </div>

              <button className="btn btn--brand btn--lg btn--block" disabled={sending}>
                {sending ? "Sending…" : "Get my FREE quotation"}
              </button>
              <p className="jr__trust">Smart technology suggests. Real people verify.</p>
            </form>
          </div>
        )}

        {/* ---------- Success ---------- */}
        {step === "done" && record && (
          <div className="jr__body jr__success">
            <div className="jr__confetti" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} style={{ ["--i" as string]: i }} />
              ))}
            </div>

            <span className="jr__tick" aria-hidden="true">
              🎉
            </span>
            <h2 className="jr__title">We've Got It!</h2>
            <p className="jr__story">
              Thanks {record.contact.name.split(" ")[0]}. Your reference is{" "}
              <strong>{record.ref}</strong>.
            </p>
            <p className="jr__success-body">
              Our team will review your event, sourcing options and customisation requirements
              before preparing your quotation.
            </p>

            <Recap answers={record.answers} idea={chosen} />

            <p className="jr__trust">Smart technology suggests. Real people verify.</p>
            <button className="btn btn--ghost btn--lg" onClick={onClose}>
              Back to the ideas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Small building blocks ----------------------------------------------- */

function Question({
  kicker,
  title,
  hint,
  children,
}: {
  kicker?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="jr__body jr__question jr__enter">
      {kicker && <span className="jr__label">{kicker}</span>}
      <h2 className="jr__title">{title}</h2>
      {hint && <p className="jr__hint">{hint}</p>}
      <div className="jr__question-body">{children}</div>
    </div>
  );
}

function Choices({
  options,
  value,
  onPick,
}: {
  options: string[];
  value: string;
  onPick(v: string): void;
}) {
  return (
    <div className="jr__choices">
      {options.map((o, i) => (
        <button
          key={o}
          className="jr__choice"
          aria-pressed={value === o}
          style={{ ["--i" as string]: i }}
          onClick={() => onPick(o)}
          {...(i === 0 ? { "data-autofocus": true } : {})}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Recap({ answers, idea }: { answers: EventAnswers; idea: Idea | null }) {
  const rows = [
    idea && { k: "Idea", v: idea.name },
    answers.event && { k: "Event", v: answers.event },
    answers.pax && { k: "Quantity", v: answers.pax },
    answers.budget && { k: "Budget", v: BUDGETS.find((b) => b.id === answers.budget)?.label ?? "" },
    answers.when && { k: "Date", v: answers.when },
    answers.where && { k: "Location", v: answers.where },
  ].filter(Boolean) as { k: string; v: string }[];

  if (!rows.length) return null;

  return (
    <dl className="jr__recap-box">
      {rows.map((r) => (
        <div key={r.k}>
          <dt>{r.k}</dt>
          <dd>{r.v}</dd>
        </div>
      ))}
      <p className="jr__recap-note">✓ Carried over from your answers — no need to retype it.</p>
    </dl>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`jr__field ${error ? "is-error" : ""}`}>
      <span>
        {label}
        {required && <em aria-hidden="true"> *</em>}
      </span>
      {children}
      {error ? <small className="is-error">{error}</small> : hint ? <small>{hint}</small> : null}
    </label>
  );
}
