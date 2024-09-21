import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { patientId, dateTime, questions, nurse } = body

  if (!patientId || !dateTime || !nurse) {
    return NextResponse.json({ error: 'Patient ID, date/time, and nurse are required' }, { status: 400 })
  }

  try {
    const scheduledCall = await prisma.scheduledCall.create({
      data: {
        patientId: parseInt(patientId),
        dateTime: new Date(dateTime),
        questions: JSON.stringify(questions),
        status: 'PENDING',
        nurse: nurse,
      }
    })
    return NextResponse.json(scheduledCall)
  } catch (error) {
    console.error('Error scheduling call:', error)
    return NextResponse.json({ error: 'Failed to schedule call' }, { status: 500 })
  }
}