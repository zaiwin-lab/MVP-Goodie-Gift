import { useCallback, useRef, useState } from "react";
import { IDEAS, ROUNDS, deckForRound } from "../data/ideas";
import type { Idea } from "../types";
import { IdeaCard } from "./IdeaCard";
import "./Playground.css";

interface Props {
  onOpen(idea: Idea): void;
}

/**
 * The signature experience: six colourful ideas, one press for six more.
 * The deck is dealt in rounds so every press is genuinely new material and
 * always shows all six colour personalities.
 */
export function Playground({ onOpen }: Props) {
  const [round, setRound] = useState(0);
  const [deck, setDeck] = useState<Idea[]>(() => deckForRound(0));
  const [dealing, setDealing] = useState(false);
  const [seed, setSeed] = useState(0);
  const timers = useRef<number[]>([]);

  const swapTo = useCallback((next: Idea[], nextRound: number) => {
    timers.current.forEach(window.clearTimeout);
    setDealing(true);

    // Cards animate out, then the new hand is dealt in with a stagger.
    const t = window.setTimeout(() => {
      setDeck(next);
      setRound(nextRound);
      setSeed((s) => s + 1);
      setDealing(false);
    }, 260);

    timers.current = [t];
  }, []);

  const showSixMore = () => swapTo(deckForRound(round + 1), round + 1);

  const surprise = () => {
    // One random idea per colour — a genuinely different hand, not the next round.
    const byColour = [1, 2, 3, 4, 5, 6].map((c) => {
      const bucket = IDEAS.filter((i) => i.colour === c);
      return bucket[Math.floor(Math.random() * bucket.length)];
    });
    swapTo(byColour, round);
  };

  return (
    <section className="section pg" id="ideas">
      <div className="shell">
        <div className="pg__head">
          <h2 className="pg__title">Don't Know What To Give?</h2>
          <p className="pg__sub">That's okay. Start exploring.</p>
          <span className="pg__badge">
            <span aria-hidden="true">✨</span> Goodie Idea Playground
          </span>
        </div>

        <div
          className={`pg__grid ${dealing ? "is-dealing" : ""}`}
          aria-busy={dealing}
        >
          {deck.map((idea, i) => (
            <IdeaCard
              key={`${seed}-${idea.id}`}
              idea={idea}
              index={i}
              onOpen={() => onOpen(idea)}
            />
          ))}
        </div>

        <div className="pg__actions">
          <button className="pg__more" onClick={showSixMore} disabled={dealing}>
            <span className="pg__more-spark" aria-hidden="true">
              ✨
            </span>
            Show me 6 more
          </button>
          <p className="pg__micro">There are always more ideas.</p>

          <button className="pg__surprise" onClick={surprise} disabled={dealing}>
            <span aria-hidden="true">🎲</span> Surprise me
          </button>

          <p className="pg__count" aria-live="polite">
            Set {(round % ROUNDS) + 1} of {ROUNDS} · {IDEAS.length} ideas and counting
          </p>
        </div>
      </div>
    </section>
  );
}
