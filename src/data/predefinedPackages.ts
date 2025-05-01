
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "07840709828",
    recipientName: "BIEDERMANN Fabienne",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "01-05-2025",
    deliveryLocation: "Route De Grandvaux 42, 1072 Forel Lavaux, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S22 Ultra"
  },
  {
    trackingNumber: "0009965077828",
    recipientName: "Da Silva Tavares Joana",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "01-05-2025",
    deliveryLocation: "Avenue wendt 9, 1203 Genève, Suisse",
    status: "Expédié",
    customerInfo: "Casque airpods max"
  },
   {
    trackingNumber: "00781625289935",
    recipientName: "Sabrina Martinez ",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "30-04-2025",
    deliveryLocation: "Rue Mathurin-Cordier 7, 1005 Lausanne, Suisse",
    status: "Expédié",
    customerInfo: "Gaming Edge 1030"
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
