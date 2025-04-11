
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
     trackingNumber: "CH-9890089828",
    recipientName: "Thiyagarasan Krishnamenan",
    phoneNumber: "",
    receiptLocation: "Prilly",
    receiptDate: "11-04-2025",
    deliveryLocation: "Bärenweg 4c, 3504 Thun, Suisse",
    status: "Expédié",
    customerInfo: "DJI OSMO POCKET 3"
  },
  {  trackingNumber: "CH-599079828",
    recipientName: "AISSATOU Bella Diallo",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "09-04-2025",
    deliveryLocation: "rue vieux chênes 5, 1700 Fribourg, Suisse",
    status: "Expédié",
    customerInfo: "APPLE IPHONE 16 PRO MAX"
  },
  {  trackingNumber: "CH-59979828",
    recipientName: "François Fernandez",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "09-04-2025",
    deliveryLocation: "Av. Granges-Paccot 14, 1700 Fribourg, Suisse",
    status: "Expédié",
    customerInfo: "Apple Mac Studio M2 Max"
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
