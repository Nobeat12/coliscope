
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-76808428",
    recipientName: "Gabriele Rizzo",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "24-03-2025",
    deliveryLocation: "Chemin jean baptiste vandelle 1, 1290 Versoix, Suisse",
    status: "Expédié",
    customerInfo: "REMARKABLE 2"
  },{
    trackingNumber: "CH-89808428",
    recipientName: "Marie Emma Pahud",
    phoneNumber: "",
    receiptLocation: "Butschwil",
    receiptDate: "24-03-2025",
    deliveryLocation: "Vers Savagnier 5, 2054 Chezard-St-Martin, Suisse",
    status: "Expédié",
    customerInfo: "Machine à broder brother innovis V3"
  },{
    trackingNumber: "CH-76538428",
    recipientName: "Almer Marco",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "24-03-2025",
    deliveryLocation: "Hauptsrasse 20, 3706 Leissigen, Suisse",
    status: "Expédié",
    customerInfo: "LUNETTE AVATA 2"
  },{
    trackingNumber: "CH-96808428",
    recipientName: "Tesfahiwet Andemicheal",
    phoneNumber: "",
    receiptLocation: "Prilly",
    receiptDate: "24-03-2025",
    deliveryLocation: "Qeullmattstrasse 78, 5035 unterentenfelden, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S24"
  },{
    trackingNumber: "CH-96596328",
    recipientName: "BEN SLIMEN Montassar",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "24-03-2025",
    deliveryLocation: "rue des grottes 28, 1201 Genève, Suisse",
    status: "Expédié",
    customerInfo: "AVATA 2"
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
