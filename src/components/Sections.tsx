import { useEffect, useRef, useState } from "react";
import {
  HOW_STEPS,
  ORGANISATIONS,
  QUOTE_NUDGES,
  SMART_FEATURES,
  USE_CASES,
} from "../data/content";
import "./Sections.css";

/* ---- Rotating headline statement ----------------------------------------- */

const STATEMENT_LINES = [
  ["Don't search", "through products."],
  ["Tell us", "about your event."],
  ["We'll find", "the possibilities."],
];

export function Statement() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  // Only cycle while on screen — an animation nobody can see is wasted work.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % STATEMENT_LINES.length), 2600);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <section className="section section--night stmt" ref={ref}>
      <div className="shell">
        <p className="stmt__count" aria-hidden="true">
          {String(i + 1).padStart(2, "0")} / 03
        </p>

        <h2 className="stmt__lines" key={i}>
          <span>{STATEMENT_LINES[i][0]}</span>
          <span className="stmt__accent">{STATEMENT_LINES[i][1]}</span>
        </h2>

        <p className="stmt__sub">A smarter way to plan event goodies.</p>

        <div className="stmt__ticks" aria-hidden="true">
          {STATEMENT_LINES.map((_, n) => (
            <span key={n} className={n === i ? "is-on" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- How it works -------------------------------------------------------- */

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="shell">
        <div className="sec-head">
          <span className="eyebrow">How it works</span>
          <h2>Explore first. Forms last.</h2>
          <p>Four steps, and you only give us details once you've found something you like.</p>
        </div>

        <ol className="how__grid">
          {HOW_STEPS.map((s, i) => (
            <li
              key={s.n}
              className="how__step reveal"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="how__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---- Free quotation nudges ----------------------------------------------- */

export function QuoteNudges({ onQuote }: { onQuote(): void }) {
  return (
    <section className="section section--tint nudge">
      <div className="shell">
        <ul className="nudge__grid">
          {QUOTE_NUDGES.map((n, i) => (
            <li
              key={n.q}
              className="nudge__item reveal"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className="nudge__q">{n.q}</span>
              <span className="nudge__a">{n.a}</span>
            </li>
          ))}
        </ul>

        <div className="nudge__cta">
          <p>Have an event coming? Start here.</p>
          <button className="btn btn--brand btn--lg" onClick={onQuote}>
            Get free quotation <span className="btn__arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---- Smart technology reveal --------------------------------------------- */

export function SmartTech() {
  return (
    <section className="section section--night smart" id="smart">
      <div className="shell">
        <div className="smart__head">
          <span className="eyebrow">The part behind the scenes</span>
          <h2>
            Wonder How We Keep Finding Ideas?
            <br />
            <span className="smart__em">There's Something Smart Behind It.</span>
          </h2>
          <p>
            Our Smart AI Solution helps analyse event requirements, audiences, budgets and gifting
            possibilities — turning thousands of possible combinations into ideas that actually make
            sense for your programme.
          </p>
          <span className="smart-badge smart__badge">
            <span className="smart-badge__spark" aria-hidden="true">
              ✦
            </span>
            Smart AI Powered
          </span>
        </div>

        <ul className="smart__bento">
          {SMART_FEATURES.map((f, i) => (
            <li
              key={f.title}
              className={`smart__cell reveal ${f.span ? `smart__cell--${f.span}` : ""}`}
              style={{ ["--reveal-delay" as string]: `${Math.min(i, 9) * 45}ms` }}
            >
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- Sarawak positioning ------------------------------------------------- */

export function Sarawak() {
  return (
    <section className="section sarawak">
      <div className="shell">
        <div className="sec-head">
          <span className="eyebrow">Where we work</span>
          <h2>Built for Sarawak Events.</h2>
          <p>
            From Kuching to Miri. Sibu to Bintulu. From 50 VIPs to 5,000 participants.
          </p>
        </div>

        <ul className="sarawak__cases">
          {USE_CASES.map((u, i) => (
            <li
              key={u}
              className="reveal"
              style={{ ["--reveal-delay" as string]: `${i * 40}ms` }}
            >
              {u}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- Price range --------------------------------------------------------- */

export function PriceRange() {
  return (
    <section className="section section--tint price">
      <div className="shell price__inner">
        <p className="price__range" aria-label="From RM3 to over RM300">
          <span>RM3</span>
          <span className="price__arrow" aria-hidden="true">
            →
          </span>
          <span className="price__high">RM300+</span>
        </p>
        <p className="price__lead">Mass-event freebies → Premium VIP gifts</p>
        <p className="price__sub">
          Different events. Different people. Different budgets. Better ideas.
        </p>
      </div>
    </section>
  );
}

/* ---- Organisations ------------------------------------------------------- */

export function Organisations() {
  return (
    <section className="section orgs" id="organisations">
      <div className="shell">
        <div className="sec-head">
          <span className="eyebrow">Who we work with</span>
          <h2>Built for people who organise things.</h2>
          <p>Different constraints, same question — what should we actually give?</p>
        </div>

        <ul className="orgs__grid">
          {ORGANISATIONS.map((o, i) => (
            <li
              key={o.name}
              className="orgs__card reveal"
              style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
            >
              <span className="orgs__dot" aria-hidden="true" />
              <h3>{o.name}</h3>
              <p>{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- Final CTA + footer -------------------------------------------------- */

export function FinalCTA({ onQuote, onExplore }: { onQuote(): void; onExplore(): void }) {
  return (
    <section className="section final">
      <div className="shell final__inner">
        <h2>
          Got An Event Coming?
          <br />
          <span>Let's Find Something Worth Giving.</span>
        </h2>

        <div className="final__actions">
          <button className="btn btn--ghost btn--lg" onClick={onExplore}>
            <span aria-hidden="true">✨</span> Show me more ideas
          </button>
          <button className="btn btn--brand btn--lg" onClick={onQuote}>
            Get free quotation <span className="btn__arrow">→</span>
          </button>
        </div>

        <p className="final__line">Smart ideas. Better choices. Free quotation.</p>

        <span className="smart-badge">
          <span className="smart-badge__spark" aria-hidden="true">
            ✦
          </span>
          Powered by Smart AI Solutions
        </span>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <span className="footer__brand">
          GOODIE<span className="footer__dot">.</span>
        </span>
        <p className="footer__note">
          Sarawak event goodies &amp; gifts · Kuching, Malaysia
        </p>
        <p className="footer__legal">
          © {new Date().getFullYear()} Goodie — working brand, V1 prototype. All prices shown are
          indicative estimates, not quotations.
        </p>
      </div>
    </footer>
  );
}
