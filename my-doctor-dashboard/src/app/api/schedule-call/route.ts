import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { patientId, date, questions } = body

  if (!patientId || !date) {
    return NextResponse.json({ error: 'Patient ID and date are required' }, { status: 400 })
  }

  try {
    const scheduledCall = await prisma.scheduledCall.create({
      data: {
        patientId: parseInt(patientId),
        date: new Date(date),
        questions: JSON.stringify(questions)
      }
    })
    return NextResponse.json(scheduledCall)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to schedule call' }, { status: 500 })
  }
}