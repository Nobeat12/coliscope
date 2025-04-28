
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
    trackingNumber: "965708407828",
    recipientName: "Mateo Bosnjak",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "28-04-2025",
    deliveryLocation: "Schulweg 2, 6285 Hitzkirch, Suisse",
    status: "Expédié",
    customerInfo: "Drone DJI mini 4 pro"
  },
  {
    trackingNumber: "65708407828",
    recipientName: "Daniela Dudli",
    phoneNumber: "",
    receiptLocation: "Prilly",
    receiptDate: "28-04-2025",
    deliveryLocation: "Hummelbühl 2056, 9643 Krummenau, Prilly",
    status: "Expédié",
    customerInfo: "Dyson v15 Staubsauger"
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
