// src/app/api/projetos/route.ts
import { NextResponse } from 'next/server';
import { getProjectsFromDB } from '@/services/projectService';

export async function GET() {
  try {
    const projetos = await getProjectsFromDB();
    return NextResponse.json(projetos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
