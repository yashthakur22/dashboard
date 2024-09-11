import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patientId')

  if (!patientId) {
    return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 })
  }

  try {
    const scheduledCalls = await prisma.scheduledCall.findMany({
      where: { patientId: parseInt(patientId) },
      orderBy: { date: 'asc' }
    })
    return NextResponse.json(scheduledCalls)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch scheduled calls' }, { status: 500 })
  }
}