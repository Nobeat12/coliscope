
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "60.00648205605797",
    recipientName: "MATHIAS Swaenen",
    phoneNumber: "",
    receiptLocation: "9000 St. Gallen",
    receiptDate: "25-08-2025",
    deliveryLocation: "Rue du Valentin 30, 1004 Lausanne",
    status: "Expédié",
    customerInfo: "Thule EasyFold XT 2"
  },
  {
    trackingNumber: "60.06482.050057997",
    recipientName: "ANDREOLI Florence",
    phoneNumber: "",
    receiptLocation: "1008 Prilly",
    receiptDate: "25-08-2025",
    deliveryLocation: "chemin de Closel 3c, 1588 Cudrefin",
    status: "Expédié",
    customerInfo: "Canapé 3 pièce Togo"
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
