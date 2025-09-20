'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying suspicious tourist behavior based on location anomalies.
 *
 * It includes:
 * - `identifyAnomalyPattern` function: The main function to trigger the anomaly detection flow.
 * - `AnomalyPatternInput`: The input type for the `identifyAnomalyPattern` function.
 * - `AnomalyPatternOutput`: The output type for the `identifyAnomalyPattern` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalyPatternInputSchema = z.object({
  touristId: z.string().describe('The unique identifier of the tourist.'),
  locationHistory: z.array(z.object({
    latitude: z.number().describe('The latitude of the location.'),
    longitude: z.number().describe('The longitude of the location.'),
    timestamp: z.string().describe('The timestamp of the location reading (ISO format).'),
  })).describe('An array of recent location data for the tourist.'),
  plannedRoute: z.array(z.object({
    latitude: z.number().describe('The latitude of the planned location.'),
    longitude: z.number().describe('The longitude of the planned location.'),
  })).optional().describe('An optional array of planned route coordinates.'),
  activityData: z.string().optional().describe('Optional data describing the tourist\'s current activity'),
});
export type AnomalyPatternInput = z.infer<typeof AnomalyPatternInputSchema>;

const AnomalyPatternOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether or not the tourist\'s behavior is anomalous.'),
  anomalyType: z.string().optional().describe('The type of anomaly detected (e.g., sudden stop, route deviation).'),
  anomalyScore: z.number().optional().describe('A score indicating the severity of the anomaly (0-1).'),
  explanation: z.string().describe('A human-readable explanation of why the behavior is considered anomalous.'),
});
export type AnomalyPatternOutput = z.infer<typeof AnomalyPatternOutputSchema>;

export async function identifyAnomalyPattern(input: AnomalyPatternInput): Promise<AnomalyPatternOutput> {
  return identifyAnomalyPatternFlow(input);
}

const identifyAnomalyPatternPrompt = ai.definePrompt({
  name: 'identifyAnomalyPatternPrompt',
  input: {schema: AnomalyPatternInputSchema},
  output: {schema: AnomalyPatternOutputSchema},
  prompt: `You are an AI assistant that analyzes tourist location data to detect anomalous behavior.

  You are provided with the tourist's recent location history, their planned route (if available), and their most recent activity description.

  Location History:
  {{#each locationHistory}}
  - Latitude: {{this.latitude}}, Longitude: {{this.longitude}}, Timestamp: {{this.timestamp}}
  {{/each}}

  {{#if plannedRoute}}
  Planned Route:
  {{#each plannedRoute}}
  - Latitude: {{this.latitude}}, Longitude: {{this.longitude}}
  {{/each}}
  {{else}}
  The tourist has no planned route data available.
  {{/if}}

  {{#if activityData}}
  The tourist is currently: {{{activityData}}}
  {{else}}
  No activity data available.
  {{/if}}

  Analyze the provided data and determine if the tourist's behavior is anomalous. Anomalies can include:
  - Sudden stops or prolonged inactivity in unexpected locations.
  - Significant deviations from the planned route.
  - Entering restricted or high-risk zones.
  - Impossible speed change (teleportation).

  If the behavior is anomalous, set isAnomaly to true, provide a detailed explanation, and assign an anomalyScore from 0 to 1, where 1 indicates high severity.  If the behavior is NOT anomalous, set isAnomaly to false, and provide a brief explanation.

  Consider all available data before determining whether the user's behavior is normal or an anomaly.
  `, // Backtick here is important.
});

const identifyAnomalyPatternFlow = ai.defineFlow(
  {
    name: 'identifyAnomalyPatternFlow',
    inputSchema: AnomalyPatternInputSchema,
    outputSchema: AnomalyPatternOutputSchema,
  },
  async input => {
    const {output} = await identifyAnomalyPatternPrompt(input);
    return output!;
  }
);
