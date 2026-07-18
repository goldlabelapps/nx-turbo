"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Card } from "@nx/unix";

const promptText = "You are NX Agent. Execute clearly, stay concise, and always return actionable next steps.";

type TerminalEntry = {
  id: number;
  command: string;
  output?: string;
  error?: string;
  meta?: {
    confidence: "low" | "medium" | "high";
    intents: string[];
    nextActions: string[];
  };
};

export default function Home() {
  const [command, setCommand] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function isEditableTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isComposing || isRunning || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key.length === 1) {
        setIsComposing(true);
        setCommand(event.key);
        event.preventDefault();
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        setIsComposing(true);
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isComposing, isRunning]);

  useEffect(() => {
    if (!isComposing || isRunning) {
      return;
    }

    inputRef.current?.focus();
  }, [isComposing, isRunning]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanCommand = command.trim();

    if (!cleanCommand || isRunning) {
      return;
    }

    const entryId = Date.now();
    setEntries((current) => [...current, { id: entryId, command: cleanCommand }]);
    setCommand("");
    setIsRunning(true);

    if (cleanCommand.toLowerCase().includes("dev")) {
      window.alert("Placeholder: dev command handler");
      setEntries((current) =>
        current.map((entry) =>
          entry.id === entryId ? { ...entry, output: "placeholder: dev command intercepted" } : entry,
        ),
      );
      setIsRunning(false);
      setIsComposing(false);
      return;
    }

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanCommand }),
      });

      const payload = (await response.json()) as {
        confidence?: "low" | "medium" | "high";
        error?: string;
        intents?: string[];
        nextActions?: string[];
        reply?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Command failed.");
      }

      setEntries((current) =>
        current.map((entry) =>
          entry.id === entryId
            ? {
                ...entry,
                meta:
                  payload.confidence && payload.intents && payload.nextActions
                    ? {
                        confidence: payload.confidence,
                        intents: payload.intents,
                        nextActions: payload.nextActions,
                      }
                    : undefined,
                output: payload.reply || "No output returned.",
              }
            : entry,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to process command.";
      setEntries((current) =>
        current.map((entry) => (entry.id === entryId ? { ...entry, error: message } : entry)),
      );
    } finally {
      setIsRunning(false);
      setIsComposing(false);
    }
  }

  return (
    <main className="page">
      <section className="shell">
        <div className="section-head">
          <h1>Agent Prompt</h1>
          <p className="lede">Unix terminal input mode.</p>
        </div>

        <div style={{ width: "min(760px, 100%)" }}>
          <Card padding="lg" variant="glass">
            <p className="lede" style={{ marginBottom: "10px" }}>
              system: {promptText}
            </p>

            <div className="terminal-log" role="log" aria-live="polite">
              {entries.map((entry) => (
                <div key={entry.id}>
                  <p className="prompt-input">
                    <span className="prompt-input__prefix">agent@nx:/prompt $</span>
                    <span>{entry.command}</span>
                  </p>
                  {entry.output ? <pre className="prompt-output">{entry.output}</pre> : null}
                  {entry.meta ? (
                    <p className="lede" style={{ marginTop: "8px" }}>
                      confidence: {entry.meta.confidence} | intents: {entry.meta.intents.join(", ")}
                    </p>
                  ) : null}
                  {entry.error ? <p className="prompt-error">error: {entry.error}</p> : null}
                </div>
              ))}
            </div>

            {isComposing || isRunning ? (
              <form className="prompt-input prompt-input--form" onSubmit={handleSubmit}>
                <span className="prompt-input__prefix">agent@nx:/prompt $</span>
                <input
                  ref={inputRef}
                  aria-label="Terminal command"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="prompt-input__field"
                  disabled={isRunning}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder={isRunning ? "running..." : "type command and press enter"}
                  value={command}
                />
              </form>
            ) : (
              <p
                className="prompt-input prompt-input--form"
                onClick={() => {
                  setIsComposing(true);
                }}
              >
                <span className="prompt-input__prefix">agent@nx:/prompt $</span>
                <span className="prompt-input__cursor" aria-hidden="true" />
              </p>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}