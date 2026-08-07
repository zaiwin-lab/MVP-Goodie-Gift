import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../state/store";
import { PACKAGES_BY_ID } from "../data/packages";
import type { QuotationContact, QuotationRequest } from "../types";
import { Icon } from "./ui/Icon";
import { ConceptArt } from "./ConceptCard";
import "./QuotationModal.css";

const EMPTY: QuotationContact = {
  name: "",
  organisation: "",
  whatsapp: "",
  email: "",
  requiredDate: "",
  quantity: "",
  notes: "",
};

type Errors = Partial<Record<keyof QuotationContact, string>>;

function validate(c: QuotationContact): Errors {
  const e: Errors = {};
  if (!c.name.trim()) e.name = "We need a name to address the quotation to.";
  if (!c.organisation.trim()) e.organisation = "Which organisation is this for?";
  if (!c.whatsapp.trim() && !c.email.trim()) {
    e.whatsapp = "Give us one way to reach you — WhatsApp or email.";
  }
  if (c.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) {
    e.email = "That email doesn't look right.";
  }
  if (c.whatsapp.trim() && !/^[+\d][\d\s-]{6,}$/.test(c.whatsapp.trim())) {
    e.whatsapp = "Use a number we can WhatsApp, e.g. 012-345 6789.";
  }
  return e;
}

export function QuotationModal() {
  const { quote, closeQuote, submitQuote, brief, saved } = useStore();
  const [contact, setContact] = useState<QuotationContact>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<QuotationRequest | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const open = quote !== null;

  // Leaving the page the request was started from closes it — an orphaned
  // dialog over a different route has lost the context it was quoting.
  useEffect(() => {
    closeQuote();
  }, [pathname, closeQuote]);

  useEffect(() => {
    if (!open) return;
    setDone(null);
    setErrors({});
    setContact((c) => ({
      ...c,
      quantity: c.quantity || (brief?.pax ? String(brief.pax) : ""),
    }));
    const t = window.setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 220);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open, brief?.pax]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuote();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeQuote]);

  if (!open) return null;

  const pkg = quote?.conceptId ? PACKAGES_BY_ID[quote.conceptId] : undefined;

  const set = (k: keyof QuotationContact) => (v: string) => {
    setContact((c) => ({ ...c, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(contact);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    // Stands in for the backend write. Same payload shape either way.
    window.setTimeout(() => {
      setDone(submitQuote(contact));
      setSending(false);
    }, 900);
  };

  const carried = [
    quote?.conceptName && { k: "Concept", v: quote.conceptName },
    quote?.estimate && {
      k: "Estimated range",
      v: `RM${quote.estimate.min}–RM${quote.estimate.max} / person`,
    },
    brief?.pax && { k: "Approx. quantity", v: brief.pax.toLocaleString("en-MY") },
    brief?.budgetPerPax && { k: "Budget", v: `≈ RM${Math.round(brief.budgetPerPax)} / person` },
    brief?.location && { k: "Location", v: brief.location },
    brief?.dateText && { k: "Event date", v: brief.dateText },
    saved.length > 0 && { k: "Saved ideas", v: `${saved.length} concept${saved.length > 1 ? "s" : ""}` },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div className="quote-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeQuote()}>
      <div
        className="quote"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        ref={dialogRef}
      >
        <button className="quote__close" onClick={closeQuote} aria-label="Close">
          <Icon name="close" size={18} />
        </button>

        {done ? (
          <div className="quote__success">
            <div className="quote__tick" aria-hidden="true">
              <svg viewBox="0 0 52 52" width="64" height="64">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27l8 8 15-16" />
              </svg>
            </div>
            <h2 id="quote-title">Request received.</h2>
            <p className="quote__success-lead">
              Thank you, {done.contact.name.split(" ")[0]}. Your reference is{" "}
              <strong>{done.id}</strong>.
            </p>
            <p className="quote__success-body">
              Our team will verify availability, customisation options and final pricing, then come
              back to you — usually within one working day. Nothing is charged and nothing is
              committed.
            </p>
            <div className="quote__success-status">
              <span className="quote__status-pill">{done.status}</span>
              <span>Next: sourcing check → quotation preparing → quotation sent</span>
            </div>
            <div className="quote__success-actions">
              <button className="btn btn--primary" onClick={closeQuote}>
                Back to ideas
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="quote__head">
              <span className="eyebrow">Free quotation</span>
              <h2 id="quote-title">
                {pkg ? `Let's price the ${pkg.name}.` : "Let us quote it for you — free."}
              </h2>
              <p>
                No obligation. Our team will verify availability, customisation options and final
                pricing before preparing your quotation.
              </p>
            </header>

            {(pkg || carried.length > 0) && (
              <div className="quote__carried">
                {pkg && (
                  <div className="quote__concept">
                    <ConceptArt pkg={pkg} />
                    <div>
                      <strong>{pkg.name}</strong>
                      <span>{pkg.tagline}</span>
                    </div>
                  </div>
                )}
                {carried.length > 0 && (
                  <dl className="quote__facts">
                    {carried.map((c) => (
                      <div key={c.k}>
                        <dt>{c.k}</dt>
                        <dd>{c.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="quote__carried-note">
                  <Icon name="check" size={13} /> Carried over from your conversation — no need to
                  retype it.
                </p>
              </div>
            )}

            <form className="quote__form" onSubmit={onSubmit} noValidate>
              <div className="quote__row">
                <Field label="Name" required error={errors.name}>
                  <input value={contact.name} onChange={(e) => set("name")(e.target.value)} />
                </Field>
                <Field label="Organisation" required error={errors.organisation}>
                  <input
                    value={contact.organisation}
                    onChange={(e) => set("organisation")(e.target.value)}
                  />
                </Field>
              </div>

              <div className="quote__row">
                <Field label="WhatsApp" error={errors.whatsapp} hint="012-345 6789">
                  <input
                    type="tel"
                    value={contact.whatsapp}
                    onChange={(e) => set("whatsapp")(e.target.value)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </Field>
              </div>

              <div className="quote__row">
                <Field label="Required date" hint="When you need them in hand">
                  <input
                    type="date"
                    value={contact.requiredDate}
                    onChange={(e) => set("requiredDate")(e.target.value)}
                  />
                </Field>
                <Field label="Quantity" hint="Approximate is fine">
                  <input
                    inputMode="numeric"
                    value={contact.quantity}
                    onChange={(e) => set("quantity")(e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Notes" hint="Optional — branding, colours, delivery, anything specific">
                <textarea
                  rows={3}
                  value={contact.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                />
              </Field>

              <button className="btn btn--primary btn--lg btn--block" disabled={sending}>
                {sending ? "Sending…" : "Get My FREE Quotation"}
              </button>

              <p className="quote__trust">
                <Icon name="shield" size={15} />
                AI suggests. Humans verify. You decide.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
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
    <label className={`field ${error ? "field--error" : ""}`}>
      <span className="field__label">
        {label}
        {required && <em aria-hidden="true">*</em>}
      </span>
      {children}
      {error ? (
        <span className="field__msg field__msg--error">{error}</span>
      ) : hint ? (
        <span className="field__msg">{hint}</span>
      ) : null}
    </label>
  );
}
