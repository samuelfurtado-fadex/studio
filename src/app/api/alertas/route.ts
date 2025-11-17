// src/app/api/alertas/route.ts
import { NextResponse } from 'next/server';
import { getAlertsFromDB } from '@/services/alertService';

export async function GET() {
  try {
    const alertas = await getAlertsFromDB();
    return NextResponse.json(alertas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
