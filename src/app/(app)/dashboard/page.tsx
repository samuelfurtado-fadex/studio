"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { FolderKanban, TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PageHeader } from "@/components/page-header";
import { monthlyDebtData, dailyDebtData, debts, Debt } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const chartConfig: ChartConfig = {
  debts: {
    label: "Dívidas",
    color: "hsl(var(--chart-1))",
  },
  day: {
    label: "Dia",
  }
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function DashboardPage() {
  const totalPending = 9850.50;
  const totalAvailable = 39950.75;
  const totalProjects = 5;
  const totalCoordinators = 5;
  const overdueDebts = 2;

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const payload = data.activePayload[0].payload;
      const clickedDay = payload.day;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      // Find a debt that matches the clicked day. 
      // This is a simple mock logic. In a real scenario, you'd fetch data for the exact date.
      const debtForDay = debts.find(d => {
        const dueDate = new Date(d.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        // This is a mock logic to associate a chart day with a debt
        // It takes the day of the month from the due date
        return dueDate.getDate() === clickedDay;
      });

      if (debtForDay) {
        setSelectedDebt(debtForDay);
        setIsDialogOpen(true);
      }
    }
  };

  return (
    <>
      <PageHeader title="Dashboard Gerencial" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dívidas Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueDebts}
            </div>
            <p className="text-xs text-muted-foreground">Prestações de contas atrasadas</p>
          </CardContent>
        </Card>
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
                <LineChart data={dailyDebtData} onClick={handleChartClick}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                   <Tooltip cursor={true} content={<ChartTooltipContent labelKey="day" />} />
                  <Line type="monotone" dataKey="debts" stroke="var(--color-debts)" strokeWidth={2} dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {selectedDebt && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Dívida</DialogTitle>
              <DialogDescription>
                Informações sobre a dívida para o dia selecionado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordenador:</span>
                <span className="font-medium">{selectedDebt.coordinatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projeto:</span>
                <span className="font-medium">{selectedDebt.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium text-destructive">{formatCurrency(selectedDebt.value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vencimento:</span>
                <span className="font-medium">{selectedDebt.dueDate.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${selectedDebt.status === 'Pendente' ? 'text-yellow-500' : 'text-green-500'}`}>{selectedDebt.status}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
