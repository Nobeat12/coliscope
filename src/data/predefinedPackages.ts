
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "00965889828",
    recipientName: "Blanc Claude René",
    phoneNumber: "",
    receiptLocation: "Brugg AG",
    receiptDate: "16-04-2025",
    deliveryLocation: "Rue Gardiol n1 1218 grand saconnx Genève, Suisse",
    status: "En livraison",
    customerInfo: " IPHONE 15 PRO MAX"
  },
  {
    trackingNumber: "00096584789828",
    recipientName: "Baptiste Pujol",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "16-04-2025",
    deliveryLocation: "Chemin de Tourronde 4, 1009 Pully, Suisse",
    status: "Expédié",
    customerInfo: "Drohne DjI Avatar 2+ Dji FPV"
  },
  {
    trackingNumber: "96584789828",
    recipientName: "Halili Shkljkim",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "16-04-2025",
    deliveryLocation: "Haldenstrasse 6 8320 Fehraltorf, Suisse",
    status: "Expédié",
    customerInfo: "BMW Alufelgen 20Zoll Sommerreifen"
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
