
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Debt } from "@/lib/data";
import { coordinators } from "@/lib/data";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.8-16.2-54.3-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);

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

      const whatsappMessage = encodeURIComponent(`Olá ${coordinator.name}, há uma pendência de ${formatCurrency(debt.value)} no projeto ${debt.projectName} com vencimento em ${debt.dueDate.toLocaleDateString('pt-BR')}. Por favor, verifique a plataforma.`);
      const emailSubject = encodeURIComponent(`Notificação de Pendência Financeira: Projeto ${debt.projectName}`);
      const emailBody = encodeURIComponent(`Prezado(a) ${coordinator.name},\n\nConstatamos uma pendência financeira no valor de ${formatCurrency(debt.value)} referente ao projeto "${debt.projectName}", com vencimento em ${debt.dueDate.toLocaleDateString('pt-BR')}.\n\nPor favor, acesse o sistema para mais detalhes e regularização.\n\nAtenciosamente,\nEquipe Financeira FADEX`);
      const phoneNumber = coordinator.phone.replace(/\D/g, '');

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Send className="mr-2 h-4 w-4" />
              Notificar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enviar Notificação</DialogTitle>
              <DialogDescription>
                Escolha o canal para notificar o coordenador sobre a pendência.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
                <Button variant="outline" asChild className="h-12 justify-start gap-4 px-4 text-base transition-all hover:bg-emerald-500 hover:text-white hover:scale-105">
                   <Link href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`} target="_blank">
                        <WhatsAppIcon className="h-6 w-6" /> WhatsApp
                   </Link>
                </Button>
                 <Button variant="outline" asChild className="h-12 justify-start gap-4 px-4 text-base transition-all hover:bg-blue-500 hover:text-white hover:scale-105">
                    <Link href={`mailto:${coordinator.email}?subject=${emailSubject}&body=${emailBody}`}>
                        <Mail className="h-6 w-6" /> E-mail
                    </Link>
                </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
