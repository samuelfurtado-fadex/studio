import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const solicitacoes = await prisma.solicitacoes.findMany({
      include: {
        projeto: true,
        rubrica: true,
        status: true,
        dupla: true,
        supridor: true,
      },
    });
    return NextResponse.json(solicitacoes);
  } catch (error)
{
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch alertas' }, { status: 500 });
  }
}
