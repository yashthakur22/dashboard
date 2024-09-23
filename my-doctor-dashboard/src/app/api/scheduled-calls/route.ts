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
      orderBy: { dateTime: 'desc' }
    })
    return NextResponse.json(scheduledCalls)
  } catch (error) {
    console.error('Error fetching scheduled calls:', error)
    return NextResponse.json({ error: 'Failed to fetch scheduled calls' }, { status: 500 })
  }
}

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

// New PUT method to update call status, calledTime, and completeTime
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, status, calledTime, completeTime } = body

  if (!id || !status) {
    return NextResponse.json({ error: 'Call ID and status are required' }, { status: 400 })
  }

  try {
    const updatedCall = await prisma.scheduledCall.update({
      where: { id: parseInt(id) },
      data: {
        status,
        calledTime: calledTime ? new Date(calledTime) : undefined,
        completeTime: completeTime ? new Date(completeTime) : undefined,
      }
    })
    return NextResponse.json(updatedCall)
  } catch (error) {
    console.error('Error updating call:', error)
    return NextResponse.json({ error: 'Failed to update call' }, { status: 500 })
  }
}