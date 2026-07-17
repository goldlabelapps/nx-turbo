import { defineTool } from "eve/tools";
import { z } from "zod";

const SENSITIVE_ACTIONS = [
  "delete-resource",
  "publish-content",
  "change-access",
] as const;

export default defineTool({
  description:
    "Create an approval request for potentially sensitive actions before execution.",
  inputSchema: z.object({
    action: z.enum(SENSITIVE_ACTIONS),
    target: z.string().min(1),
    reason: z.string().min(8),
    requestedBy: z.string().min(1),
  }),
  async execute(input) {
    const approvalId = `approval_${Date.now()}`;

    return {
      status: "pending-approval",
      approvalRequired: true,
      approvalId,
      action: input.action,
      target: input.target,
      requestedBy: input.requestedBy,
      reason: input.reason,
      message:
        "Sensitive operation has not been executed. Await explicit user approval.",
    };
  },
});
