
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH.99.44.776482.05885707",
    recipientName: "ARNAUD Hirt",
    phoneNumber: "+41 76 616 17 07",
    receiptLocation: "7500 St. Moritz",
    receiptDate: "13-10-2025",
    deliveryLocation: "Chemin du pré de Lug 4, 1258 Perly",
    status: "Expédié",
    customerInfo: "GARMIN EDGE 1050"
  },
  
{
    trackingNumber: "99.44.776482.05885707.041.CH",
    recipientName: "André Stern",
    phoneNumber: "",
    receiptLocation: "1213 petit-lancy",
    receiptDate: "09-10-2025",
    deliveryLocation: "Rte de Chaffeiru 32, 1745 Lentigny",
    status: "Expédié",
    customerInfo: "Home Trainer"
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
