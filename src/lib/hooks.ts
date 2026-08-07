import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reveals every `.reveal` element in the document as it scrolls into view.
 *
 * Mounted once at the app root and backed by a MutationObserver, so a section
 * that forgets to opt in can't end up permanently invisible — which is exactly
 * what happens with per-section observers.
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
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

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode — state stays in memory, which is fine */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

/** Cycles through placeholder lines while the input is empty and unfocused. */
export function useRotatingPlaceholder(lines: string[], active: boolean, ms = 3600) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % lines.length), ms);
    return () => window.clearInterval(id);
  }, [active, lines.length, ms]);

  return lines[index];
}

/** Types a string into state, character by character. Used for sample prompts. */
export function useTypeInto(setter: (v: string) => void, speed = 12) {
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  const type = useCallback(
    (text: string) => {
      stop();
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setter(text);
        return;
      }
      let i = 0;
      const step = Math.max(1, Math.round(text.length / 70));
      timer.current = window.setInterval(() => {
        i = Math.min(text.length, i + step);
        setter(text.slice(0, i));
        if (i >= text.length) stop();
      }, speed);
    },
    [setter, speed, stop],
  );

  useEffect(() => stop, [stop]);

  return type;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
