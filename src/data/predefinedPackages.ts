
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
    trackingNumber: "0098626667400",
    recipientName: "Dukellaj Agron",
    phoneNumber: "",
    receiptLocation: "Sierre",
    receiptDate: "16-05-2025",
    deliveryLocation: "Av. du Marché 16, 3960 Sierre, Suisse",
    status: "Expédié",
    customerInfo: "Trottinette Électrique Puissante Dualtron Thunder"
  },
   {
    trackingNumber: "093883738380003",
    recipientName: "Bastien Fracheboud",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "15-05-2025",
    deliveryLocation: "Place Val de Marne 10, 1890 Saint-Maurice",
    status: "Expédié",
    customerInfo: "Shimano Dura Ace Di2 R9270"
  },
  
   {
    trackingNumber: "007895297720088",
    recipientName: "UGUES Jean Merlin",
    phoneNumber: "",
    receiptLocation: "St. Moritz",
    receiptDate: "16-05-2025",
    deliveryLocation: "Chemin de fossey 2b, 1306 Daillens, Suisse",
    status: "Expédié",
    customerInfo: "Aspirateur Dyson V15"
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
