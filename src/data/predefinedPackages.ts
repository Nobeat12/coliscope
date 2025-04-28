
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "0006508480828",
    recipientName: "Girol Steven",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "28-04-2025",
    deliveryLocation: "10 chemin des carrières, 1872 troistorrent, Suisse",
    status: "En livraison",
    customerInfo: "DJI OSMO POCKET 3"
  },
  {
    trackingNumber: "96508407828",
    recipientName: "Praise Sakanwi",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "25-04-2025",
    deliveryLocation: "Tannwaldstrasse 64, 4600 Olten, Suisse",
    status: "Expédié",
    customerInfo: "Synology 4-Bay NAS DiskStation DS920+"
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
