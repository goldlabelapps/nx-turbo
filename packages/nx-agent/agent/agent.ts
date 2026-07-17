import { defineAgent } from "eve";
import { mockModel } from "eve/evals";

const useMockModel = process.env.EVE_USE_MOCK_MODEL === "1";

export default defineAgent({
  description: "nx-agent production-style example agent",
  model: useMockModel ? mockModel("nx-agent mock reply") : "openai/gpt-5.4-mini",
  modelContextWindowTokens: useMockModel ? 200_000 : undefined,
});
