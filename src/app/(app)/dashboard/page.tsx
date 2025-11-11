
"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { FolderKanban, TrendingUp, TrendingDown, Users, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format, startOfMonth, differenceInDays } from "date-fns";

const chartConfig: ChartConfig = {
  debts: {
    label: "Dívidas",
    color: "hsl(var(--chart-1))",
  },
  day: {
    label: "Dia",
  },
  month: {
    label: "Mês",
  }
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const monthMap: { [key: string]: number } = {
  'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
  'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
};

export default function DashboardPage() {
  const totalPending = 9850.50;
  const totalAvailable = 39950.75;
  const totalProjects = 5;
  const totalCoordinators = 5;
  const overdueDebts = 2;

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dailyDate, setDailyDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const handleDailyDateSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      if (differenceInDays(range.to, range.from) > 31) {
        // Do nothing or show a toast message
        return;
      }
    }
    setDailyDate(range);
  };

  const [monthlyDate, setMonthlyDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });
  
  const filteredDailyData = dailyDebtData.filter(item => {
    if (!dailyDate?.from) return true;
    const itemDate = new Date(dailyDate.from.getFullYear(), dailyDate.from.getMonth(), item.day);
    itemDate.setHours(0, 0, 0, 0);

    const fromDate = new Date(dailyDate.from);
    fromDate.setHours(0,0,0,0);
    
    if (dailyDate.to) {
        const toDate = new Date(dailyDate.to);
        toDate.setHours(0,0,0,0);
        return itemDate >= fromDate && itemDate <= toDate;
    }
    
    return itemDate.getTime() === fromDate.getTime();
  });

  const filteredMonthlyData = monthlyDebtData.filter(item => {
    if (!monthlyDate?.from || !monthlyDate?.to) return true;
    const monthIndex = monthMap[item.month];
    if (monthIndex === undefined) return false;
    const itemDate = new Date(new Date().getFullYear(), monthIndex, 1);
    
    const fromDate = startOfMonth(monthlyDate.from);
    const toDate = startOfMonth(monthlyDate.to);

    return itemDate >= fromDate && itemDate <= toDate;
  });

  const handleChartClick = (data: any, chartType: 'daily' | 'monthly') => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const payload = data.activePayload[0].payload;
      
      let debtToShow: Debt | undefined;

      if (chartType === 'daily') {
        const clickedDay = payload.day;
        const currentMonth = dailyDate?.from?.getMonth() ?? new Date().getMonth();
        debtToShow = debts.find(d => {
          const dueDate = new Date(d.dueDate);
          return dueDate.getDate() === clickedDay && dueDate.getMonth() === currentMonth;
        });
      } else if (chartType === 'monthly') {
        const clickedMonth = payload.month;
        const monthIndex = monthMap[clickedMonth];
        debtToShow = debts.find(d => {
          const dueDate = new Date(d.dueDate);
          return dueDate.getMonth() === monthIndex;
        });
      }

      if (debtToShow) {
        setSelectedDebt(debtToShow);
        setIsDialogOpen(true);
      }
    }
  };

  const handleDotClick = (e: any) => {
    const { payload } = e;
    const clickedDay = payload.day;
    const currentMonth = dailyDate?.from?.getMonth() ?? new Date().getMonth();
    const debtToShow = debts.find(d => {
        const dueDate = new Date(d.dueDate);
        return dueDate.getDate() === clickedDay && dueDate.getMonth() === currentMonth;
    });

    if (debtToShow) {
        setSelectedDebt(debtToShow);
        setIsDialogOpen(true);
    }
  }


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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Acompanhamento de Dívidas (Mensal)</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {monthlyDate?.from ? (
                    monthlyDate.to ? (
                      <>
                        {format(monthlyDate.from, "LLL y")} -{" "}
                        {format(monthlyDate.to, "LLL y")}
                      </>
                    ) : (
                      format(monthlyDate.from, "LLL y")
                    )
                  ) : (
                    <span>Escolha um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={monthlyDate?.from}
                  selected={monthlyDate}
                  onSelect={setMonthlyDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={filteredMonthlyData} onClick={(data) => handleChartClick(data, 'monthly')}>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Acompanhamento de Dívidas (Diário)</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dailyDate?.from ? (
                    dailyDate.to ? (
                      <>
                        {format(dailyDate.from, "dd/MM/y")} -{" "}
                        {format(dailyDate.to, "dd/MM/y")}
                      </>
                    ) : (
                      format(dailyDate.from, "dd/MM/y")
                    )
                  ) : (
                    <span>Escolha um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dailyDate?.from}
                  selected={dailyDate}
                  onSelect={handleDailyDateSelect}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={filteredDailyData} onClick={(data) => handleChartClick(data, 'daily')}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                   <Tooltip cursor={true} content={<ChartTooltipContent labelKey="day" />} />
                  <Line type="monotone" dataKey="debts" stroke="var(--color-debts)" strokeWidth={2} dot={{ onClick: handleDotClick, r: 4, style: { cursor: 'pointer' } }} activeDot={{r: 6}} />
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
                <span className="font-medium">{format(selectedDebt.dueDate, 'dd/MM/yyyy')}</span>
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

    
  
    

    