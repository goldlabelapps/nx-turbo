"use client";

import { useMemo, useState } from "react";
import { Accordion, Badge, Button, Card, RangeSlider, SegmentedToggle, Tag } from "@nx/design-system";

type Mode = "balanced" | "creative" | "strict";

const modeOptions = [
  { value: "balanced", label: "Balanced" },
  { value: "creative", label: "Creative" },
  { value: "strict", label: "Strict" },
];

const checklist = [
  "Goal captured",
  "Context attached",
  "Output constraints set",
  "Response style selected",
];

export default function AgentWorkbenchPage() {
  const [goal, setGoal] = useState("Plan a launch announcement for a new agent frontend.");
  const [context, setContext] = useState("Use the existing Next.js shell, keep design-system components, and write concise copy.");
  const [mode, setMode] = useState<Mode>("balanced");
  const [creativity, setCreativity] = useState(42);
  const [result, setResult] = useState("");

  const summary = useMemo(() => {
    const direction =
      mode === "creative"
        ? "Use expressive copy and bolder visual language."
        : mode === "strict"
          ? "Stay strict, factual, and implementation-oriented."
          : "Balance polish with pragmatic implementation details.";

    return [
      `Goal: ${goal}`,
      `Context: ${context}`,
      `Mode: ${mode} (${creativity}% creativity)`,
      `Direction: ${direction}`,
    ].join("\n");
  }, [goal, context, mode, creativity]);

  const runPrompt = () => {
    setResult(`${summary}\n\nDraft output:\n- Hero message with one core value proposition.\n- Three supporting proof points mapped to user outcomes.\n- Clear CTA hierarchy for the workbench, chat, and history routes.`);
  };

  return (
    <main className="page">
      <section className="shell shell-agent">
        <div className="section-head">
          <Badge tone="clay">Agent</Badge>
          <h1>Workbench</h1>
          <p className="lede">
            This route is now the first real frontend flow: define intent, tune response behavior,
            and generate a structured output draft.
          </p>
        </div>

        <div className="agent-grid">
          <div className="card-stack">
            <Card padding="lg" variant="glass">
            <h2>1. Describe the task</h2>
            <label className="mono-label" htmlFor="goal-input">
              Goal
            </label>
            <input
              id="goal-input"
              className="field-input"
              value={goal}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGoal(event.target.value)}
            />

            <label className="mono-label" htmlFor="context-input">
              Context
            </label>
            <textarea
              id="context-input"
              className="field-area"
              value={context}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setContext(event.target.value)}
            />

            <h2>2. Tune behavior</h2>
            <SegmentedToggle
              options={modeOptions}
              value={mode}
              onChange={(value) => setMode(value as Mode)}
            />

            <RangeSlider
              label="Creativity"
              value={creativity}
              onChange={setCreativity}
              min={0}
              max={100}
              formatValue={(value) => `${value}%`}
            />

            <div className="tag-row">
              {checklist.map((item) => (
                <Tag key={item} variant="outline">
                  {item}
                </Tag>
              ))}
            </div>

            <div className="actions">
              <Button onClick={runPrompt}>Generate draft</Button>
              <Button as="a" href="/chat" variant="ghost">
                Open Chat
              </Button>
            </div>
            </Card>
          </div>

          <div className="card-stack">
            <Card padding="lg" variant="paper">
            <h2>3. Review output</h2>
            <pre className="result-panel">{result || "Run the draft generator to preview the plan output."}</pre>

            <Accordion
              items={[
                {
                  q: "How this maps to production behavior",
                  a: "Connect the same controls to your backend inference endpoint and persist each run as a history item.",
                },
                {
                  q: "Why this page exists",
                  a: "It gives your team a concrete first flow for prompt shaping before chat and long-term history integrations are fully wired.",
                },
              ]}
              summaryStyle="serif"
            />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
