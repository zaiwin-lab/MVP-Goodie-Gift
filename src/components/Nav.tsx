import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import "./Nav.css";

interface Props {
  onQuote(): void;
}

export function Nav({ onQuote }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary">
        <div className="shell nav__inner">
          <a
            href="#top"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
          >
            <span className="nav__mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="nav__word">
              GOODIE<span className="nav__dot">.</span>
            </span>
          </a>

          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="nav__actions">
            <button className="btn btn--brand nav__cta" onClick={onQuote}>
              Free quotation
            </button>
            <button
              className="nav__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={open ? "is-open" : ""} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="nav__sheet">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.href}
              style={{ animationDelay: `${i * 45}ms` }}
              onClick={() => go(l.href)}
            >
              {l.label}
              <span aria-hidden="true">→</span>
            </button>
          ))}
          <button
            className="btn btn--brand btn--lg btn--block nav__sheet-cta"
            onClick={() => {
              setOpen(false);
              onQuote();
            }}
          >
            Get free quotation
          </button>
        </div>
      )}
    </>
  );
}

/** Sticky mobile action bar — the quotation is never more than a thumb away. */
export function MobileBar({ onQuote, onExplore }: { onQuote(): void; onExplore(): void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 460);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mbar ${show ? "is-visible" : ""}`}>
      <button className="mbar__ideas" onClick={onExplore}>
        <span aria-hidden="true">✨</span> Ideas
      </button>
      <button className="mbar__quote" onClick={onQuote}>
        Free quotation →
      </button>
    </div>
  );
}
