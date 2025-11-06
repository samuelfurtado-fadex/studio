"use client";

import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/lib/data";

const statusVariantMap: { [key in Project['status']]: "default" | "secondary" | "outline" } = {
  'Ativo': 'default',
  'Concluído': 'secondary',
  'Em Pausa': 'outline'
};


export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Nome do Projeto",
  },
  {
    accessorKey: "coordinator",
    header: "Coordenador",
  },
  {
    accessorKey: "budgetHead",
    header: "Rubrica",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        const variant = status === 'Ativo' ? 'default' : status === 'Concluído' ? 'secondary' : 'destructive';
        const colorClass = status === 'Ativo' ? 'bg-green-500' : status === 'Concluído' ? 'bg-blue-500' : 'bg-yellow-500';

        return <Badge variant={variant} className={`text-white ${colorClass}`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "openSupplies",
    header: "Suprimentos em Aberto",
    cell: ({ row }) => <div className="text-center">{row.original.openSupplies}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
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
                <Link href={`/projetos/${project.id}`}>Ver detalhes</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
