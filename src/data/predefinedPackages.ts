
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "09.00644820605797",
    recipientName: "Lucas Duarte",
    phoneNumber: "",
    receiptLocation: "3007 Bem",
    receiptDate: "11-09-2025",
    deliveryLocation: "Chemin du québec 43, 1214 Vernier",
    status: "Expédié",
    customerInfo: "GARMIN EDGE 1050"
  },
  {
    trackingNumber: "99.60.994482.05005797",
    recipientName: "Lionel Wüthrich",
    phoneNumber: "",
    receiptLocation: "7500 St Moritz",
    receiptDate: "12-09-2025",
    deliveryLocation: "Chemin de Lizet 8 1026 Echandens",
    status: "Expédié",
    customerInfo: "DJI mini 4 Pro"
  },
  {
    trackingNumber: "840.06489295605797",
    recipientName: "Aditya Bhaty",
    phoneNumber: "",
    receiptLocation: "1206 Genève",
    receiptDate: "10-09-2025",
    deliveryLocation: "Taj restaurant Länggassstrasse, 43 3012 Bern",
    status: "Expédié",
    customerInfo: "MacBook pro"
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
