
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-98908828",
    recipientName: "Muntadher Aldhalemi",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "27-03-2025",
    deliveryLocation: "St. Niklausengasse 14, 6010 Kriens, Suisse",
    status: "Expédié",
    customerInfo: "SAMSUNG GALAXY Z FOLD5"
  },{
    trackingNumber: "CH-90698428",
    recipientName: "Rachida Fröhlich",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "26-03-2025",
    deliveryLocation: "Weiherstrasse 4,8309 Nürensdorf, Suisse",
    status: "Expédié",
    customerInfo: "Louis Vuitton Speedy 30 Damier"
  },{
    trackingNumber: "CH-68573848",
    recipientName: "Natalia Palmeira",
    phoneNumber: "",
    receiptLocation: "Davos Platz",
    receiptDate: "26-03-2025",
    deliveryLocation: "Quai Charles-Page n.25, 1205 Genève, Suisse",
    status: "Expédié",
    customerInfo: "Chopard 30g Happy Spirit Au750 Yellow Gold"
  },{
    trackingNumber: "CH-780913428",
    recipientName: "Darweshi Bigwz Shayan",
    phoneNumber: "",
    receiptLocation: "Lausanne",
    receiptDate: "27-03-2025",
    deliveryLocation: "Erlenstrasse 87,6020 Emmenbrücke, Suisse",
    status: "Expédié",
    customerInfo: "GoPro HERO 12"
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
