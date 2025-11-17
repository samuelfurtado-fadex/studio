// src/app/api/coordenadores/route.ts
import { NextResponse } from 'next/server';
import { getCoordinatorsFromDB } from '@/services/coordinatorService';

// Esta função responde a requisições GET para /api/coordenadores
export async function GET() {
  try {
    const coordinators = await getCoordinatorsFromDB();

    // Retorna a lista de coordenadores (no formato esperado pelo frontend)
    return NextResponse.json(coordinators, { status: 200 });
  } catch (error) {
    // Em caso de erro (ex: falha na conexão com o DB), retorna 500
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message || 'Erro interno do servidor ao buscar coordenadores.' },
      { status: 500 }
    );
  }
}