"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { format } from 'date-fns'
import StatusBadge from "@/components/ui/StatusBadge"

interface Medication {
  id: number;
  name: string;
  dosage: string;
}

interface Patient {
  id: number;
  name: string;
  photo: string;
  phoneNumber: string;
  diagnosis: string;
  history: string;
  dischargeNotes: string | null;
  medications: Medication[];
}

interface CallSummary {
  id: number;
  patientId: number;
  dateTime: string;
  summary: string;
  nurse: string;
  nurseImage: string;
}
interface ScheduledCall {
  id: number;
  patientId: number;
  dateTime: string;
  questions: string;
  status: 'PENDING' | 'CALLING' | 'COMPLETE' | 'NO_ANSWER' | 'INCOMPLETE';
  nurse: string;
  calledTime?: string;
  completeTime?: string;
}

export default function EnhancedDoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([])
  const [callSummaries, setCallSummaries] = useState<CallSummary[]>([])
  const [dateTime, setDateTime] = useState<string>('') 
  const [newQuestion, setNewQuestion] = useState("")
  const [selectedNurse, setSelectedNurse] = useState<string>('')
  const [nurses] = useState(['AI Nurse - Chronic Heart Failure', 'AI Nurse - Stroke', 'AI Nurse - Chronic kidney disease']) 
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
    if (!selectedPatient || !dateTime || !selectedNurse) return

    try {
      const response = await fetch('/api/scheduled-calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: selectedPatient,
          dateTime,
          questions: JSON.stringify(questions),
          nurse: selectedNurse,
        }),
      })

      if (response.ok) {
        setDateTime('')
        setQuestions([])
        setSelectedNurse('')
        alert('Call scheduled successfully!')
        fetchScheduledCalls(selectedPatient)
      } else {
        throw new Error('Failed to schedule call')
      }
    } catch (error) {
      console.error('Error scheduling call:', error)
      alert('Failed to schedule call. Please try again.')
    }
  }

  const updateCallStatus = async (callId: number, status: string) => {
    const now = new Date().toISOString();
    const updateData: any = { id: callId, status };
    
    if (status === 'CALLING') {
      updateData.calledTime = now;
    } else if (status === 'COMPLETE' || status === 'NO_ANSWER' || status === 'INCOMPLETE') {
      updateData.completeTime = now;
    }

    try {
      const response = await fetch('/api/scheduled-calls', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        fetchScheduledCalls(selectedPatient!);
      } else {
        throw new Error('Failed to update call status');
      }
    } catch (error) {
      console.error('Error updating call status:', error);
      alert('Failed to update call status. Please try again.');
    }
  };

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
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Patient Information Card */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <Image
                        src={patients.find(p => p.id === selectedPatient)?.photo || '/images/patient-avatar.png'}
                        alt="Patient"
                        width={64}
                        height={64}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <CardTitle className="text-2xl">
                          {patients.find(p => p.id === selectedPatient)?.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {patients.find(p => p.id === selectedPatient)?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Diagnosis:</strong> {patients.find(p => p.id === selectedPatient)?.diagnosis}</p>
                    <p><strong>History:</strong> {patients.find(p => p.id === selectedPatient)?.history}</p>
                    <h3 className="font-semibold mt-4 mb-2">Medications:</h3>
                    <ul>
                      {patients.find(p => p.id === selectedPatient)?.medications.map(med => (
                        <li key={med.id}>
                          <strong>{med.name}:</strong> {med.dosage}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
  
                {/* Discharge Notes Card */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle>Discharge Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{patients.find(p => p.id === selectedPatient)?.dischargeNotes || 'No discharge notes available.'}</p>
                  </CardContent>
                </Card>
              </div>
  
              {/* Call Summaries Card */}
              <Card className="mb-6 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Call Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  {callSummaries.map(summary => (
                    <div key={summary.id} className="mb-4 border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Image
                          src={summary.nurseImage}
                          alt={summary.nurse}
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <p><strong>{summary.nurse}</strong> - {format(new Date(summary.dateTime), 'PPpp')}</p>                      </div>
                      <p>{summary.summary}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Scheduled Calls Card */}
            <Card className="mb-6 bg-white shadow-lg">
              <CardHeader>
              <CardTitle>Scheduled Calls</CardTitle>
      </CardHeader>
      <CardContent>
        {scheduledCalls.map(call => (
          <div key={call.id} className="mb-4 border-b pb-4">
            <p><strong>Date & Time:</strong> {format(new Date(call.dateTime), 'PPpp')}</p>
            <p><strong>Nurse:</strong> {call.nurse}</p>
            <div className="flex items-center">
              <strong className="mr-2">Status:</strong>
              <StatusBadge status={call.status} />
            </div>
            {call.calledTime && (
              <p><strong>Called Time:</strong> {format(new Date(call.calledTime), 'PPpp')}</p>
            )}
            {call.completeTime && (
              <p><strong>Complete Time:</strong> {format(new Date(call.completeTime), 'PPpp')}</p>
            )}
            <p><strong>Questions:</strong></p>
            <ul>
              {/* ... (questions rendering) */}
            </ul>
            {call.status === 'PENDING' && (
              <Button onClick={() => updateCallStatus(call.id, 'CALLING')}>Start Call</Button>
            )}
            {call.status === 'CALLING' && (
              <>
                <Button onClick={() => updateCallStatus(call.id, 'COMPLETE')}>Complete Call</Button>
                <Button onClick={() => updateCallStatus(call.id, 'NO_ANSWER')}>No Answer</Button>
                <Button onClick={() => updateCallStatus(call.id, 'INCOMPLETE')}>Incomplete</Button>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  
              {/* Schedule New Call Card */}
              <Card className="mb-6 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Schedule New Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="mb-4 p-2 border rounded"
                  />
                  <Select onValueChange={setSelectedNurse} value={selectedNurse}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select a nurse" />
          </SelectTrigger>
          <SelectContent>
            {nurses.map((nurse) => (
              <SelectItem key={nurse} value={nurse}>
                {nurse}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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