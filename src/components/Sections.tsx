import { useState } from "react";
import { Link } from "react-router-dom";
import { ORGANISATIONS } from "../data/taxonomy";
import { TRUST_STATS } from "../data/prompts";
import { useStore } from "../state/store";
import { Composer } from "./Composer";
import { Icon, type IconName } from "./ui/Icon";
import "./Sections.css";

/* ---- 01. How it works ---------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    title: "Tell us about your event",
    body: "Write naturally. No forms, no fields, no login.",
  },
  {
    n: "02",
    title: "Get AI ideas",
    body: "GoodieAI generates recommendations based on your audience, budget and programme.",
  },
  {
    n: "03",
    title: "Refine your favourites",
    body: "Make them cheaper, premium, local, sustainable or more creative.",
  },
  {
    n: "04",
    title: "Get free quotation",
    body: "Our human team checks sourcing, availability, customisation and actual pricing.",
  },
];

export function HowItWorks() {
  return (
    <section className="section how" id="how-it-works">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">How it works</span>
            <h2>Four steps. No forms until the end.</h2>
          </div>
        </div>

        <ol className="how__grid">
          {STEPS.map((s, i) => (
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

/* ---- 02. Sarawak advantage ----------------------------------------------- */

const SARAWAK_LAYERS = [
  "Local crafts from longhouse collectives",
  "Sarawak-made food with real provenance",
  "Motifs reinterpreted by local designers",
  "Products from local SMEs and home enterprises",
  "Cultural elements that survive an airport",
  "Community-sourced sustainable materials",
];

export function SarawakAdvantage() {
  const { ask } = useStore();

  return (
    <section className="section sarawak">
      <div className="shell sarawak__inner">
        <div className="sarawak__text">
          <span className="eyebrow">The Sarawak layer</span>
          <h2>
            Make It <span className="sarawak__em">Sarawak</span>.
          </h2>
          <p>
            Local identity is an option you switch on — not a costume the whole gift has to wear. Ask
            GoodieAI to add a Sarawak touch and it re-sources the concept around local makers,
            materials and design.
          </p>

          <ul className="sarawak__list">
            {SARAWAK_LAYERS.map((l, i) => (
              <li key={l} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}>
                <Icon name="check" size={15} />
                {l}
              </li>
            ))}
          </ul>

          <button
            className="btn btn--primary btn--lg"
            onClick={() =>
              ask(
                "Recommend goodies with a strong Sarawak identity — local makers, local materials and local design, for an event of about 200 people at around RM60 each.",
              )
            }
          >
            <span aria-hidden="true">✨</span> Add Sarawak Touch
          </button>
        </div>

        <div className="sarawak__art" aria-hidden="true">
          <div className="sarawak__ring sarawak__ring--1" />
          <div className="sarawak__ring sarawak__ring--2" />
          <div className="sarawak__ring sarawak__ring--3" />
          <span className="sarawak__glyph">❋</span>
        </div>
      </div>
    </section>
  );
}

/* ---- 03. Organisations --------------------------------------------------- */

export function Organisations() {
  return (
    <section className="section section-tint orgs" id="organisations">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__text">
            <span className="eyebrow">Who this is for</span>
            <h2>Built for people who organise things.</h2>
            <p>
              Different constraints, same question. We shape the answer — and the paperwork — around
              yours.
            </p>
          </div>
        </div>

        <ul className="orgs__grid">
          {ORGANISATIONS.map((o, i) => (
            <li
              key={o.name}
              className="org card card--lift reveal"
              style={{ ["--reveal-delay" as string]: `${i * 45}ms` }}
            >
              <span className="org__icon">
                <Icon name={o.icon as IconName} size={18} />
              </span>
              <h3>{o.name}</h3>
              <p>{o.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- 04. Price positioning ----------------------------------------------- */

export function PricePositioning() {
  return (
    <section className="section section-dark price">
      <div className="shell price__inner">
        <div className="price__range" aria-hidden="true">
          <span>RM3</span>
          <span className="price__arrow">→</span>
          <span>RM300+</span>
        </div>
        <p className="price__lead">
          From mass-event freebies to premium VIP appreciation gifts.
        </p>
        <p className="price__sub">
          We help you find ideas appropriate to your audience, budget, purpose, event and brand.
        </p>

        <ul className="price__axes">
          {["Audience", "Budget", "Purpose", "Event", "Brand"].map((a, i) => (
            <li key={a} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- 05. Philosophy / About ---------------------------------------------- */

export function About() {
  return (
    <section className="section about" id="about">
      <div className="shell about__inner">
        <div className="about__quote">
          <span className="eyebrow">Our philosophy</span>
          <blockquote>
            We don't just sell goodies.
            <br />
            <span>We help you discover what is worth giving.</span>
          </blockquote>
          <p>
            Nobody remembers another generic pen. People remember thoughtful gifts — the ones that
            get used, talked about, and quietly keep your organisation in the room long after the
            event ends. GoodieAI optimises for value, not price.
          </p>
        </div>

        <ul className="about__pillars">
          {[
            { t: "Usefulness", d: "It survives past the first week." },
            { t: "Memory", d: "It gets associated with your programme." },
            { t: "Conversation", d: "Someone asks where it came from." },
            { t: "Appreciation", d: "The recipient feels considered, not processed." },
          ].map((p, i) => (
            <li key={p.t} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- 06. Trust ----------------------------------------------------------- */

export function Trust() {
  return (
    <section className="section section-tint trust">
      <div className="shell">
        <div className="trust__head">
          <span className="eyebrow">Track record</span>
          <span className="trust__flag">Sample figures — prototype</span>
        </div>

        <ul className="trust__stats">
          {TRUST_STATS.map((s, i) => (
            <li key={s.label} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="trust__logos">
          <span className="trust__logos-label">Client logos will appear here</span>
          <div className="trust__logo-row">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="trust__logo" aria-hidden="true" />
            ))}
          </div>
        </div>

        <div className="trust__promise">
          <Icon name="shield" size={20} />
          <p>
            <strong>AI suggests. Humans verify. You decide.</strong> Every estimate on this site is
            an indicative idea range. Our team confirms specification, stock, customisation and final
            pricing before any quotation is issued.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- 07. Closing CTA ----------------------------------------------------- */

export function FooterCTA() {
  const { ask, openQuote, phase } = useStore();
  const [draft, setDraft] = useState("");

  return (
    <section className="section footer-cta">
      <div className="shell footer-cta__inner">
        <h2>
          Your next event deserves
          <br />
          <span>something worth remembering.</span>
        </h2>
        <p>Tell GoodieAI what you're planning.</p>

        <div className="footer-cta__composer">
          <Composer
            value={draft}
            onChange={setDraft}
            onSubmit={(v) => {
              ask(v);
              document.getElementById("ai-finder")?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="compact"
            busy={phase === "thinking"}
            ctaLabel="Find My Goodie Ideas"
          />
        </div>

        <p className="footer-cta__or">
          or{" "}
          <button onClick={() => openQuote()} className="footer-cta__link">
            Get a Free Quotation
          </button>
        </p>
      </div>
    </section>
  );
}

/* ---- 08. Footer ---------------------------------------------------------- */

export function Footer() {
  const { openQuote } = useStore();

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <span className="brand__word">
            GOODIE<span className="brand__dot">.</span>AI
          </span>
          <p>Tell us about your event. AI finds the right goodies.</p>
          <p className="footer__place">Kuching, Sarawak · Malaysia</p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          <div>
            <h3>Product</h3>
            <a href="#ai-finder">AI Gift Finder</a>
            <a href="#ideas">Idea Wall</a>
            <a href="#collections">Collections</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#about">About</a>
            <a href="#organisations">For Organisations</a>
            <button onClick={() => openQuote()}>Free Quotation</button>
          </div>
          <div>
            <h3>Ideas</h3>
            <Link to="/idea/premium-sarawak-box">Premium Sarawak Box</Link>
            <Link to="/idea/eco-impact-pack">Eco Impact Pack</Link>
            <Link to="/idea/please-not-another-mug">Not Another Mug</Link>
          </div>
        </nav>
      </div>

      <div className="shell footer__legal">
        <p>© {new Date().getFullYear()} GOODIE.AI — working brand, prototype build.</p>
        <p>
          All prices shown are indicative idea ranges, not quotations. Sample statistics and trending
          data are illustrative.
        </p>
      </div>
    </footer>
  );
}
