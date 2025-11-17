// src/services/coordinatorService.ts

import { prisma } from "@/lib/prisma";
import type { Coordinator } from "@/lib/data"; 

// Função de mapeamento para traduzir o modelo 'projeto' do Prisma para 'Coordinator'
function mapToCoordinator(email: string, projects: any[]): Coordinator {
  const firstProject = projects[0]; // Usar o primeiro projeto para dados comuns
  return {
    id: email, // Usar e-mail como ID único
    name: email, // Usar e-mail como nome (placeholder)
    project: projects.map(p => p.nome_projeto).join(', '), // Listar todos os projetos
    pendingBalance: 0.00, // Simulação
    availableBalance: 10000.00, // Simulação
    email: email,
    phone: '(00) 00000-0000', // Simulação
    cpf: '000.000.000-00', // Simulação
    avatar: 'user-3', // Simulação
    prestacaoContasStatus: 'Em Aberto', // Simulação
    hasDocument: false, // Simulação
  };
}

export async function getCoordinatorsFromDB(): Promise<Coordinator[]> {
  try {
    const projects = await prisma.projeto.findMany({
      where: {
        email_coordenador: {
          not: null, // Garantir que estamos pegando apenas projetos com coordenador
        },
      },
      select: {
        id_projeto: true,
        nome_projeto: true,
        email_coordenador: true,
      },
    });

    // Agrupar projetos por e-mail do coordenador para evitar duplicatas
    const coordinatorsMap = new Map<string, any[]>();

    projects.forEach(project => {
      if (project.email_coordenador) {
        if (!coordinatorsMap.has(project.email_coordenador)) {
          coordinatorsMap.set(project.email_coordenador, []);
        }
        coordinatorsMap.get(project.email_coordenador)!.push(project);
      }
    });

    // Mapear os dados agrupados para o formato do frontend
    const coordinatorsList = Array.from(coordinatorsMap.entries()).map(([email, projects]) => {
      return mapToCoordinator(email, projects);
    });
    
    return coordinatorsList;

  } catch (error) {
    console.error("Erro ao buscar coordenadores do DB:", error);
    throw new Error("Falha na operação de busca de coordenadores.");
  }
}