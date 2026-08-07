import { useEffect, useRef, useState } from "react";
import { PLACEHOLDER_PROMPTS, SURPRISE_SCENARIOS } from "../data/prompts";
import { useRotatingPlaceholder, useTypeInto } from "../lib/hooks";
import { Icon } from "./ui/Icon";
import "./Composer.css";

export interface Attachment {
  id: string;
  name: string;
  kind: "file" | "link";
}

interface Props {
  value: string;
  onChange(v: string): void;
  onSubmit(v: string): void;
  variant?: "hero" | "compact";
  busy?: boolean;
  autoFocusOnMount?: boolean;
  showSurprise?: boolean;
  ctaLabel?: string;
}

export function Composer({
  value,
  onChange,
  onSubmit,
  variant = "hero",
  busy = false,
  autoFocusOnMount = false,
  showSurprise = true,
  ctaLabel = "Generate Goodie Ideas",
}: Props) {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const typeInto = useTypeInto(onChange);

  const placeholder = useRotatingPlaceholder(PLACEHOLDER_PROMPTS, !focused && value.length === 0);

  useEffect(() => {
    if (autoFocusOnMount) areaRef.current?.focus();
  }, [autoFocusOnMount]);

  // Grow with content instead of scrolling inside a small box.
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, variant === "hero" ? 240 : 180)}px`;
  }, [value, variant]);

  const submit = () => {
    if (!value.trim() || busy) return;
    onSubmit(value.trim());
  };

  const surprise = () => {
    const pick = SURPRISE_SCENARIOS[Math.floor(Math.random() * SURPRISE_SCENARIOS.length)];
    typeInto(pick);
    areaRef.current?.focus();
  };

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setAttachments((prev) => [
      ...prev,
      ...Array.from(files).map((f) => ({
        id: `${f.name}-${Math.random().toString(36).slice(2, 7)}`,
        name: f.name,
        kind: "file" as const,
      })),
    ]);
  };

  return (
    <div className={`composer composer--${variant} ${focused ? "is-focused" : ""}`}>
      <div className="composer__glow" aria-hidden="true" />

      <div className="composer__box">
        <label htmlFor={`composer-${variant}`} className="visually-hidden">
          Describe your event
        </label>
        <textarea
          id={`composer-${variant}`}
          ref={areaRef}
          className="composer__input"
          value={value}
          rows={variant === "hero" ? 3 : 2}
          placeholder={focused || value ? "Tell GoodieAI what you're planning…" : placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submit();
            }
          }}
        />

        {attachments.length > 0 && (
          <ul className="composer__attachments">
            {attachments.map((a) => (
              <li key={a.id} className="composer__attachment">
                <Icon name={a.kind === "link" ? "link" : "paperclip"} size={13} />
                <span>{a.name}</span>
                <button
                  onClick={() => setAttachments((prev) => prev.filter((x) => x.id !== a.id))}
                  aria-label={`Remove ${a.name}`}
                >
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {linkOpen && (
          <div className="composer__link-row">
            <Icon name="link" size={15} />
            <input
              autoFocus
              value={linkValue}
              placeholder="Paste a reference link — a past event, a brief, a moodboard…"
              onChange={(e) => setLinkValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || !linkValue.trim()) return;
                setAttachments((p) => [
                  ...p,
                  { id: `${Date.now()}`, name: linkValue.trim(), kind: "link" },
                ]);
                setLinkValue("");
                setLinkOpen(false);
              }}
            />
            <button onClick={() => setLinkOpen(false)} aria-label="Cancel link">
              <Icon name="close" size={14} />
            </button>
          </div>
        )}

        <div className="composer__bar">
          <div className="composer__tools">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
              className="visually-hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              className="composer__tool"
              onClick={() => fileRef.current?.click()}
              title="Attach a brief, image or PDF"
            >
              <Icon name="paperclip" size={16} />
              <span>Attach</span>
            </button>
            <button
              className="composer__tool"
              onClick={() => setLinkOpen((o) => !o)}
              title="Add a reference link"
            >
              <Icon name="link" size={16} />
              <span>Link</span>
            </button>
            {showSurprise && (
              <button className="composer__tool composer__tool--dice" onClick={surprise}>
                <Icon name="dice" size={16} />
                <span>Surprise me</span>
              </button>
            )}
          </div>

          <button className="composer__go" onClick={submit} disabled={!value.trim() || busy}>
            <span className="composer__go-spark" aria-hidden="true">
              ✨
            </span>
            {busy ? "Thinking…" : ctaLabel}
          </button>
        </div>
      </div>

      <p className="composer__meta">
        Free ideas <span>•</span> No registration required <span>•</span> Free quotation
      </p>
    </div>
  );
}
