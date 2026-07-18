export type NxAgentChatRequest = {
  message: string;
};

export type NxAgentChatResponse = {
  confidence: "low" | "medium" | "high";
  intents: string[];
  nextActions: string[];
  reply: string;
};

const MAX_MESSAGE = 1200;

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function detectIntents(message: string) {
  const lower = message.toLowerCase();
  const intents = new Set<string>();

  if (/deploy|vercel|build|preview|prod/.test(lower)) intents.add("deployment");
  if (/story|storybook|theme|ui|component/.test(lower)) intents.add("ui-system");
  if (/error|failing|fail|stack|broken|bug/.test(lower)) intents.add("debugging");
  if (/test|jest|e2e|lint|type/.test(lower)) intents.add("quality");
  if (/agent|prompt|chat|tool/.test(lower)) intents.add("agent-runtime");

  if (intents.size === 0) intents.add("general");
  return [...intents];
}

function actionsForIntents(intents: readonly string[]) {
  const actions: string[] = [];

  if (intents.includes("deployment")) {
    actions.push("Validate project root and framework settings for the target app.");
    actions.push("Run a local production build before redeploy.");
  }

  if (intents.includes("ui-system")) {
    actions.push("Confirm which package owns the UI assets and stories for this change.");
  }

  if (intents.includes("debugging")) {
    actions.push("Capture the first failing error and trace it to a specific route or script.");
  }

  if (intents.includes("quality")) {
    actions.push("Run lint and type checks in the affected workspace package.");
  }

  if (intents.includes("agent-runtime")) {
    actions.push("Use one narrow prompt and return an execution plan with explicit steps.");
  }

  if (actions.length === 0) {
    actions.push("Restate the request as one objective, constraints, and a first implementation step.");
  }

  return actions.slice(0, 4);
}

export function runNxAgentChat(request: NxAgentChatRequest): NxAgentChatResponse {
  const message = truncate(request.message.trim(), MAX_MESSAGE);
  const intents = detectIntents(message);
  const nextActions = actionsForIntents(intents);

  const confidence: NxAgentChatResponse["confidence"] =
    intents.includes("general") && intents.length === 1
      ? "low"
      : intents.length >= 3
        ? "high"
        : "medium";

  const reply = [
    `Objective: ${truncate(message, 180)}`,
    `Detected focus: ${intents.join(", ")}`,
    "Plan:",
    ...nextActions.map((action, index) => `${index + 1}. ${action}`),
    "First draft:",
    "Start by validating the failing surface area, then apply one minimal code/config change and re-run the exact command that failed.",
  ].join("\n");

  return {
    reply,
    intents,
    confidence,
    nextActions,
  };
}
