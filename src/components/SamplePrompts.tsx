import { SAMPLE_PROMPTS } from "../data/prompts";
import { Icon, type IconName } from "./ui/Icon";
import "./SamplePrompts.css";

interface Props {
  onPick(prompt: string): void;
}

/**
 * The teaching device. Nobody reads instructions about prompting — but everyone
 * reads six short examples and infers the pattern.
 */
export function SamplePrompts({ onPick }: Props) {
  return (
    <div className="samples">
      <div className="samples__head">
        <h2>Need inspiration?</h2>
        <p>See how others might ask GoodieAI.</p>
      </div>

      <ul className="samples__grid">
        {SAMPLE_PROMPTS.map((s, i) => (
          <li key={s.id} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
            <button
              className="sample"
              style={{ ["--accent" as string]: s.accent }}
              onClick={() => onPick(s.prompt)}
            >
              <span className="sample__label">
                <span className="sample__icon">
                  <Icon name={s.icon as IconName} size={15} />
                </span>
                {s.label}
              </span>
              <span className="sample__quote">“{s.prompt}”</span>
              <span className="sample__cta">
                Try this example
                <Icon name="arrow-right" size={15} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
