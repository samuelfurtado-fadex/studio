// src/services/projectService.ts

import { prisma } from "@/lib/prisma";

// This is a simplified version of the project type expected by the frontend
// We will simulate some of the data.
interface Project {
  id: number;
  name: string;
  code: string;
  status: 'Ativo' | 'Concluído' | 'Em Pausa';
  budget: {
    current: number;
    total: number;
  };
  coordinatorId: string | null;

export async function getProjectsFromDB(): Promise<Project[]> {
  try {
    const projectsFromDb = await prisma.projeto.findMany();

    const projects = projectsFromDb.map((p) => ({
      id: p.id_projeto,
      name: p.nome_projeto || 'Nome não definido',
      code: p.conta,
      status: 'Ativo', // Placeholder
      budget: { current: 50000, total: 100000 }, // Placeholder
      coordinatorId: p.email_coordenador,
    }));

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos do DB:", error);
    throw new Error("Falha na operação de busca de projetos.");
  }
}
