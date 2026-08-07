import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import { Icon } from "./ui/Icon";
import "./Nav.css";

const LINKS = [
  { href: "#ai-finder", label: "AI Gift Finder" },
  { href: "#ideas", label: "Ideas" },
  { href: "#collections", label: "Collections" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#organisations", label: "For Organisations" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openQuote, saved } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    if (pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="shell nav__inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand__mark" aria-hidden="true">
              <span className="brand__spark" />
            </span>
            <span className="brand__word">
              GOODIE<span className="brand__dot">.</span>AI
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <button key={l.href} className="nav__link" onClick={() => go(l.href)}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="nav__actions">
            {saved.length > 0 && (
              <button className="nav__saved" onClick={() => go("#ideas")} title="Saved ideas">
                <Icon name="heart-fill" size={15} />
                {saved.length}
              </button>
            )}
            <button className="btn btn--primary nav__cta" onClick={() => openQuote()}>
              Get Free Quotation
            </button>
            <button
              className="nav__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "chevron-down"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="nav__sheet">
          <nav aria-label="Mobile">
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                className="nav__sheet-link"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => go(l.href)}
              >
                {l.label}
                <Icon name="arrow-right" size={18} />
              </button>
            ))}
          </nav>
          <button
            className="btn btn--primary btn--lg btn--block"
            onClick={() => {
              setOpen(false);
              openQuote();
            }}
          >
            Get Free Quotation
          </button>
        </div>
      )}
    </>
  );
}
