
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "0092873639308",
    recipientName: "Papa Diop",
    phoneNumber: "",
    receiptLocation: "Genève",
    receiptDate: "29-05-2025",
    deliveryLocation: "Chemin des fins 10, 1218 grand Saconnex, Suisse",
    status: "Expédié",
    customerInfo: "Apple iPhone 15 Pro Max"
  },
  {
    trackingNumber: "0798689306428",
    recipientName: "NOUI FARID",
    phoneNumber: "",
    receiptLocation: "Pringy",
    receiptDate: "29-05-2025",
    deliveryLocation: "Chemin de la loue 30, 1663 pringy, Suisse",
    status: "Expédié",
    customerInfo: "Tissot Couturier  Powermatic 80"
  },
   {
    trackingNumber: "07986080306428",
    recipientName: "Fabian Meier",
    phoneNumber: "",
    receiptLocation: "Schneisingen",
    receiptDate: "29-05-2025",
    deliveryLocation: "Guggimoos 16 5425 Schneisingen, Suisse",
    status: "Expédié",
    customerInfo: "Tissot PRX Goldorak"
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
