
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-alertas";
import { Skeleton } from '@/components/ui/skeleton';

interface Alerta {
  id: number;
  coordinatorName: string;
  coordinatorEmail: string;
  projectName: string;
  value: number;
  dueDate: string;
  status: string;
}

export default function AlertasClientPage() {
  const [debts1_10, setDebts1_10] = useState<Alerta[]>([]);
  const [debts11_20, setDebts11_20] = useState<Alerta[]>([]);
  const [debts21_30, setDebts21_30] = useState<Alerta[]>([]);
  const [debts31_40, setDebts31_40] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/alertas');
        if (!res.ok) {
          throw new Error('Failed to fetch alertas');
        }
        const solicitacoes = await res.json();

        const mappedAlertas: Alerta[] = solicitacoes
          .filter((s: any) => s.status?.nome === 'Pendente' && s.data_prazo)
          .map((s: any) => ({
            id: s.id_solicitacao,
            coordinatorName: s.projeto?.email_coordenador || 'N/A',
            coordinatorEmail: s.projeto?.email_coordenador || '',
            projectName: s.projeto?.nome_projeto || 'N/A',
            value: s.valor,
            dueDate: s.data_prazo,
            status: s.status.nome,
          }));

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const filterDebtsByRange = (startDay: number, endDay: number) => {
          const startDate = new Date(today);
          startDate.setDate(today.getDate() + startDay);
          
          const endDate = new Date(today);
          endDate.setDate(today.getDate() + endDay);

          return mappedAlertas.filter(d => {
            const dueDate = new Date(d.dueDate);
            return dueDate >= startDate && dueDate <= endDate;
          });
        };

        setDebts1_10(filterDebtsByRange(1, 10));
        setDebts11_20(filterDebtsByRange(11, 20));
        setDebts21_30(filterDebtsByRange(21, 30));
        setDebts31_40(filterDebtsByRange(31, 40));

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full mt-4" />
                    <Skeleton className="h-12 w-full mt-4" />
                </div>
            </Tabs>
        </>
    );
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar alertas: {error}</div>;
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
