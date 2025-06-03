
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "00092836393080",
    recipientName: "Ivo Kovacevic",
    phoneNumber: "",
    receiptLocation: "Beinwil am See",
    receiptDate: "03-06-2025",
    deliveryLocation: "Badstrasse 9 4552 Derendingen Solothurn, Suisse",
    status: "Expédié",
    customerInfo: "Trottinette électrique"
  },
  {
    trackingNumber: "0798680406428",
    recipientName: "DAI Long Pham",
    phoneNumber: "",
    receiptLocation: "Köniz",
    receiptDate: "02-06-2025",
    deliveryLocation: "Finkenweg 2, 3098 Köniz, Suisse",
    status: "Expédié",
    customerInfo: "IPHONE 12 256GB"
  },
  {
    trackingNumber: "0087634902754",
    recipientName: "Hermes Buttigliero",
    phoneNumber: "",
    receiptLocation: "Bern",
    receiptDate: "03-06-2025",
    deliveryLocation: "Eigerstrasse 22, 3007 Bern, Suisse",
    status: "Expédié",
    customerInfo: "E-Bike-Trekking"
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
