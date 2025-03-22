
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-76888428",
    recipientName: "DONIA Moeri",
    phoneNumber: "+41 79 729 57 16",
    receiptLocation: "Bellinzona",
    receiptDate: "22-03-2025",
    deliveryLocation: "Lotzwilstrasse 23a, 4900 Langenthal, Suisse",
    status: "Expédié",
    customerInfo: "IPHONE 13"
  },{
    trackingNumber: "CH-80284468",
    recipientName: "Marc Müller",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Zollikofen",
    receiptDate: "22-03-2025",
    deliveryLocation: "Oberdorfstrasse 17, 4536 Attiswil,Suisse",
    status: "Expédié",
    customerInfo: "GoPro HERO 13"
  },{
    trackingNumber: "CH-6884468",
    recipientName: "Sevdai Sopaj",
    phoneNumber: "", // No phone number provided
    receiptLocation: "Samnaun",
    receiptDate: "22-03-2025",
    deliveryLocation: "Bergstrasse 61, 8953 Dietikon, Suisse",
    status: "Expédié",
    customerInfo: "4 BMW Alufelgen 747M M"
  },{
    trackingNumber: "CH-80284468",
    recipientName: "JEAN-BERNARD Gillioz",
    phoneNumber: "", // No phone number provided
    receiptLocation: "St. Gallen",
    receiptDate: "22-03-2025",
    deliveryLocation: "Rue de la Cour 2a, 1908 Riddes, Suisse",
    status: "Expédié",
    customerInfo: "APPLE IPAD 12 PRO"
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
