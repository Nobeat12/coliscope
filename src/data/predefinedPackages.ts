
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
   {
    trackingNumber: "00092934026393038",
    recipientName: "Carole Jaccard ",
    phoneNumber: "",
    receiptLocation: "Yvonand",
    receiptDate: "21-05-2025",
    deliveryLocation: "Avenue des pins 25, 1462 Yvonand, Suisse",
    status: "Expédié",
    customerInfo: "Drone DJI mini 4 pro"
  },
  {
    trackingNumber: "00928726393038",
    recipientName: "Tanguy CavercasioSaga  ",
    phoneNumber: "",
    receiptLocation: "Trogen",
    receiptDate: "21-05-2025",
    deliveryLocation: "Avenue de la gare 41, 1003 Lausanne, Suisse",
    status: "Expédié",
    customerInfo: "Sony Alpha ILME FX3 Vollformat"
  },
   {
    trackingNumber: "009972786667400",
    recipientName: "THÜRING Simon",
    phoneNumber: "",
    receiptLocation: "Ettingen",
    receiptDate: "21-05-2025",
    deliveryLocation: "4107 Ettingen, Schweiz",
    status: "Expédié",
    customerInfo: "DJI AVATA 2"
  },{
    trackingNumber: "008609866077",
    recipientName: "Patrice Castelli",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "21-05-2025",
    deliveryLocation: "Chemin de Chante-Bise 2, 1040 Villars-le-Terroir, Suisse",
    status: "Expédié",
    customerInfo: "Sony FE 200-600 mm f/5,6-6,3 G"
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
