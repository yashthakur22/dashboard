"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface Medication {
  id: number;
  name: string;
  dosage: string;
  image: string;
}

interface Patient {
  id: number;
  name: string;
  photo: string;
  diagnosis: string;
  history: string;
  medications: Medication[];
}

interface CallSummary {
  id: number;
  patientId: number;
  date: string;
  summary: string;
  nurse: string;
}
interface ScheduledCall {
  id: number;
  patientId: number;
  date: string;
  questions: string;
}

export default function EnhancedDoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([])
  const [callSummaries, setCallSummaries] = useState<CallSummary[]>([])
  const [date, setDate] = useState<string>('')
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<string[]>([])

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      fetchScheduledCalls(selectedPatient)
    }
  }, [selectedPatient])

  useEffect(() => {
    if (selectedPatient) {
      fetchCallSummaries(selectedPatient)
    }
  }, [selectedPatient])
  

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients')
      if (!response.ok) {
        throw new Error('Failed to fetch patients')
      }
      const data = await response.json()
      setPatients(data)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    }
  }

  const fetchCallSummaries = async (patientId: number) => {
    try {
      const response = await fetch(`/api/call-summaries?patientId=${patientId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch call summaries')
      }
      const data = await response.json()
      setCallSummaries(data)
    } catch (error) {
      console.error('Failed to fetch call summaries:', error)
    }
  }
  const fetchScheduledCalls = async (patientId: number) => {
    try {
      const response = await fetch(`/api/scheduled-calls?patientId=${patientId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch scheduled calls')
      }
      const data = await response.json()
      setScheduledCalls(data)
    } catch (error) {
      console.error('Failed to fetch scheduled calls:', error)
    }
  }
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion.trim()])
      setNewQuestion("")
    }
  }

  const handleScheduleCall = async () => {
    if (!selectedPatient || !date) return

    try {
      const response = await fetch('/api/schedule-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: selectedPatient,
          date,
          questions,
        }),
      })

      if (response.ok) {
        setDate('')
        setQuestions([])
        alert('Call scheduled successfully!')
        // Optionally, refresh call summaries here
        fetchCallSummaries(selectedPatient)
      } else {
        throw new Error('Failed to schedule call')
      }
    } catch (error) {
      console.error('Error scheduling call:', error)
      alert('Failed to schedule call. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="bg-white overflow-auto border-r w-48">
          {patients.map(patient => (
            <Button
              key={patient.id}
              variant="ghost"
              className={`w-full p-3 justify-start text-left transition-all duration-300 ${selectedPatient === patient.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <div className="flex items-center">
                <Image
                  src={patient.photo}
                  alt={patient.name}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
                <div>
                  <span className="font-medium">{patient.name}</span>
                  <span className="block text-xs text-gray-500">{patient.diagnosis}</span>
                </div>
              </div>
            </Button>
          ))}
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          {selectedPatient && (
            <div className="max-w-4xl mx-auto">
              <Card className="mb-6 bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <Image
                      src={patients.find(p => p.id === selectedPatient)?.photo || '/images/patient-avatar.png'}
                      alt="Patient"
                      width={64}
                      height={64}
                      className="rounded-full mr-4"
                    />
                    <CardTitle className="text-2xl">
                      {patients.find(p => p.id === selectedPatient)?.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p><strong>Diagnosis:</strong> {patients.find(p => p.id === selectedPatient)?.diagnosis}</p>
                  <p><strong>History:</strong> {patients.find(p => p.id === selectedPatient)?.history}</p>
                  <h3 className="font-semibold mt-4 mb-2">Medications:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {patients.find(p => p.id === selectedPatient)?.medications.map(med => (
                      <div key={med.id} className="flex items-center space-x-2">
                        <Image src={med.image} alt={med.name} width={32} height={32} />
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-500">{med.dosage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Call Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  {callSummaries.map(summary => (
                    <div key={summary.id} className="mb-4 border-b pb-4">
                      <p><strong>Date:</strong> {new Date(summary.date).toLocaleDateString()}</p>
                      <p><strong>Nurse:</strong> {summary.nurse}</p>
                      <p>{summary.summary}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mb-6 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Schedule New Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-4 p-2 border rounded"
                  />
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="New question"
                      className="p-2 border rounded mr-2"
                    />
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                  </div>
                  <ul className="mb-4">
                    {questions.map((q, index) => (
                      <li key={index}>{q}</li>
                    ))}
                  </ul>
                  <Button onClick={handleScheduleCall} className="w-full">Schedule Call</Button>
                </CardContent>
              </Card>
              <Card className="mb-6 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Scheduled Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledCalls.length > 0 ? (
              scheduledCalls.map(call => (
                <div key={call.id} className="mb-4 border-b pb-4">
                  <p><strong>Date:</strong> {new Date(call.date).toLocaleDateString()}</p>
                  <p><strong>Questions:</strong></p>
                  <ul>
                    {JSON.parse(call.questions).map((q: string, index: number) => (
                      <li key={index}>{q}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No scheduled calls for this patient.</p>
            )}
          </CardContent>
        </Card>
            </div>
          )}
          {!selectedPatient && (
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl text-gray-400">Select a patient to view details</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}