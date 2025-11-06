"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Debt } from "@/lib/data";

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
      return (
        <Button variant="ghost" size="sm">
          <Send className="mr-2 h-4 w-4" />
          Notificar
        </Button>
      );
    },
  },
];
