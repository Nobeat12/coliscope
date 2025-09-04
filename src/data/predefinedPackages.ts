
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "09.00648208605797",
    recipientName: "MANUEL Beck",
    phoneNumber: "",
    receiptLocation: "5703 Seon AG",
    receiptDate: "03-09-2025",
    deliveryLocation: "Rte de Lausanne 6.1432 Gressy",
    status: "Expédié",
    customerInfo: "APPLE AIRPODS MAX"
  },
  {
    trackingNumber: "60.00482.050057997",
    recipientName: "ANTONYO Lee John",
    phoneNumber: "",
    receiptLocation: "1227 Carouge",
    receiptDate: "03-09-2025",
    deliveryLocation: "Mätzistrasse 1, 3945 Gampel",
    status: "Expédié",
    customerInfo: "MacBook pro"
  },
  {
    trackingNumber: "840.06489205605797",
    recipientName: "FLORIAN Stadelmann",
    phoneNumber: "",
    receiptLocation: "1227 Carouge",
    receiptDate: "03-09-2025",
    deliveryLocation: "Frauentalstrasse 3, 6332 Hagendom",
    status: "Expédié",
    customerInfo: "Cerchi da 18" per VW T6 Multivan"
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
