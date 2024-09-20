import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.scheduledCall.deleteMany({})
  await prisma.callSummary.deleteMany({})
  await prisma.medication.deleteMany({})
  await prisma.patient.deleteMany({})

  const john = await prisma.patient.create({
    data: {
      name: "John Doe",
      photo: "/images/patient-avatar.png",
      phoneNumber: "+1 (555) 123-4567",
      diagnosis: "CHF",
      history: "Diagnosed with CHF 3 years ago. History of hypertension and coronary artery disease.",
      dischargeNotes: "Patient discharged with stable condition. Follow-up appointment scheduled in 2 weeks.",
      medications: {
        create: [
          { name: "Lisinopril", dosage: "10mg daily" },
          { name: "Carvedilol", dosage: "6.25mg twice daily" },
          { name: "Furosemide", dosage: "40mg daily" }
        ]
      },
      callSummaries: {
        create: [
          {
            dateTime: new Date("2023-06-01T14:30:00Z"),
            summary: "Patient reported increased shortness of breath. Advised on fluid intake and weight monitoring. Scheduled in-person follow-up.",
            nurse: "AI Nurse Sarah",
            nurseImage: "/images/nurse-sarah.png"
          },
          {
            dateTime: new Date("2023-05-15T10:00:00Z"),
            summary: "Patient adhering to medication regimen. No significant changes in symptoms. Encouraged continued compliance with low-sodium diet.",
            nurse: "AI Nurse John",
            nurseImage: "/images/nurse-john.png"
          }
        ]
      }
    }
  })

  const jane = await prisma.patient.create({
    data: {
      name: "Jane Smith",
      photo: "/images/patient-avatar.png",
      phoneNumber: "+1 (555) 987-6543",
      diagnosis: "Stroke",
      history: "Suffered an ischemic stroke 6 months ago. Undergoing rehabilitation and secondary prevention.",
      dischargeNotes: "Patient discharged to rehabilitation facility. Continued physical and speech therapy recommended.",
      medications: {
        create: [
          { name: "Aspirin", dosage: "81mg daily" },
          { name: "Atorvastatin", dosage: "40mg daily" },
          { name: "Clopidogrel", dosage: "75mg daily" }
        ]
      },
      callSummaries: {
        create: [
          {
            dateTime: new Date("2023-06-02T11:15:00Z"),
            summary: "Patient showing good progress in speech therapy. Reported occasional headaches. Advised on sleep hygiene and stress management.",
            nurse: "AI Nurse Emma",
            nurseImage: "/images/nurse-emma.png"
          }
        ]
      }
    }
  })

  const alice = await prisma.patient.create({
    data: {
      name: "Alice Johnson",
      photo: "/images/patient-avatar.png",
      phoneNumber: "+1 (555) 246-8135",
      diagnosis: "CKD",
      history: "Stage 3 CKD, likely due to long-standing hypertension and diabetes. eGFR 45 mL/min/1.73m².",
      dischargeNotes: "Patient discharged with dietary and medication instructions. Monthly follow-up appointments scheduled.",
      medications: {
        create: [
          { name: "Losartan", dosage: "50mg daily" },
          { name: "Metformin", dosage: "500mg twice daily" },
          { name: "Calcitriol", dosage: "0.25mcg daily" }
        ]
      },
      callSummaries: {
        create: [
          {
            dateTime: new Date("2023-06-03T09:45:00Z"),
            summary: "Patient's blood pressure well-controlled. Discussed importance of limiting protein intake. Scheduled routine blood work.",
            nurse: "AI Nurse Sarah",
            nurseImage: "/images/nurse-sarah.png"
          }
        ]
      }
    }
  })
  
  await prisma.scheduledCall.create({
    data: {
      patientId: john.id,
      dateTime: new Date("2023-06-10T15:00:00Z"),
      questions: JSON.stringify(["How are you feeling today?", "Have you been taking your medications as prescribed?"]),
      status: "PENDING",
      nurse: "AI Nurse Sarah"
    }
  })

  console.log({ john, jane, alice })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })