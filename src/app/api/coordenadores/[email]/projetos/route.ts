import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);
    const projetos = await prisma.projeto.findMany({
      where: {
        email_coordenador: email,
      },
    });
    return NextResponse.json(projetos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projetos for coordinator' }, { status: 500 });
  }
}
