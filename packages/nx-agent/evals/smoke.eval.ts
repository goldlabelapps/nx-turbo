import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Smoke test: agent accepts a message and returns deterministic mock output.",
  async test(t) {
    await t.send("Say hi");
    t.succeeded();
    t.check(t.reply, includes("nx-agent mock reply"));
  },
});
