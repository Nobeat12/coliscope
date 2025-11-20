import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "99.0976.8768787563CH",
    recipientName: "Lella Rossi",
    phoneNumber: "",
    receiptLocation: "9000 st gallen",
    receiptDate: "18-11-2025",
    deliveryLocation: "19 rue du Môle, 1201 Genève",
    status: "En cours de livraison",
    customerInfo: "HOME TRAINER"
  },
{
    trackingNumber: "99.0976.8768987563CH",
    recipientName: "Alfredo Modica",
    phoneNumber: "",
    receiptLocation: "9000 st gallen",
    receiptDate: "20-11-2025",
    deliveryLocation: "Rue du vieux canal 1 1227 Genève",
    status: "Expédié",
    customerInfo: "Tissot PRX Uhr"
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
