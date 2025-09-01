'use server';

/**
 * @fileOverview Analyzes user-reported symptoms and provides possible causes and suggested next steps.
 *
 * - analyzeSymptomsAndSuggestNextSteps - A function that handles the symptom analysis process.
 * - AnalyzeSymptomsAndSuggestNextStepsInput - The input type for the analyzeSymptomsAndSuggestNextSteps function.
 * - AnalyzeSymptomsAndSuggestNextStepsOutput - The return type for the analyzeSymptomsAndSuggestNextSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsAndSuggestNextStepsInputSchema = z.object({
  symptoms: z
    .string()
    .describe("A detailed description of the user's symptoms."),
  medicalHistory: z
    .string()
    .optional()
    .describe('The user medical history, if available.'),
  userProfile: z
    .string()
    .optional()
    .describe('The user profile information, if available.'),
});
export type AnalyzeSymptomsAndSuggestNextStepsInput = z.infer<typeof AnalyzeSymptomsAndSuggestNextStepsInputSchema>;

const AnalyzeSymptomsAndSuggestNextStepsOutputSchema = z.object({
  possibleCauses: z
    .string()
    .describe('Possible causes of the reported symptoms.'),
  suggestedNextSteps: z
    .string()
    .describe('Suggested next steps based on the symptom analysis.'),
  highPriorityConcerns: z
    .boolean()
    .describe(
      'Whether the reported symptoms indicate high-priority health concerns.'
    ),
  referralResources: z
    .string()
    .optional()
    .describe(
      'Relevant health resources to which the user can be referred, if applicable.'
    ),
});
export type AnalyzeSymptomsAndSuggestNextStepsOutput = z.infer<typeof AnalyzeSymptomsAndSuggestNextStepsOutputSchema>;

export async function analyzeSymptomsAndSuggestNextSteps(
  input: AnalyzeSymptomsAndSuggestNextStepsInput
): Promise<AnalyzeSymptomsAndSuggestNextStepsOutput> {
  return analyzeSymptomsAndSuggestNextStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsAndSuggestNextStepsPrompt',
  input: {schema: AnalyzeSymptomsAndSuggestNextStepsInputSchema},
  output: {schema: AnalyzeSymptomsAndSuggestNextStepsOutputSchema},
  prompt: `You are an AI medical assistant. Analyze the user's symptoms and provide possible causes and suggested next steps.

Symptoms: {{{symptoms}}}
Medical History: {{{medicalHistory}}}
User Profile: {{{userProfile}}}

Determine if the reported symptoms indicate high-priority health concerns. If so, set highPriorityConcerns to true.
Suggest relevant health resources for referral, if applicable.`,
});

const analyzeSymptomsAndSuggestNextStepsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsAndSuggestNextStepsFlow',
    inputSchema: AnalyzeSymptomsAndSuggestNextStepsInputSchema,
    outputSchema: AnalyzeSymptomsAndSuggestNextStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
