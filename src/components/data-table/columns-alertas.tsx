
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Debt } from "@/lib/data";
import { coordinators } from "@/lib/data";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const columns: ColumnDef<Debt>[] = [
  {
    accessorKey: "coordinatorName",
    header: "Nome do Coordenador",
  },
  {
    accessorKey: "projectName",
    header: "Projeto",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => <div className="font-medium">{formatCurrency(row.original.value)}</div>,
  },
  {
    accessorKey: "dueDate",
    header: "Data de Vencimento",
    cell: ({ row }) => {
      const date = row.original.dueDate;
      return <div>{date.toLocaleDateString('pt-BR')}</div>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        const variant = status === 'Pendente' ? 'destructive' : 'default';
        const colorClass = status === 'Pendente' ? 'bg-yellow-500' : 'bg-green-500';

        return <Badge variant={variant} className={`text-white ${colorClass}`}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const debt = row.original;
      const coordinator = coordinators.find(c => c.name === debt.coordinatorName);
      
      if (!coordinator) return null;

      const emailSubject = encodeURIComponent(`Notificação de Pendência Financeira: Projeto ${debt.projectName}`);
      const emailBody = encodeURIComponent(`Prezado(a) ${coordinator.name},\n\nConstatamos uma pendência financeira no valor de ${formatCurrency(debt.value)} referente ao projeto "${debt.projectName}", com vencimento em ${debt.dueDate.toLocaleDateString('pt-BR')}.\n\nPor favor, acesse o sistema para mais detalhes e regularização.\n\nAtenciosamente,\nEquipe Financeira FADEX`);

      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`mailto:${coordinator.email}?subject=${emailSubject}&body=${emailBody}`} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Notificar por E-mail
          </Link>
        </Button>
      );
    },
  },
];
