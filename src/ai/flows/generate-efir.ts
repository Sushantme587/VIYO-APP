'use server';
/**
 * @fileOverview A Genkit flow for automatically generating an Electronic First Information Report (E-FIR).
 *
 * This file defines:
 * - `generateEFIR`: The main function to trigger the E-FIR generation.
 * - `GenerateEFIRInput`: The Zod schema for the input, containing all necessary alert and tourist data.
 * - `GenerateEFIROutput`: The Zod schema for the output, which is the formatted FIR text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateEFIRInputSchema = z.object({
  alertId: z.string().describe('The unique identifier for the alert.'),
  timestamp: z.string().describe('The timestamp of the incident in ISO format.'),
  touristName: z.string().describe("The full name of the tourist involved."),
  touristId: z.string().describe("The unique ID of the tourist."),
  incidentType: z.string().describe('The type of incident (e.g., Geo-fence Breach, Panic Button).'),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).describe("The geographic coordinates where the incident occurred."),
  details: z.string().describe('The initial details or explanation of the incident.'),
  officerName: z.string().describe("The name of the reporting officer."),
});
export type GenerateEFIRInput = z.infer<typeof GenerateEFIRInputSchema>;

const GenerateEFIROutputSchema = z.object({
  firText: z.string().describe('The full, formatted text of the Electronic First Information Report.'),
});
export type GenerateEFIROutput = z.infer<typeof GenerateEFIROutputSchema>;

export async function generateEFIR(input: GenerateEFIRInput): Promise<GenerateEFIROutput> {
    return generateEFIRFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateEFIRPrompt',
    input: { schema: GenerateEFIRInputSchema },
    output: { schema: GenerateEFIROutputSchema },
    prompt: `
    You are an AI assistant for the VIYO tourist safety platform. Your task is to generate a formal Electronic First Information Report (E-FIR) based on the provided incident data. The report should be structured, clear, and professional.

    Incident Data:
    - Alert ID: {{{alertId}}}
    - Date & Time of Incident: {{{timestamp}}}
    - Reporting Officer: {{{officerName}}}
    - Incident Type: {{{incidentType}}}
    - Location: Latitude {{{location.latitude}}}, Longitude {{{location.longitude}}}
    - Subject: Tourist {{{touristName}}} (ID: {{{touristId}}})
    - Initial Details: {{{details}}}

    Generate the E-FIR text. It must include the following sections:
    1.  **Header**: "Electronic First Information Report (E-FIR)"
    2.  **Case Number**: A placeholder like "[System Generated]"
    3.  **Date/Time of Report**: The current date and time.
    4.  **Reporting Officer**: {{{officerName}}}
    5.  **Incident Details**: A summary of the event, including date, time, location, and type.
    6.  **Persons Involved**: Details of the tourist.
    7.  **Narrative/Summary**: A detailed narrative based on the provided initial details. Expand on the details to create a formal report.
    8.  **Action Taken**: A section for actions taken, which can be pre-filled with "Initial report filed. Pending investigation and/or dispatch."
    9.  **Signature**: A line for the officer's digital signature.

    Format the output as a single block of text.
    `,
});

const generateEFIRFlow = ai.defineFlow(
    {
        name: 'generateEFIRFlow',
        inputSchema: GenerateEFIRInputSchema,
        outputSchema: GenerateEFIROutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
