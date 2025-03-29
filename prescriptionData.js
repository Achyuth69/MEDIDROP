
export const prescriptions = [
  {
    id: "pres1",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "doc1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-06-15",
    medicines: [
      {
        medicineId: "med2",
        medicineName: "Amoxicillin",
        dosage: "500mg",
        duration: "7 days",
        instructions: "Take 1 tablet 3 times a day after meals"
      },
      {
        medicineId: "med1",
        medicineName: "Paracetamol",
        dosage: "500mg",
        duration: "3 days",
        instructions: "Take 1 tablet every 6 hours if experiencing fever"
      }
    ],
    notes: "Return in a week if symptoms persist",
    status: 'filled'
  },
  {
    id: "pres2",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "doc3",
    doctorName: "Dr. Maria Rodriguez",
    date: "2023-07-10",
    medicines: [
      {
        medicineId: "med3",
        medicineName: "Loratadine",
        dosage: "10mg",
        duration: "14 days",
        instructions: "Take 1 tablet daily in the morning"
      }
    ],
    notes: "Avoid allergens as discussed",
    status: 'pending'
  }
];
