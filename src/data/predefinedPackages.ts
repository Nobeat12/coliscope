
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
    recipientName: "Sandro Duque",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "28-03-2025",
    deliveryLocation: "Rathausgasse 6, 7130 Ilanz, Suisse",
    status: "Expédié",
    customerInfo: "IPHONE13"
  },{
    trackingNumber: "CH-68573848",
    recipientName: "David Vaz",
    phoneNumber: "",
    receiptLocation: "St. Gallen",
    receiptDate: "28-03-2025",
    deliveryLocation: "  Avenue du valais 26 1896 Vouvry, Suisse",
    status: "Expédié",
    customerInfo: "DJI AVATAR 2"
  },{
    trackingNumber: "CH-9045373848",
    recipientName: "Johan Palma Chilan",
    phoneNumber: "",
    receiptLocation: "Samnaun",
    receiptDate: "28-03-2025",
    deliveryLocation: "chemin de malley 12, 1007 lausanne, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy Tab S9 Ultra SM"
  },{
    trackingNumber: "CH-90752573848",
    recipientName: "Jimmy Locatelli",
    phoneNumber: "",
    receiptLocation: "Lugano",
    receiptDate: "28-03-2025",
    deliveryLocation: "  Via Orselina 11, 6600 Muralto, Suisse",
    status: "Expédié",
    customerInfo: "Scott Spark RC welcup"
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
