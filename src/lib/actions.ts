"use server";

import { identifyAnomalyPattern, type AnomalyPatternInput, type AnomalyPatternOutput } from "@/ai/flows/anomaly-pattern-identification";
import { generateEFIR, type GenerateEFIRInput, type GenerateEFIROutput } from "@/ai/flows/generate-efir";

export async function checkForAnomalies(input: AnomalyPatternInput): Promise<AnomalyPatternOutput> {
  try {
    const result = await identifyAnomalyPattern(input);
    return result;
  } catch (error) {
    console.error("Error in GenAI Anomaly Detection Flow:", error);
    // In case of an AI error, we return a non-anomalous result to avoid false positives.
    return {
      isAnomaly: false,
      explanation: "AI analysis could not be completed.",
    };
  }
}

export async function generateEfirAction(input: GenerateEFIRInput): Promise<GenerateEFIROutput> {
    const result = await generateEFIR(input);
    return result;
}
