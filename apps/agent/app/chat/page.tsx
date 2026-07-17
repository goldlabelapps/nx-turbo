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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const text = input.trim();
    setMessages((previous) => [
      ...previous,
      { role: "user", text },
      { role: "agent", text: `Received. I\'ll break this into objective, constraints, and first-pass output for: \"${text}\".` },
    ]);
    setInput("");
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
            />
            <Button as="button" type="submit">
              Send
            </Button>
          </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
