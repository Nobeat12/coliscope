
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-78284428",
    recipientName: "Franco Steiner",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Zurich",
    receiptDate: "18-03-2025",
    deliveryLocation: "Golattenmattgasse 21,5000 Aarau",
    status: "Expédié",
    customerInfo: "IPAD PRO 13"
  },
  {
    trackingNumber: "CH-71025865",
    recipientName: "Bagnan Fontenla Aaliyah",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "2025-03-17",
    deliveryLocation: "route de sous-la-ville 8 1070 puidoux",
    status: "Expédié",
    customerInfo: "APPLE IPAD 12 PRO"
},
];

// Ajouter un nouveau colis prédéfini
export const addPredefinedPackage = (packageData: Package): Package => {
  predefinedPackages.push(packageData);
  return packageData;
};

// Créer un nouveau colis avec un numéro de suivi professionnel
export const createNewPackage = (
  recipientName: string,
  phoneNumber: string,
  receiptLocation: string,
  receiptDate: string,
  deliveryLocation: string,
  status: string,
  customerInfo: string = ""
): Package => {
  const index = predefinedPackages.length;
  const trackingNumber = generateProfessionalTrackingNumber(index);
  
  const newPackage: Package = {
    trackingNumber,
    recipientName,
    phoneNumber,
    receiptLocation,
    receiptDate,
    deliveryLocation,
    status,
    customerInfo
  };
  
  return addPredefinedPackage(newPackage);
};

// Pour faciliter le débogage, affiche tous les numéros de suivi dans la console
export const logTrackingNumbers = () => {
  console.log("Numéros de suivi disponibles :");
  predefinedPackages.forEach((pkg, index) => {
    console.log(`${index + 1}: ${pkg.trackingNumber}`);
  });
};

// Fonction pour obtenir la liste des numéros de suivi uniquement
export const getTrackingNumbers = (): string[] => {
  return predefinedPackages.map(pkg => pkg.trackingNumber);
};
