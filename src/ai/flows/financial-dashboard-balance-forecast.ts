'use server';

/**
 * @fileOverview AI-powered balance forecasts for the financial dashboard.
 *
 * - financialDashboardBalanceForecast - A function that generates balance forecasts for the dashboard.
 * - FinancialDashboardBalanceForecastInput - The input type for the financialDashboardBalanceForecast function.
 * - FinancialDashboardBalanceForecastOutput - The return type for the financialDashboardBalanceForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialDashboardBalanceForecastInputSchema = z.object({
  historicalDebtData: z
    .string()
    .describe(
      'Historical debt data as a CSV formatted string.'
    ),
  marketForecastData: z
    .string()
    .describe(
      'Market forecast data as a CSV formatted string.'
    ),
});
export type FinancialDashboardBalanceForecastInput = z.infer<typeof FinancialDashboardBalanceForecastInputSchema>;

const FinancialDashboardBalanceForecastOutputSchema = z.object({
  balanceForecast: z
    .string()
    .describe(
      'A forecast of future balances based on historical debt trends and market data.'
    ),
});
export type FinancialDashboardBalanceForecastOutput = z.infer<typeof FinancialDashboardBalanceForecastOutputSchema>;

export async function financialDashboardBalanceForecast(input: FinancialDashboardBalanceForecastInput): Promise<FinancialDashboardBalanceForecastOutput> {
  return financialDashboardBalanceForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialDashboardBalanceForecastPrompt',
  input: {schema: FinancialDashboardBalanceForecastInputSchema},
  output: {schema: FinancialDashboardBalanceForecastOutputSchema},
  prompt: `You are an expert financial analyst specializing in balance forecasting.

You will use historical debt data and market forecast data to predict future balances.

Historical Debt Data: {{{historicalDebtData}}}
Market Forecast Data: {{{marketForecastData}}}

Based on this data, generate a balance forecast.`,  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const financialDashboardBalanceForecastFlow = ai.defineFlow(
  {
    name: 'financialDashboardBalanceForecastFlow',
    inputSchema: FinancialDashboardBalanceForecastInputSchema,
    outputSchema: FinancialDashboardBalanceForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
