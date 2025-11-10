'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-alertas";
import { debts, type Debt } from "@/lib/data";

export default function AlertasClientPage() {
  const [debts7days, setDebts7days] = useState<Debt[]>([]);
  const [debts15days, setDebts15days] = useState<Debt[]>([]);
  const [debts30days, setDebts30days] = useState<Debt[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const now = new Date();

    const sevenDaysFromNow = new Date(now);
    sevenDaysFromNow.setDate(now.getDate() + 7);

    const fifteenDaysFromNow = new Date(now);
    fifteenDaysFromNow.setDate(now.getDate() + 15);
    
    const thirtyDaysFromNow = new Date(now);
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    setDebts7days(debts.filter(d => d.dueDate <= sevenDaysFromNow && d.dueDate >= now && d.status === 'Pendente'));
    setDebts15days(debts.filter(d => d.dueDate <= fifteenDaysFromNow && d.dueDate >= now && d.status === 'Pendente'));
    setDebts30days(debts.filter(d => d.dueDate <= thirtyDaysFromNow && d.dueDate >= now && d.status === 'Pendente'));
  }, []);

  if (!isClient) {
    // Render a placeholder or loading state on the server
    return (
        <>
            <PageHeader title="Alertas de Vencimento" />
            <Tabs defaultValue="7dias">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
                <TabsTrigger value="7dias">Até 7 dias</TabsTrigger>
                <TabsTrigger value="15dias">Até 15 dias</TabsTrigger>
                <TabsTrigger value="30dias">Até 30 dias</TabsTrigger>
                </TabsList>
                <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
                    <p>Carregando...</p>
                </div>
            </Tabs>
        </>
    );
  }

  return (
    <>
      <PageHeader title="Alertas de Vencimento" />
      <Tabs defaultValue="7dias">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="7dias">Até 7 dias</TabsTrigger>
          <TabsTrigger value="15dias">Até 15 dias</TabsTrigger>
          <TabsTrigger value="30dias">Até 30 dias</TabsTrigger>
        </TabsList>
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
            <TabsContent value="7dias">
                <DataTable columns={columns} data={debts7days} />
            </TabsContent>
            <TabsContent value="15dias">
                <DataTable columns={columns} data={debts15days} />
            </TabsContent>
            <TabsContent value="30dias">
                <DataTable columns={columns} data={debts30days} />
            </TabsContent>
        </div>
      </Tabs>
    </>
  );
}