
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "0008796809828",
    recipientName: "MARCO Fieno",
    phoneNumber: "",
    receiptLocation: "St. Moritz",
    receiptDate: "08-05-2025",
    deliveryLocation: " Av.François-besson 17, 1217 Meyrin, Suisse",
    status: "Expédié",
    customerInfo: "DJI OSMO POCKET 3"
  },
  {
    trackingNumber: "00309680982978",
    recipientName: "Belleguic louëlla",
    phoneNumber: "",
    receiptLocation: "Yverdon-les-Bains",
    receiptDate: "08-05-2025",
    deliveryLocation: "Rue de grise pierre 5, 2000 neuchatel, Suisse",
    status: "Expédié",
    customerInfo: "X40 Ultra Roboterstaubsauger"
  },
  {
    trackingNumber: "30968098297800",
    recipientName: "Taiebi Ali",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "08-05-2025",
    deliveryLocation: "5 rue Jean Dassier Genève 1201, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S23 ultra"
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
