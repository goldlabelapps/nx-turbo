import { defineTool } from "eve/tools";
import { z } from "zod";

const TOPICS: Record<string, string> = {
  overview:
    "nx-agent is a production-style example built with Eve and deployed on Vercel.",
  scope:
    "MVP prioritizes reliability, safe tool usage, approvals, and observable chat workflows.",
  deployment:
    "Deployment targets Vercel preview and production environments with reproducible docs.",
};

export default defineTool({
  description: "Return high-level project context for common nx-agent topics.",
  inputSchema: z.object({
    topic: z.enum(["overview", "scope", "deployment"]),
  }),
  async execute(input) {
    return {
      topic: input.topic,
      content: TOPICS[input.topic],
      source: "internal-project-context",
    };
  },
});
