// src/services/coordinatorService.ts

import { prisma } from "@/lib/prisma";
import type { Coordinator } from "@/lib/data";

// Função de mapeamento para traduzir o modelo 'projeto' do Prisma para 'Coordinator'
// Agora aceita email possivelmente nulo e preserva os valores brutos do banco
function mapToCoordinator(email: string | null, projects: any[]): Coordinator {
  const projectList = projects.map((p) => String(p.nome_projeto)).join(', ');
  return {
    id: String(email), // id precisa ser string; conservar representação bruta
    name: email, // nome = mesmo valor do e-mail (pode ser null ou '#N/D')
    project: projectList,
    pendingBalance: 0.0,
    availableBalance: 10000.0,
    email: email,
    phone: '(00) 00000-0000',
    cpf: '000.000.000-00',
    avatar: 'user-3',
    prestacaoContasStatus: 'Em Aberto',
    hasDocument: false,
  };
}

export async function getCoordinatorsFromDB(): Promise<Coordinator[]> {
  try {
    // Buscar todos os projetos (sem filtrar por nome) para garantir que
    // cada projeto seja exibido no site, mesmo quando outras colunas
    // têm valores nulos ou '#N/D'.
    type ProjectRow = {
      id_projeto: number;
      nome_projeto?: string | null;
      email_coordenador?: string | null;
      solicitacoes?: Array<{
        supridor?: { id_supridor: number; nome?: string | null } | null;
      }>;
    };

    const projects = (await prisma.projeto.findMany({
      select: {
        id_projeto: true,
        nome_projeto: true,
        email_coordenador: true,
        solicitacoes: {
          select: {
            supridor: {
              select: { id_supridor: true, nome: true },
            },
          },
        },
      },
    })) as ProjectRow[];
    // Filtrar projetos cujo nome seja nulo, vazio ou valores estranhos como '#N/D'
    const filteredProjects = projects.filter((p) => {
      const name = p.nome_projeto;
      if (name === undefined || name === null) return false;
      const s = String(name).trim();
      if (s === '') return false;
      if (s.toUpperCase() === '#N/D') return false;
      return true;
    });

    // Mapear cada projeto válido para uma linha (um Coordinator por projeto),
    // preservando os valores brutos do banco para e-mail e nome (quando existirem).
    const coordinatorsList: Coordinator[] = filteredProjects.map((p) => {
      // Find supplier name via solicitacoes relation (use first if multiple)
      const firstSolicitacao = p.solicitacoes && p.solicitacoes.length > 0 ? p.solicitacoes[0] : undefined;
      const supplierName = firstSolicitacao?.supridor?.nome ?? null;
      return {
        id: String(p.id_projeto),
        name: supplierName == null ? '[null]' : supplierName,
        project: p.nome_projeto === undefined ? null : p.nome_projeto,
      pendingBalance: 0.0,
      availableBalance: 10000.0,
      email: p.email_coordenador == null ? '[null]' : p.email_coordenador,
      phone: '(00) 00000-0000',
      cpf: '000.000.000-00',
      avatar: 'user-3',
      prestacaoContasStatus: 'Em Aberto',
      hasDocument: false,
      } as Coordinator;
    });

    return coordinatorsList;

  } catch (error) {
    console.error("Erro ao buscar coordenadores do DB:", error);
    throw new Error("Falha na operação de busca de coordenadores.");
  }
}