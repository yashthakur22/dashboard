import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patientId')

  if (!patientId) {
    return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 })
  }

  try {
    const callSummaries = await prisma.callSummary.findMany({
      where: { patientId: parseInt(patientId) }
    })
    return NextResponse.json(callSummaries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch call summaries' }, { status: 500 })
  }
}