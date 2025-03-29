
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  requiresPrescription: boolean;
  inStock: boolean;
  image?: string;
  manufacturer: string;
}

export const medicines: Medicine[] = [
  {
    id: "med1",
    name: "Paracetamol",
    description: "Pain reliever and fever reducer",
    price: 5.99,
    category: "Pain Relief",
    requiresPrescription: false,
    inStock: true,
    manufacturer: "MediCorp"
  },
  {
    id: "med2",
    name: "Amoxicillin",
    description: "Antibiotic for bacterial infections",
    price: 12.99,
    category: "Antibiotics",
    requiresPrescription: true,
    inStock: true,
    manufacturer: "PharmaCare"
  },
  {
    id: "med3",
    name: "Loratadine",
    description: "Antihistamine for allergies",
    price: 8.49,
    category: "Allergy",
    requiresPrescription: false,
    inStock: true,
    manufacturer: "AllergyShield"
  },
  {
    id: "med4",
    name: "Insulin",
    description: "Hormone for regulating blood glucose",
    price: 45.99,
    category: "Diabetes",
    requiresPrescription: true,
    inStock: true,
    manufacturer: "DiabeCare"
  },
  {
    id: "med5",
    name: "Lisinopril",
    description: "ACE inhibitor for blood pressure",
    price: 15.99,
    category: "Cardiovascular",
    requiresPrescription: true,
    inStock: true,
    manufacturer: "HeartWell"
  },
  {
    id: "med6",
    name: "Vitamin D",
    description: "Supplement for bone health",
    price: 7.99,
    category: "Supplements",
    requiresPrescription: false,
    inStock: true,
    manufacturer: "VitaPlus"
  },
  {
    id: "med7",
    name: "Omeprazole",
    description: "Proton pump inhibitor for acid reflux",
    price: 10.99,
    category: "Gastrointestinal",
    requiresPrescription: false,
    inStock: true,
    manufacturer: "GastroHealth"
  },
  {
    id: "med8",
    name: "Atorvastatin",
    description: "Statin for lowering cholesterol",
    price: 18.99,
    category: "Cardiovascular",
    requiresPrescription: true,
    inStock: false,
    manufacturer: "LipidCare"
  }
];
