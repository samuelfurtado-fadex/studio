import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const projetos = await prisma.projeto.findMany();
    return NextResponse.json(projetos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projetos' }, { status: 500 });
  }
}
