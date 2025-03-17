
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-78284428",
    recipientName: "Daniel kùchler",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Zurich",
    receiptDate: "17-03-2025",
    deliveryLocation: "Place de la Gare, Voie 1 Gare de Lausanne 5A, 1003 Lausanne",
    status: "Expédié",
    customerInfo: "IPAD PRO 13"
  },
  {
    trackingNumber: "CH-765078542",
    recipientName: "Danijela Lazic",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "2025-03-06",
    deliveryLocation: "Waldmeisterstrasse 18, 8953 Dietikon",
    status: "Expédié",
    customerInfo: "Louis Vuitton Speedy 30"
},
  {
    trackingNumber: "CH-807764307",
    recipientName: "GROSU Cătălin",
    phoneNumber: "+41772788512",
    receiptLocation: "Bellinzona",
    receiptDate: "2025-03-15",
    deliveryLocation: "Saint Etienne Nº 3, Le Châble 1934",
    status: "Expédié",
    customerInfo: "SAMSUNG GALAXY S23 ULTRA"
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
