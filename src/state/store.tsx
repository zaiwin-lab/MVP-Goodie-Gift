import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  BudgetBandId,
  EventBrief,
  QuotationContact,
  QuotationRequest,
  RefinementId,
  Recommendation,
} from "../types";
import { provider } from "../engine/provider";
import { BUDGET_BANDS, REFINEMENTS, THINKING_STAGES } from "../data/taxonomy";
import { useLocalStorage } from "../lib/hooks";
import { PACKAGES_BY_ID } from "../data/packages";

/* ==========================================================================
   Single source of truth for the AI conversation, saved ideas and quotations.
   ========================================================================== */

export type Phase = "idle" | "thinking" | "asking" | "results";

export interface QuoteTarget {
  conceptId?: string;
  conceptName?: string;
  estimate?: { min: number; max: number };
}

interface Store {
  phase: Phase;
  brief: EventBrief | null;
  results: Recommendation[];
  stageIndex: number;
  aiMessage: string;
  followUp: FollowUp | null;
  seenPackageIds: string[];

  ask(input: string): Promise<void>;
  refine(id: RefinementId): Promise<void>;
  answerBudget(band: BudgetBandId | "surprise"): Promise<void>;
  answerPax(value: string): Promise<void>;
  reset(): void;

  saved: string[];
  toggleSave(pkgId: string): void;
  isSaved(pkgId: string): boolean;

  quote: QuoteTarget | null;
  openQuote(target?: QuoteTarget): void;
  closeQuote(): void;
  submitQuote(contact: QuotationContact): QuotationRequest;
  leads: QuotationRequest[];
}

export interface FollowUp {
  kind: "budget" | "pax";
  message: string;
  options: { id: string; label: string }[];
}

const StoreContext = createContext<Store | null>(null);

const PAX_OPTIONS = [
  { id: "50", label: "Under 100" },
  { id: "250", label: "100 – 500" },
  { id: "750", label: "500 – 1,000" },
  { id: "1500", label: "More than 1,000" },
];

function budgetFollowUp(): FollowUp {
  return {
    kind: "budget",
    message:
      "Nice — I already have a few directions in mind. One thing would help me recommend much better options: what's your approximate budget per participant?",
    options: [
      ...BUDGET_BANDS.map((b) => ({ id: b.id, label: b.label })),
      { id: "surprise", label: "Surprise me" },
    ],
  };
}

function paxFollowUp(): FollowUp {
  return {
    kind: "pax",
    message: "Got it. Roughly how many people are we gifting? Quantity changes what's worth doing.",
    options: PAX_OPTIONS,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [brief, setBrief] = useState<EventBrief | null>(null);
  const [results, setResults] = useState<Recommendation[]>([]);
  const [stageIndex, setStageIndex] = useState(0);
  const [aiMessage, setAiMessage] = useState("");
  const [followUp, setFollowUp] = useState<FollowUp | null>(null);
  const [seenPackageIds, setSeen] = useState<string[]>([]);
  const [quote, setQuote] = useState<QuoteTarget | null>(null);

  const [saved, setSaved] = useLocalStorage<string[]>("goodie.saved", []);
  const [leads, setLeads] = useLocalStorage<QuotationRequest[]>("goodie.leads", []);

  const stageTimer = useRef<number | null>(null);

  const runStages = useCallback(() => {
    setStageIndex(0);
    if (stageTimer.current) window.clearInterval(stageTimer.current);
    stageTimer.current = window.setInterval(() => {
      setStageIndex((i) => Math.min(THINKING_STAGES.length - 1, i + 1));
    }, 340);
  }, []);

  const stopStages = useCallback(() => {
    if (stageTimer.current) window.clearInterval(stageTimer.current);
    stageTimer.current = null;
  }, []);

  const generate = useCallback(
    async (next: EventBrief, opts: { refinement?: RefinementId; exclude?: string[] } = {}) => {
      setPhase("thinking");
      setFollowUp(null);
      runStages();

      const recs = await provider.recommend({
        brief: next,
        count: opts.refinement === "more" ? 3 : 4,
        refinement: opts.refinement,
        exclude: opts.exclude,
      });

      stopStages();
      setResults(recs);
      setSeen((prev) => Array.from(new Set([...prev, ...recs.map((r) => r.pkg.id)])));
      setPhase("results");
    },
    [runStages, stopStages],
  );

  const ask = useCallback(
    async (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      setPhase("thinking");
      runStages();
      const next = await provider.understand(trimmed, brief);
      setBrief(next);

      // Ask at most one thing, and only when it genuinely changes the answer.
      if (next.missing.includes("budget")) {
        stopStages();
        const fu = budgetFollowUp();
        setFollowUp(fu);
        setAiMessage(fu.message);
        setPhase("asking");
        return;
      }
      if (next.missing.includes("pax")) {
        stopStages();
        const fu = paxFollowUp();
        setFollowUp(fu);
        setAiMessage(fu.message);
        setPhase("asking");
        return;
      }

      setAiMessage("GoodieAI found some ideas");
      setSeen([]);
      await generate(next);
    },
    [brief, generate, runStages, stopStages],
  );

  const answerBudget = useCallback(
    async (band: BudgetBandId | "surprise") => {
      if (!brief) return;
      const chosen =
        band === "surprise"
          ? undefined
          : BUDGET_BANDS.find((b) => b.id === band);

      const next: EventBrief = {
        ...brief,
        budgetPerPax: chosen ? (chosen.min + Math.min(chosen.max, chosen.min + 60)) / 2 : 30,
        budgetBand: chosen?.id ?? "10to30",
        missing: brief.missing.filter((m) => m !== "budget"),
      };
      setBrief(next);
      setAiMessage(
        band === "surprise"
          ? "Let's not worry about the budget then — here's what I'd actually give."
          : "Perfect. That's enough to work with.",
      );
      setSeen([]);
      await generate(next);
    },
    [brief, generate],
  );

  const answerPax = useCallback(
    async (value: string) => {
      if (!brief) return;
      const next: EventBrief = {
        ...brief,
        pax: Number(value),
        missing: brief.missing.filter((m) => m !== "pax"),
      };
      setBrief(next);
      setAiMessage("Thanks — that changes what's worth doing.");
      setSeen([]);
      await generate(next);
    },
    [brief, generate],
  );

  const refine = useCallback(
    async (id: RefinementId) => {
      if (!brief) return;
      const meta = REFINEMENTS.find((r) => r.id === id);
      setAiMessage(meta?.reply ?? "Reworking those ideas…");

      // Refinements also persist as stated preferences, so later turns remember.
      const prefs = new Set(brief.preferences);
      if (id === "esg") prefs.add("esg");
      if (id === "sarawak") prefs.add("sarawak");
      if (id === "premium") prefs.add("premium");
      if (id === "creative") prefs.add("creative");

      const next: EventBrief = { ...brief, preferences: Array.from(prefs) };
      setBrief(next);

      await generate(next, {
        refinement: id,
        exclude: id === "more" ? seenPackageIds : [],
      });
    },
    [brief, generate, seenPackageIds],
  );

  const reset = useCallback(() => {
    stopStages();
    setPhase("idle");
    setBrief(null);
    setResults([]);
    setFollowUp(null);
    setAiMessage("");
    setSeen([]);
  }, [stopStages]);

  const toggleSave = useCallback(
    (pkgId: string) => {
      setSaved((prev) => (prev.includes(pkgId) ? prev.filter((p) => p !== pkgId) : [...prev, pkgId]));
    },
    [setSaved],
  );

  const submitQuote = useCallback(
    (contact: QuotationContact): QuotationRequest => {
      const target = quote;
      const pkg = target?.conceptId ? PACKAGES_BY_ID[target.conceptId] : undefined;

      const lead: QuotationRequest = {
        id: `GQ-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        status: "NEW LEAD",
        contact,
        context: {
          eventDescription: brief?.raw ?? "",
          conceptId: target?.conceptId,
          conceptName: target?.conceptName ?? pkg?.name,
          estimate: target?.estimate,
          pax: brief?.pax,
          budgetPerPax: brief?.budgetPerPax,
          preferences: brief?.preferences ?? [],
          savedConceptIds: saved,
        },
      };

      // Stands in for the future admin backend: same shape, local storage.
      setLeads((prev) => [lead, ...prev]);
      return lead;
    },
    [brief, quote, saved, setLeads],
  );

  const value = useMemo<Store>(
    () => ({
      phase,
      brief,
      results,
      stageIndex,
      aiMessage,
      followUp,
      seenPackageIds,
      ask,
      refine,
      answerBudget,
      answerPax,
      reset,
      saved,
      toggleSave,
      isSaved: (id: string) => saved.includes(id),
      quote,
      openQuote: (target?: QuoteTarget) => setQuote(target ?? {}),
      closeQuote: () => setQuote(null),
      submitQuote,
      leads,
    }),
    [
      phase,
      brief,
      results,
      stageIndex,
      aiMessage,
      followUp,
      seenPackageIds,
      ask,
      refine,
      answerBudget,
      answerPax,
      reset,
      saved,
      toggleSave,
      quote,
      submitQuote,
      leads,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
