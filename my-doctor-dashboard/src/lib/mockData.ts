const standardPatientImage = "/images/patient-avatar.png";
const standardNurseImage = "/images/nurse-avatar.png";

export const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    photo: standardPatientImage,
    diagnosis: "CHF",
    history: "Diagnosed with CHF 3 years ago. History of hypertension and coronary artery disease.",
    medications: [
      { id: 1, name: "Lisinopril", dosage: "10mg daily", image: "/images/medications/lisinopril.png" },
      { id: 2, name: "Carvedilol", dosage: "6.25mg twice daily", image: "/images/medications/carvedilol.png" },
      { id: 3, name: "Furosemide", dosage: "40mg daily", image: "/images/medications/furosemide.png" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: standardPatientImage,
    diagnosis: "Stroke",
    history: "Suffered an ischemic stroke 6 months ago. Undergoing rehabilitation and secondary prevention.",
    medications: [
      { id: 4, name: "Aspirin", dosage: "81mg daily", image: "/images/medications/aspirin.png" },
      { id: 5, name: "Atorvastatin", dosage: "40mg daily", image: "/images/medications/atorvastatin.png" },
      { id: 6, name: "Clopidogrel", dosage: "75mg daily", image: "/images/medications/clopidogrel.png" }
    ]
  },
  {
    id: 3,
    name: "Alice Johnson",
    photo: standardPatientImage,
    diagnosis: "CKD",
    history: "Stage 3 CKD, likely due to long-standing hypertension and diabetes. eGFR 45 mL/min/1.73m².",
    medications: [
      { id: 7, name: "Losartan", dosage: "50mg daily", image: "/images/medications/losartan.png" },
      { id: 8, name: "Metformin", dosage: "500mg twice daily", image: "/images/medications/metformin.png" },
      { id: 9, name: "Calcitriol", dosage: "0.25mcg daily", image: "/images/medications/calcitriol.png" }
    ]
  },
];

export const mockCallSummaries = [
  { id: 1, patientId: 1, date: "2023-06-01", summary: "Patient reported increased shortness of breath. Advised on fluid intake and weight monitoring. Scheduled in-person follow-up.", nurse: "AI Nurse Sarah", nurseImage: standardNurseImage },
  { id: 2, patientId: 1, date: "2023-05-15", summary: "Patient adhering to medication regimen. No significant changes in symptoms. Encouraged continued compliance with low-sodium diet.", nurse: "AI Nurse John", nurseImage: standardNurseImage },
  { id: 3, patientId: 2, date: "2023-06-02", summary: "Patient showing good progress in speech therapy. Reported occasional headaches. Advised on sleep hygiene and stress management.", nurse: "AI Nurse Emma", nurseImage: standardNurseImage },
  { id: 4, patientId: 3, date: "2023-06-03", summary: "Patient's blood pressure well-controlled. Discussed importance of limiting protein intake. Scheduled routine blood work.", nurse: "AI Nurse Sarah", nurseImage: standardNurseImage },
];