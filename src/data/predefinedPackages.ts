
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-76898428",
    recipientName: "Younes sarghini",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "25-03-2025",
    deliveryLocation: "rue de l’étoile 21, 01200 bellegarde sur valserine, France",
    status: "Expédié",
    customerInfo: "DRONE DJI MINI 4 PRO"
  },{
    trackingNumber: "CH-96808428",
    recipientName: "Tesfahiwet Andemicheal",
    phoneNumber: "",
    receiptLocation: "Prilly",
    receiptDate: "24-03-2025",
    deliveryLocation: "Qeullmattstrasse 78, 5035 unterentenfelden, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S24 Ultra"
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
