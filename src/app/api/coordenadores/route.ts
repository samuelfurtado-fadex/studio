import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('DATABASE_URL (coordenadores):', process.env.DATABASE_URL);
  try {
    type ProjetoEmail = { email_coordenador: string | null };

    const projetos = (await prisma.projeto.findMany({
      select: {
        email_coordenador: true,
      },
      distinct: ['email_coordenador'],
    })) as ProjetoEmail[];

    const coordenadores = projetos
      .map((proj: ProjetoEmail) => ({ email: proj.email_coordenador }))
      .filter((coord): coord is { email: string } => Boolean(coord.email));
    return NextResponse.json(coordenadores);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch coordenadores' }, { status: 500 });
  }
}
