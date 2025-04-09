
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-989089828",
    recipientName: "Tournaire Tristan",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "09-04-2025",
    deliveryLocation: "Route du Burenoz 35 belmont sur Lausanne 1092, Suisse",
    status: "Expédié",
    customerInfo: "SRAM RED eTap AXS 2x D1 HRD"
  },
  {  trackingNumber: "CH-02379828",
    recipientName: "François Fernandez",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "09-04-2025",
    deliveryLocation: "Av. Granges-Paccot 14, 1700 Fribourg, Suisse",
    status: "Expédié",
    customerInfo: "Apple Mac Studio M2 Max"
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
