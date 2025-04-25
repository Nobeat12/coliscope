
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "0065084800828",
    recipientName: "Aron Mebrahtum",
    phoneNumber: "",
    receiptLocation: "Winterthur",
    receiptDate: "25-04-2025",
    deliveryLocation: "Chemin du château-sec 10, 1510 Moudon, Suisse",
    status: "En livraison",
    customerInfo: "Drone DJI mini 4 pro"
  },
  {
    trackingNumber: "006583479828",
    recipientName: "Traore Doussouba",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "25-04-2025",
    deliveryLocation: "Avenue des Grandes-Communes 64, 1213 Onex Genève, Suisse",
    status: "Expédié",
    customerInfo: "Iphone 13 pro max 128 GB"
  },
  {
    trackingNumber: "96508478828",
    recipientName: "Mark Stay",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "24-04-2025",
    deliveryLocation: "Sonnhaldensteig 10, 5070 Frick, Suisse",
    status: "Expédié",
    customerInfo: "Fujitsu Primergy RX2450 M1"
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
