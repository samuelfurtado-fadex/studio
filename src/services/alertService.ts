// src/services/alertService.ts

import { prisma } from "@/lib/prisma";

interface Alerta {
  id: number;
  coordinatorName: string;
  coordinatorEmail: string;
  projectName: string;
  value: number;
  dueDate: string;
  status: string;
}

export async function getAlertsFromDB(): Promise<Alerta[]> {
  try {
    const solicitacoes = await prisma.solicitacoes.findMany({
      include: {
        projeto: true,
        status: true,
      },
    });

    const alertas = solicitacoes
      .filter((s: any) => s.data_prazo) // Apenas alertas com data de prazo
      .map((s: any) => ({
        id: s.id_solicitacao,
        coordinatorName: s.projeto?.email_coordenador || 'N/A',
        coordinatorEmail: s.projeto?.email_coordenador || '',
        projectName: s.projeto?.nome_projeto || 'N/A',
        value: s.valor,
        dueDate: s.data_prazo,
        status: s.status?.nome || 'Desconhecido',
      }));

    return alertas;
  } catch (error) {
    console.error("Erro ao buscar alertas do DB:", error);
    throw new Error("Falha na operação de busca de alertas.");
  }
}
