"use client";

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Coordinator } from "@/lib/data";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const columns: ColumnDef<Coordinator>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "project",
    header: "Projeto",
  },
  {
    accessorKey: "pendingBalance",
    header: "Saldo Pendente",
    cell: ({ row }) => <div className="text-destructive">{formatCurrency(row.original.pendingBalance)}</div>,
  },
  {
    accessorKey: "availableBalance",
    header: "Saldo Disponível",
    cell: ({ row }) => <div className="text-emerald-600">{formatCurrency(row.original.availableBalance)}</div>,
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const coordinator = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/coordenadores/${coordinator.id}`}>Ver perfil detalhado</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
