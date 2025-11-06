"use server";

import { financialDashboardBalanceForecast } from "@/ai/flows/financial-dashboard-balance-forecast";

export async function generateBalanceForecast(
  historicalDebtData: string,
  marketForecastData: string
) {
  try {
    const result = await financialDashboardBalanceForecast({
      historicalDebtData,
      marketForecastData,
    });
    return { success: true, forecast: result.balanceForecast };
  } catch (error) {
    console.error("Error generating balance forecast:", error);
    return {
      success: false,
      error: "Não foi possível gerar a previsão. Tente novamente mais tarde.",
    };
  }
}
