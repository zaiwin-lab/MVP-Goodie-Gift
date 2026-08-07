import { useState } from "react";
import { useStore } from "../state/store";
import { useTypeInto } from "../lib/hooks";
import { Composer } from "./Composer";
import { SamplePrompts } from "./SamplePrompts";
import { Conversation } from "./Conversation";
import "./Hero.css";

export function Hero() {
  const { ask, phase } = useStore();
  const [draft, setDraft] = useState("");
  const typeInto = useTypeInto(setDraft);

  const active = phase !== "idle";

  const pick = (prompt: string) => {
    typeInto(prompt);
    document.getElementById("composer-hero")?.focus({ preventScroll: true });
  };

  return (
    <section className={`hero ${active ? "hero--active" : ""}`} id="ai-finder">
      <div className="hero__aura" aria-hidden="true" />

      <div className="shell">
        <div className="hero__head">
          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            AI event gift advisor <span aria-hidden="true">·</span> Sarawak, Malaysia
          </p>

          <h1 className="hero__title">
            Not Sure What
            <br />
            <span className="hero__title-em">Goodies to Give?</span>
          </h1>

          <p className="hero__lead">
            Tell us about your event. Our AI will suggest creative, useful and budget-friendly ideas
            in seconds.
          </p>
        </div>

        <div className="hero__composer">
          <Composer
            value={draft}
            onChange={setDraft}
            onSubmit={(v) => ask(v)}
            busy={phase === "thinking"}
          />
        </div>

        {!active && <SamplePrompts onPick={pick} />}

        <Conversation />
      </div>
    </section>
  );
}
