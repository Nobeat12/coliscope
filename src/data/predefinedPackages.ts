
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "97888079828",
    recipientName: "FATOS Xhemajli",
    phoneNumber: "",
    receiptLocation: "St.Moritz",
    receiptDate: "05-05-2025",
    deliveryLocation: "Schaffhauserstrasse 7, 8222 Beringen",
    status: "Expédié",
    customerInfo: "DYSON AIRSTRAIT"
  },
  {
    trackingNumber: "99788809828",
    recipientName: "Danil Olag",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "05-05-2025",
    deliveryLocation: "Avenue Reller 14, 1800 Vevey, Suisse",
    status: "Expédié",
    customerInfo: "60 Miles Long  Electric Scooter"
  },
  {
    trackingNumber: "990096809828",
    recipientName: "David Emanuel Pinto Santos",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "05-05-2025",
    deliveryLocation: "Chemin des narcisses 11, 2504 Bienne",
    status: "Expédié",
    customerInfo: "Tissot PRX Powermatic 80 Glacier Blue Dial 40 mm"
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
