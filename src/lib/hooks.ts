import { useEffect, useState } from "react";

/**
 * Reveals every `.reveal` element as it scrolls into view. Mounted once at the
 * app root and backed by a MutationObserver, so a section can't be left
 * permanently invisible by forgetting to opt in.
 */
export function useRevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const scan = () =>
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));

    // Only now is it safe for CSS to hide unrevealed content.
    document.documentElement.classList.add("reveal-ready");
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);
}

/** Locks background scrolling while a modal or drawer is open. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}

/** Cycles an index through a list at a fixed interval while active. */
export function useCycle(length: number, active: boolean, ms = 900) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => Math.min(length - 1, i + 1));
    }, ms);
    return () => window.clearInterval(id);
  }, [active, length, ms]);

  return index;
}
