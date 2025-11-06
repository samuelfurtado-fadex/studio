"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateBalanceForecast } from "@/app/(app)/dashboard/balance-forecast-action";
import { Skeleton } from "../ui/skeleton";

export function BalanceForecast() {
  const [forecast, setForecast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setForecast("");

    const historicalData = "Ano,Mês,Valor\n2023,1,1200\n2023,2,1500\n2023,3,1100";
    const marketData = "Previsão para próximo trimestre: crescimento de 5%";

    const result = await generateBalanceForecast(historicalData, marketData);

    if (result.success && result.forecast) {
      setForecast(result.forecast);
    } else {
      toast({
        variant: "destructive",
        title: "Erro na Previsão",
        description: result.error || "Ocorreu um erro desconhecido.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          Previsão de Saldo (IA)
        </CardTitle>
        <CardDescription>
          Use IA para prever tendências de saldo com base em dados históricos e de mercado.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : forecast ? (
          <p className="text-sm text-foreground">{forecast}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Clique em "Gerar Previsão" para obter insights.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? "Gerando..." : "Gerar Previsão"}
        </Button>
      </CardFooter>
    </Card>
  );
}
