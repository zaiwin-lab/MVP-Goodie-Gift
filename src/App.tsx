import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { StoreProvider } from "./state/store";
import { useRevealObserver } from "./lib/hooks";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Sections";
import { MobileBar } from "./components/MobileBar";
import { QuotationModal } from "./components/QuotationModal";
import { Home } from "./pages/Home";
import { IdeaDetail } from "./pages/IdeaDetail";

/** Honours `/#section` links arriving from another route. */
function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (pathname === "/") return;
      window.scrollTo({ top: 0 });
      return;
    }
    const id = hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useRevealObserver();

  return (
    <StoreProvider>
      <HashScroll />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idea/:slug" element={<IdeaDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <MobileBar />
      <QuotationModal />
    </StoreProvider>
  );
}
