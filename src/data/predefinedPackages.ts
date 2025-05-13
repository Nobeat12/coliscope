
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "000076098435",
    recipientName: "Matteo Stanca",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "13-05-2025",
    deliveryLocation: "Route Benex-Dessus 17, 1197 Prangins, Suisse",
    status: "Expédié",
    customerInfo: "Kamera Sony A7R V 61MP und Objektiv"
  },
  {
    trackingNumber: "50073753899",
    recipientName: "Raccuglia Francesco",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "13-05-2025",
    deliveryLocation: " Impasse de la Côte 16,1562 Corcelles-près-Payerne,Suisse",
    status: "Expédié",
    customerInfo: "SRAM force D2 AXS Gruppe"
  },
  {
    trackingNumber: "9000693652782",
    recipientName: "MORGANE Chenaux",
    phoneNumber: "",
    receiptLocation: "St.Gallen",
    receiptDate: "13-05-2025",
    deliveryLocation: " MP Numa-Droz, 2000 Neuchâtel, MyPost24 PK752593, Suisse",
    status: "Expédié",
    customerInfo: "OSMO POCKET 3"
  },
  {
    trackingNumber: "0087823705761",
    recipientName: "GIULIA Gehringer",
    phoneNumber: "",
    receiptLocation: "Lausanne",
    receiptDate: "12-05-2025",
    deliveryLocation: " Hofwiesenstrasse 81, 8105 Regensdorf, Suisse",
    status: "Expédié",
    customerInfo: "APPLE AIRPODS MAX"
  },
  {
    trackingNumber: "0050873636367",
    recipientName: "CAROLINA Pereira",
    phoneNumber: "",
    receiptLocation: "St. Moritz",
    receiptDate: "12-05-2025",
    deliveryLocation: " Horburgstrasse 55, 4057 Basel, Suisse",
    status: "Expédié",
    customerInfo: "DYSON AIRSTRAIT"
  },
  {
    trackingNumber: "0023699751456",
    recipientName: "KURZ Prudence",
    phoneNumber: "",
    receiptLocation: "St.Moritz",
    receiptDate: "12-05-2025",
    deliveryLocation: "41 Chemin De L'esplanade, 1214 Vernier, Suisse",
    status: "Expédié",
    customerInfo: "DYSON V12"
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
