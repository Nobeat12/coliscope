
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-78284428",
    recipientName: "Baid Abdelwahed",
    phoneNumber: "", // No phone number provided
    receiptLocation: "St. Gallen",
    receiptDate: "19-03-2025",
    deliveryLocation: "Weitte G. 6, 8001 Zürich,Suisse",
    status: "Expédié",
    customerInfo: "IPHONE 14 PRO MAX"
  },{
    trackingNumber: "CH-76888428",
    recipientName: "Fanny Bouchard",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Zurich",
    receiptDate: "19-03-2025",
    deliveryLocation: "Avenue du Vieux-Moulin 16, 1018 Lausanne",
    status: "Expédié",
    customerInfo: "Dyson V15 detect Extra"
  },{
    trackingNumber: "CH-80284468",
    recipientName: "Aleksandra Tomaszewicz",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Pfäffikon",
    receiptDate: "19-03-2025",
    deliveryLocation: "Kirchrain 2, 8858 Innerthal,Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S20"
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
