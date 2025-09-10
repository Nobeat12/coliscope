
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "09.0064820605797",
    recipientName: "MOHAMMED Rafi Afzali",
    phoneNumber: "",
    receiptLocation: "7270 Davos Platz",
    receiptDate: "08-09-2025",
    deliveryLocation: "Bahnhofstrasse 5, 8953 Dietikon",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S25 Ultra"
  },
  {
    trackingNumber: "60.90482.050057997",
    recipientName: "Davide Marinaci",
    phoneNumber: "",
    receiptLocation: "3013 Bern",
    receiptDate: "04-09-2025",
    deliveryLocation: "Rue Des eaux vives 25, 1207 Genève",
    status: "Expédié",
    customerInfo: "Garmin edge 1050"
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
