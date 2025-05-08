
import { Package } from "@/types/package";

// Génère des numéros de suivi avec un format professionnel
export const generateProfessionalTrackingNumber = (index: number): string => {
  return `PKT-${(1000000 + index).toString().padStart(9, '0')}`;
};

// Liste pour les colis prédéfinis
export const predefinedPackages: Package[] = [
  {
    trackingNumber: "97886479828",
    recipientName: "Laurent Deshusses",
    phoneNumber: "",
    receiptLocation: "Zollikofen",
    receiptDate: "07-05-2025",
    deliveryLocation: "10 cours des bastions , 1205 Genève, Suisse",
    status: "Expédié",
    customerInfo: "Garmin edge 840"
  },
  {
    trackingNumber: "9289788809828",
    recipientName: "Maifano Maru Tutini Bryan ",
    phoneNumber: "",
    receiptLocation: "Unterseen",
    receiptDate: "07-05-2025",
    deliveryLocation: "Sandbach 245A Chalet Berna, STECHELBERG 3824, Suisse",
    status: "Expédié",
    customerInfo: "Samsung Galaxy S23 ultra"
  },
  {
    trackingNumber: "0008796809828",
    recipientName: "MARCO Fieno",
    phoneNumber: "",
    receiptLocation: "St. Moritz",
    receiptDate: "08-05-2025",
    deliveryLocation: " Av.François-besson 17, 1217 Meyrin, Suisse",
    status: "Expédié",
    customerInfo: "DJI OSMO POCKET 3"
  },
  {
    trackingNumber: "00309680982978",
    recipientName: "Belleguic louëlla",
    phoneNumber: "",
    receiptLocation: "Yverdon-les-Bains",
    receiptDate: "08-05-2025",
    deliveryLocation: "Rue de grise pierre 5, 2000 neuchatel, Suisse",
    status: "Expédié",
    customerInfo: "X40 Ultra Roboterstaubsauger"
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
