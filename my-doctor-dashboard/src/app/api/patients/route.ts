import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: { medications: true }
    })
    return NextResponse.json(patients)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
  }
}