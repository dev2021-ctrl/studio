// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Provides personalized health advice based on user profile, medical history, and queries.
 *
 * - providePersonalizedHealthAdvice - A function that provides personalized health advice.
 * - ProvidePersonalizedHealthAdviceInput - The input type for the providePersonalizedHealthAdvice function.
 * - ProvidePersonalizedHealthAdviceOutput - The return type for the providePersonalizedHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvidePersonalizedHealthAdviceInputSchema = z.object({
  profile: z
    .string()
    .describe('The user profile, including age, gender, and lifestyle.'),
  medicalHistory: z
    .string()
    .describe('The user medical history, including conditions and medications.'),
  query: z.string().describe('The user query or health concern.'),
});
export type ProvidePersonalizedHealthAdviceInput =
  z.infer<typeof ProvidePersonalizedHealthAdviceInputSchema>;

const ProvidePersonalizedHealthAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      'Personalized health advice based on the user profile, medical history, and queries.'
    ),
  preventiveMeasures: z
    .string()
    .describe(
      'Preventive measures or lifestyle adjustments for health improvement.'
    ),
});
export type ProvidePersonalizedHealthAdviceOutput =
  z.infer<typeof ProvidePersonalizedHealthAdviceOutputSchema>;

export async function providePersonalizedHealthAdvice(
  input: ProvidePersonalizedHealthAdviceInput
): Promise<ProvidePersonalizedHealthAdviceOutput> {
  return providePersonalizedHealthAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'providePersonalizedHealthAdvicePrompt',
  input: {schema: ProvidePersonalizedHealthAdviceInputSchema},
  output: {schema: ProvidePersonalizedHealthAdviceOutputSchema},
  prompt: `You are a helpful AI assistant that provides personalized health advice based on user profile, medical history, and queries.

  Based on the user's profile:
  {{profile}}

  Medical history:
  {{medicalHistory}}

  And query:
  {{query}}

  Provide personalized health advice, including preventive measures or lifestyle adjustments for health improvement.
  `,
});

const providePersonalizedHealthAdviceFlow = ai.defineFlow(
  {
    name: 'providePersonalizedHealthAdviceFlow',
    inputSchema: ProvidePersonalizedHealthAdviceInputSchema,
    outputSchema: ProvidePersonalizedHealthAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
