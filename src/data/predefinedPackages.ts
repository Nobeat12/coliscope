
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "",
    recipientName: "Josephine Sara",
    phoneNumber: "",
    receiptLocation: "Paris France. Guichet s2",
    receiptDate: "16-10-2025",
    deliveryLocation: "1958 Broadway Street Apt B7 Iowa City IA, 
52240",
    status: "Expédié",
    customerInfo: "Thé duo choc"
  },
  
{
    trackingNumber: "99.44.776482.0588.5707.041.CH",
    recipientName: "AMOS Jerome",
    phoneNumber: "+41797167984",
    receiptLocation: "7500 ST MORITZ",
    receiptDate: "29-10-2025",
    deliveryLocation: "Rue De La Chapelle 27, 1958 Uvrier",
    status: "Expédié",
    customerInfo: "DJI AVATA 2"
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
