
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "99.60006482.05005797",
    recipientName: "GIGAN Jean David",
    phoneNumber: "",
    receiptLocation: "1201 Genève",
    receiptDate: "19-08-2025",
    deliveryLocation: "Route de recolaine 13, 2824 visques",
    status: "Expédié",
    customerInfo: "DJI MINI 4 PRO FLY"
  },
  {
    trackingNumber: "60.06482.05005797",
    recipientName: "MATHIEU Rapin",
    phoneNumber: "",
    receiptLocation: "7270 Davos Platz",
    receiptDate: "21-08-2025",
    deliveryLocation: "Chemin derrière le cretex 1, 1865 Les Diablerets Vaud",
    status: "Expédié",
    customerInfo: "Base Wheels Shifter Handbrake"
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
