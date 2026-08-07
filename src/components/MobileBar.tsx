import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import { Icon } from "./ui/Icon";
import "./MobileBar.css";

/** Sticky mobile action bar. Appears once the visitor has scrolled past the hero. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  const { openQuote } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const askGoodieAI = () => {
    if (pathname !== "/") {
      navigate("/#ai-finder");
      return;
    }
    document.getElementById("ai-finder")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.getElementById("composer-hero")?.focus(), 620);
  };

  return (
    <div className={`mbar ${show ? "is-visible" : ""}`}>
      <button className="mbar__ask" onClick={askGoodieAI}>
        <span aria-hidden="true">✨</span> Ask GoodieAI
      </button>
      <button className="mbar__quote" onClick={() => openQuote()} aria-label="Get free quotation">
        <Icon name="check" size={18} />
      </button>
    </div>
  );
}
