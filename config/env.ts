// SERVER-ONLY. Do not import from client components. Reads secret AI config from
// process.env. Never throws at app boot — only AI routes check `configured`.
// Keys are never exposed to the client (no NEXT_PUBLIC_ prefix).

export type AIProviderName = "openai" | "anthropic";

export interface AIConfig {
  provider: AIProviderName;
  model: string;
  temperature: number;
  /** True only when the active provider's key is present. */
  configured: boolean;
}

const DEFAULT_MODEL = "gpt-4.1-mini";
const DEFAULT_TEMPERATURE = 0.3;

export function hasOpenAIConfig(): boolean {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());
}

export function getOpenAIModel(): string {
  return process.env.AI_MODEL?.trim() || DEFAULT_MODEL;
}

function getTemperature(): number {
  const raw = process.env.AI_TEMPERATURE;
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : DEFAULT_TEMPERATURE;
}

export function getAIConfig(): AIConfig {
  const provider = (process.env.AI_PROVIDER?.trim() as AIProviderName) || "openai";
  // Only OpenAI is implemented; configured reflects the active provider's key.
  const configured = provider === "openai" ? hasOpenAIConfig() : false;
  return {
    provider,
    model: getOpenAIModel(),
    temperature: getTemperature(),
    configured,
  };
}
