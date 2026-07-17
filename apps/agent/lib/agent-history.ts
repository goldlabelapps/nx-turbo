import "server-only";

import { promises as fs } from "fs";
import path from "path";

export type SessionKind = "chat" | "workbench";
export type SessionStatus = "Draft" | "Published" | "Validated";

export type HistoryEntry = {
  id: string;
  kind: SessionKind;
  title: string;
  summary: string;
  status: SessionStatus;
  createdAt: string;
  link: "/chat" | "/Agent";
};

type ChatInput = {
  message: string;
};

type WorkbenchInput = {
  goal: string;
  context: string;
  mode: "balanced" | "creative" | "strict";
  creativity: number;
};

const STORE_PATH = path.join(process.cwd(), "data", "agent-history.json");

async function ensureStoreFile() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, "[]", "utf8");
  }
}

export async function readHistory(): Promise<HistoryEntry[]> {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_PATH, "utf8");

  try {
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

async function writeHistory(entries: HistoryEntry[]) {
  await fs.writeFile(STORE_PATH, JSON.stringify(entries, null, 2), "utf8");
}

function shorten(text: string, max = 120) {
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function makeId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function addHistoryEntry(entry: Omit<HistoryEntry, "id" | "createdAt">) {
  const existing = await readHistory();
  const next: HistoryEntry = {
    id: makeId(),
    createdAt: new Date().toISOString(),
    ...entry,
  };

  await writeHistory([next, ...existing].slice(0, 120));
  return next;
}

export async function runChat(input: ChatInput) {
  const cleanMessage = input.message.trim();
  const reply = [
    `Objective: ${shorten(cleanMessage, 88)}`,
    "Constraints: Keep it implementation-ready, concise, and tied to route outcomes.",
    "Output: Provide a short execution plan, then an actionable first draft.",
  ].join("\n");

  const entry = await addHistoryEntry({
    kind: "chat",
    title: `Chat: ${shorten(cleanMessage, 38)}`,
    summary: shorten(reply, 130),
    status: "Draft",
    link: "/chat",
  });

  return { reply, entry };
}

export async function runWorkbench(input: WorkbenchInput) {
  const tone =
    input.mode === "creative"
      ? "Use vivid language and stronger contrast in hierarchy."
      : input.mode === "strict"
        ? "Favor precision, deterministic structure, and testable outcomes."
        : "Balance expressiveness with practical implementation detail.";

  const draft = [
    `Goal: ${shorten(input.goal, 120)}`,
    `Context: ${shorten(input.context, 150)}`,
    `Mode: ${input.mode} (${input.creativity}% creativity)`,
    `Direction: ${tone}`,
    "",
    "Draft output:",
    "- Lead with one value proposition tied to a user outcome.",
    "- Add three supporting points: workflow speed, reliability, and extensibility.",
    "- Close with route CTA order: Workbench, Chat, History.",
  ].join("\n");

  const entry = await addHistoryEntry({
    kind: "workbench",
    title: `Workbench: ${shorten(input.goal, 34)}`,
    summary: shorten(`${input.mode} mode, ${input.creativity}% creativity`, 130),
    status: "Validated",
    link: "/Agent",
  });

  return { draft, entry };
}
