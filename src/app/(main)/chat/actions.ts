'use server';

import { analyzeSymptomsAndSuggestNextSteps } from '@/ai/flows/analyze-symptoms-and-suggest-next-steps';
import { providePersonalizedHealthAdvice } from '@/ai/flows/provide-personalized-health-advice';

export async function analyzeSymptomsAction(symptoms: string) {
  // In a real app, userProfile and medicalHistory would be fetched from a database
  const userProfile = 'Age: 30, Gender: Male, Lifestyle: Active';
  const medicalHistory = 'No known chronic illnesses.';

  const result = await analyzeSymptomsAndSuggestNextSteps({
    symptoms,
    userProfile,
    medicalHistory,
  });

  return result;
}

export async function getPersonalizedAdviceAction(query: string) {
  // In a real app, profile and medicalHistory would be fetched from a database
  const profile = 'Age: 30, Gender: Male, Lifestyle: Active, Goal: Improve general fitness';
  const medicalHistory = 'No known chronic illnesses. No current medications.';
  
  const result = await providePersonalizedHealthAdvice({
      profile,
      medicalHistory,
      query,
  });
  
  return result;
}
