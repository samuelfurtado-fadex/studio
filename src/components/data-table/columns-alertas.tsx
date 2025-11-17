
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alerta {
  id: number;
  coordinatorName: string;
  coordinatorEmail: string;
  projectName: string;
  value: number;
  dueDate: string;
  status: string;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const columns: ColumnDef<Alerta>[] = [
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
      return <div>{format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })}</div>;
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
      const alerta = row.original;
      
      if (!alerta.coordinatorEmail) return null;

      const emailSubject = encodeURIComponent(`Notificação de Pendência Financeira: Projeto ${alerta.projectName}`);
      const emailBody = encodeURIComponent(`Prezado(a) ${alerta.coordinatorName},\n\nConstatamos uma pendência financeira no valor de ${formatCurrency(alerta.value)} referente ao projeto "${alerta.projectName}", com vencimento em ${format(new Date(alerta.dueDate), 'dd/MM/yyyy', { locale: ptBR })}.\n\nPor favor, acesse o sistema para mais detalhes e regularização.\n\nAtenciosamente,\nEquipe Financeira FADEX`);

      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`mailto:${alerta.coordinatorEmail}?subject=${emailSubject}&body=${emailBody}`} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Notificar por E-mail
          </Link>
        </Button>
      );
    },
  },
];
