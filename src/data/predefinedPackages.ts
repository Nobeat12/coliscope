
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "CH-78906428",
    recipientName: "BIANCA Bertaccini",
    phoneNumber: "", // No phone number provided
    receiptLocation: "6500 Bellinzona",
    receiptDate: "10-03-2025",
    deliveryLocation: "Rue Le-Corbusier 26, Geneva",
    status: "En cours",
    customerInfo: "ASPIRATEUR DYSON V12, envoyé par LEUTWYLER Manon Danielle à 13:07"
  },
  {
    trackingNumber: "CH-79087623",
    recipientName: "Fatlum Beluli",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "2025-03-10",
    deliveryLocation: "Brunnenmöslistrasse 10,6280 Hochdorf",
    status: "En Cours",
    customerInfo: "Airpods Max"
  },
  {
    trackingNumber: "CH-79057623",
    recipientName: "GAJIC Jovana",
    phoneNumber: "",
    receiptLocation: "Genève",
    receiptDate: "2025-03-11",
    deliveryLocation: "Luegislandstrasse 56, Zürich 8051",
    status: "En Cours",
    customerInfo: "DYSON AIRSTRAIT"
}
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
