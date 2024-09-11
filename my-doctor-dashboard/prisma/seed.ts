import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // John Doe (existing patient)
  const john = await prisma.patient.create({
    data: {
      name: "John Doe",
      photo: "/images/patient-avatar.png",
      diagnosis: "CHF",
      history: "Diagnosed with CHF 3 years ago. History of hypertension and coronary artery disease.",
      medications: {
        create: [
          { name: "Lisinopril", dosage: "10mg daily", image: "/images/medications/lisinopril.png" },
          { name: "Carvedilol", dosage: "6.25mg twice daily", image: "/images/medications/carvedilol.png" },
          { name: "Furosemide", dosage: "40mg daily", image: "/images/medications/furosemide.png" }
        ]
      },
      callSummaries: {
        create: [
          {
            date: new Date("2023-06-01"),
            summary: "Patient reported increased shortness of breath. Advised on fluid intake and weight monitoring. Scheduled in-person follow-up.",
            nurse: "AI Nurse Sarah",
            nurseImage: "/images/nurse-avatar.png"
          },
          {
            date: new Date("2023-05-15"),
            summary: "Patient adhering to medication regimen. No significant changes in symptoms. Encouraged continued compliance with low-sodium diet.",
            nurse: "AI Nurse John", 
            nurseImage: "/images/nurse-avatar.png"
          }
        ]
      }
    }
  })

  // Jane Smith (new patient)
  const jane = await prisma.patient.create({
    data: {
      name: "Jane Smith",
      photo: "/images/patient-avatar.png",
      diagnosis: "Stroke",
      history: "Suffered an ischemic stroke 6 months ago. Undergoing rehabilitation and secondary prevention.",
      medications: {
        create: [
          { name: "Aspirin", dosage: "81mg daily", image: "/images/medications/aspirin.png" },
          { name: "Atorvastatin", dosage: "40mg daily", image: "/images/medications/atorvastatin.png" },
          { name: "Clopidogrel", dosage: "75mg daily", image: "/images/medications/clopidogrel.png" }
        ]
      },
      callSummaries: {
        create: [
          {
            date: new Date("2023-06-02"),
            summary: "Patient showing good progress in speech therapy. Reported occasional headaches. Advised on sleep hygiene and stress management.",
            nurse: "AI Nurse Emma", 
            nurseImage: "/images/nurse-avatar.png"
          }
        ]
      }
    }
  })

  // Alice Johnson (new patient)
  const alice = await prisma.patient.create({
    data: {
      name: "Alice Johnson",
      photo: "/images/patient-avatar.png",
      diagnosis: "CKD",
      history: "Stage 3 CKD, likely due to long-standing hypertension and diabetes. eGFR 45 mL/min/1.73m².",
      medications: {
        create: [
          { name: "Losartan", dosage: "50mg daily", image: "/images/medications/losartan.png" },
          { name: "Metformin", dosage: "500mg twice daily", image: "/images/medications/metformin.png" },
          { name: "Calcitriol", dosage: "0.25mcg daily", image: "/images/medications/calcitriol.png" }
        ]
      },
      callSummaries: {
        create: [
          {
            date: new Date("2023-06-01"),
            summary: "Patient reported increased shortness of breath. Advised on fluid intake and weight monitoring. Scheduled in-person follow-up.",
            nurse: "AI Nurse Sarah",
            nurseImage: "/images/nurse-avatar.png",  
          },
          {
            date: new Date("2023-05-15"),
            summary: "Patient adhering to medication regimen. No significant changes in symptoms. Encouraged continued compliance with low-sodium diet.",
            nurse: "AI Nurse John",
            nurseImage: "/images/nurse-avatar.png"
          }
        ]
      }
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