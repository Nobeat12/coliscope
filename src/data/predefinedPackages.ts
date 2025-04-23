
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "0065084807828",
    recipientName: "BRIGITTE Ruf",
    phoneNumber: "",
    receiptLocation: "Winterthur",
    receiptDate: "22-04-2025",
    deliveryLocation: "Bruggerstrasse 74 C, 5102 Rupperswil, Suisse",
    status: "En livraison",
    customerInfo: "APPLE IPHONE 14"
  },
  {
    trackingNumber: "0006583479828",
    recipientName: "Florian Sylejmanj",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "23-04-2025",
    deliveryLocation: "Ahornstrasse 4 6300 Zug, Suisse",
    status: "Expédié",
    customerInfo: "Drone DJI Mini 3 Pro"
  },
  {
    trackingNumber: "9658478828",
    recipientName: "Tiago Soares",
    phoneNumber: "",
    receiptLocation: "Aarau",
    receiptDate: "18-04-2025",
    deliveryLocation: "Dorfstrasse 12, 8037 zurich, Suisse",
    status: "Expédié",
    customerInfo: "Drone DJI mini 4 pro"
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
