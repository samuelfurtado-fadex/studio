
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-alertas";
import { debts, type Debt } from "@/lib/data";

export default function AlertasClientPage() {
  const [debts1_10, setDebts1_10] = useState<Debt[]>([]);
  const [debts11_20, setDebts11_20] = useState<Debt[]>([]);
  const [debts21_30, setDebts21_30] = useState<Debt[]>([]);
  const [debts31_40, setDebts31_40] = useState<Debt[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filterDebtsByRange = (startDay: number, endDay: number) => {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + startDay);
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + endDay);

      return debts.filter(d => {
        const dueDate = new Date(d.dueDate);
        return dueDate >= startDate && dueDate <= endDate && d.status === 'Pendente';
      });
    };

    setDebts1_10(filterDebtsByRange(1, 10));
    setDebts11_20(filterDebtsByRange(11, 20));
    setDebts21_30(filterDebtsByRange(21, 30));
    setDebts31_40(filterDebtsByRange(31, 40));

  }, []);

  if (!isClient) {
    // Render a placeholder or loading state on the server
    return (
        <>
            <PageHeader title="Alertas de Vencimento" />
            <Tabs defaultValue="1-10dias">
                <TabsList className="grid w-full max-w-xl grid-cols-4 mb-4">
                  <TabsTrigger value="1-10dias">1 À 10 DIAS</TabsTrigger>
                  <TabsTrigger value="11-20dias">DE 11 À 20 DIAS</TabsTrigger>
                  <TabsTrigger value="21-30dias">DE 21 À 30 DIAS</TabsTrigger>
                  <TabsTrigger value="31-40dias">DE 31 À 40 DIAS</TabsTrigger>
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
      <Tabs defaultValue="1-10dias">
        <TabsList className="grid w-full max-w-xl grid-cols-4 mb-4">
          <TabsTrigger value="1-10dias">1 À 10 DIAS</TabsTrigger>
          <TabsTrigger value="11-20dias">DE 11 À 20 DIAS</TabsTrigger>
          <TabsTrigger value="21-30dias">DE 21 À 30 DIAS</TabsTrigger>
          <TabsTrigger value="31-40dias">DE 31 À 40 DIAS</TabsTrigger>
        </TabsList>
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
            <TabsContent value="1-10dias">
                <DataTable columns={columns} data={debts1_10} />
            </TabsContent>
            <TabsContent value="11-20dias">
                <DataTable columns={columns} data={debts11_20} />
            </TabsContent>
            <TabsContent value="21-30dias">
                <DataTable columns={columns} data={debts21_30} />
            </TabsContent>
            <TabsContent value="31-40dias">
                <DataTable columns={columns} data={debts31_40} />
            </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
