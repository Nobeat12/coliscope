
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "009287293038",
    recipientName: "Beda Morger",
    phoneNumber: "",
    receiptLocation: "Poschiavo",
    receiptDate: "15-05-2025",
    deliveryLocation: "Giacomettistrasse 75, 7000 Chur, Suisse",
    status: "Expédié",
    customerInfo: "Onewheel Pinte S"
  },
   {
    trackingNumber: "009863626667400",
    recipientName: "Chatri Peter Rutz",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "14-05-2025",
    deliveryLocation: "Schulstrasse 1, 8583 Donzhausen, Suisse",
    status: "Expédié",
    customerInfo: "Mac Studio M1 Ultra – 128GB RAM / 1TB SSD"
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
