
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "009280536093080",
    recipientName: "Anna-Katrina Jenni",
    phoneNumber: "",
    receiptLocation: "Moosleerau",
    receiptDate: "16-06-2025",
    deliveryLocation: "Unterdorfstrasse 418, 5054 Moosleerau,Schweiz",
    status: "Expédié",
    customerInfo: "Bernina B325 Computer Näh­ma­schi­ne"
  },
  {
    trackingNumber: "079868499756428",
    recipientName: "Fidan Jashari",
    phoneNumber: "",
    receiptLocation: "Zurich",
    receiptDate: "16-06-2025",
    deliveryLocation: "Murwiesenstrasse 29, 8057 Zụ̈rich, Schweiz",
    status: "Expédié",
    customerInfo: "Zipp 454 NSW Tubelless Disc"
  },
  {
    trackingNumber: "00876349302754",
    recipientName: "Nazlican Demir",
    phoneNumber: "",
    receiptLocation: "Gretzenbach",
    receiptDate: "016-06-2025",
    deliveryLocation: "Staldenacker 15, 5015 Gretzenbach, Schweiz",
    status: "Expédié",
    customerInfo: "Dyson airtrair"
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
