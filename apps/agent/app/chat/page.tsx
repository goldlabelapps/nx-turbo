"use client";

import { FormEvent, useState } from "react";
import { Badge, Button, Card, Tag } from "@nx/design-system";

type Message = {
  role: "user" | "agent";
  text: string;
};

const starters = [
  "Summarize today\'s frontend work",
  "Draft release notes for this sprint",
  "Create a QA checklist for new routes",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: "Agent is online. Share a task, and I\'ll produce a structured draft." },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isSending) return;

    const text = input.trim();
    setMessages((previous) => [
      ...previous,
      { role: "user", text },
    ]);
    setInput("");

    try {
      setIsSending(true);
      setStatusNote(null);

      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to generate chat reply.");
      }

      setMessages((previous) => [...previous, { role: "agent", text: payload.reply }]);
      setStatusNote("Saved to history.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to process chat request.";
      setMessages((previous) => [
        ...previous,
        {
          role: "agent",
          text: `${message} I can still help: objective, constraints, and draft can be generated after backend recovery.`,
        },
      ]);
      setStatusNote("Response used fallback path.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="page">
      <section className="shell shell-chat">
        <div className="section-head">
          <Badge tone="ink">Chat</Badge>
          <h1>Live prompt conversation</h1>
          <p className="lede">A focused chat route connected to your global nav and shared shell.</p>
        </div>

        <div className="card-stack">
          <Card padding="lg" variant="glass">
          <div className="tag-row">
            {starters.map((starter) => (
              <Tag key={starter} variant="frost">
                {starter}
              </Tag>
            ))}
          </div>

          <div className="chat-log" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble chat-bubble--${message.role}`}>
                <span className="chat-role">{message.role}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="chat-form">
            <label className="mono-label" htmlFor="chat-input">
              Message
            </label>
            <input
              id="chat-input"
              className="field-input"
              value={input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
              placeholder="Ask for copy, code plans, or QA steps"
              disabled={isSending}
            />
            <Button as="button" type="submit" disabled={isSending}>
              {isSending ? "Sending" : "Send"}
            </Button>
            {statusNote ? <span className="status-note">{statusNote}</span> : null}
          </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
