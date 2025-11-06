"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { DollarSign, Users, FolderKanban, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PageHeader } from "@/components/page-header";
import { monthlyDebtData, dailyDebtData } from "@/lib/data";
import { BalanceForecast } from "@/components/dashboard/balance-forecast";

const chartConfig: ChartConfig = {
  debts: {
    label: "Dívidas",
    color: "hsl(var(--chart-1))",
  },
};

export default function DashboardPage() {
  const totalPending = 9850.50;
  const totalAvailable = 39950.75;
  const totalProjects = 5;
  const totalCoordinators = 5;

  return (
    <>
      <PageHeader title="Dashboard Gerencial" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Pendente Total</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {totalPending.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground">Valor total de dívidas em aberto.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              {totalAvailable.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
             <p className="text-xs text-muted-foreground">Soma dos saldos disponíveis.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Número total de projetos gerenciados.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coordenadores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoordinators}</div>
             <p className="text-xs text-muted-foreground">Número de coordenadores cadastrados.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Acompanhamento de Dívidas (Mensal)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={monthlyDebtData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value / 1000}k`} />
                  <Tooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="debts" fill="var(--color-debts)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Acompanhamento de Dívidas (Diário)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={dailyDebtData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                   <Tooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="debts" stroke="var(--color-debts)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="lg:col-span-7">
          <BalanceForecast />
        </div>
      </div>
    </>
  );
}
