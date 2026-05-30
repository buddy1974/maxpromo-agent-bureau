import { getAIConfig } from "@/config/env";
import { generateWithOpenAI } from "./openai-provider";
import type { AIGenerationRequest, AIGenerationResult } from "./types";

/**
 * Single entry point for AI generation. Selects the provider from env (OpenAI is
 * the default). Anthropic is a deliberate placeholder — not implemented this
 * sprint. Generation is draft-only; no provider executes external actions.
 */
export async function generate(
  request: AIGenerationRequest,
): Promise<AIGenerationResult> {
  const { provider } = getAIConfig();

  switch (provider) {
    case "openai":
      return generateWithOpenAI(request);
    case "anthropic":
      // Placeholder for premium/complex reasoning — wire in a later sprint.
      return { ok: false, error: "ai_provider_not_implemented" };
    default:
      return { ok: false, error: "ai_provider_unknown" };
  }
}
