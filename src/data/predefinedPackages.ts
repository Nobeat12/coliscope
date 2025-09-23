
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "6445797.09",
    recipientName: "GONÇALO Dias Roque",
    phoneNumber: "",
    receiptLocation: "7270 Davos Platz",
    receiptDate: "19-09-2025",
    deliveryLocation: "Chemin d'en bas 12, 1912 leytron valais",
    status: "Expédié",
    customerInfo: "Apple iPhone 14 Pro Max"
  },
  {
    trackingNumber: "99.60.894482.05005797",
    recipientName: "SARAH Bernadette Luyet",
    phoneNumber: "",
    receiptLocation: "1024 Genève",
    receiptDate: "19-09-2025",
    deliveryLocation: "Av de la Gare 33, 1950 Sion",
    status: "Expédié",
    customerInfo: "KitchenAid artisan"
  },
  {
    trackingNumber: "840.06489295695797",
    recipientName: "MROZIK Bartosz Marek",
    phoneNumber: "",
    receiptLocation: "7270 Davos Platz",
    receiptDate: "18-09-2025",
    deliveryLocation: "Bachstrasse 13, Niederuzwil 9244",
    status: "Expédié",
    customerInfo: "ASUS GeForce RTX 5070 Ti Tuf"
  },
{
    trackingNumber: "99.44.776482.058857",
    recipientName: "SOMAR Alnawaqil",
    phoneNumber: "+41 78 616 61 18",
    receiptLocation: "7500 St. Moritz",
    receiptDate: "23-09-2025",
    deliveryLocation: "Rue du Vieux-Moulin 23, 1950 Sion, Suisse",
    status: "Expédié",
    customerInfo: "INSTA 360 GO 3S"
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
