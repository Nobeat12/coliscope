
import { Package } from "@/types/package";
import { generateTrackingNumber } from "@/lib/utils-package";

// Génère 20 numéros de suivi uniques avec un format professionnel
const generateUniqueTrackingNumbers = (count: number): string[] => {
  const trackingNumbers: string[] = [];
  for (let i = 0; i < count; i++) {
    const number = `PKT-${(1000000 + i).toString().padStart(9, '0')}`;
    trackingNumbers.push(number);
  }
  return trackingNumbers;
};

const trackingNumbers = generateUniqueTrackingNumbers(20);

// Crée 20 colis préconfigurés avec des données fictives
export const predefinedPackages: Package[] = [
  {
    trackingNumber: trackingNumbers[0],
    recipientName: "Jean Dupont",
    phoneNumber: "+33601020304",
    receiptLocation: "Paris",
    receiptDate: "2024-06-01",
    deliveryLocation: "Lyon",
    status: "En cours",
    customerInfo: "Fragile, à manipuler avec soin"
  },
  {
    trackingNumber: trackingNumbers[1],
    recipientName: "Marie Lambert",
    phoneNumber: "+33607080910",
    receiptLocation: "Marseille",
    receiptDate: "2024-06-02",
    deliveryLocation: "Lille",
    status: "Expédié",
    customerInfo: "Livraison prioritaire"
  },
  {
    trackingNumber: trackingNumbers[2],
    recipientName: "Pierre Martin",
    phoneNumber: "+33611121314",
    receiptLocation: "Bordeaux",
    receiptDate: "2024-06-03",
    deliveryLocation: "Strasbourg",
    status: "En livraison",
    customerInfo: "Laisser chez le voisin si absent"
  },
  {
    trackingNumber: trackingNumbers[3],
    recipientName: "Sophie Bernard",
    phoneNumber: "+33615161718",
    receiptLocation: "Nice",
    receiptDate: "2024-06-04",
    deliveryLocation: "Toulouse",
    status: "Livré",
    customerInfo: "Déposer devant la porte"
  },
  {
    trackingNumber: trackingNumbers[4],
    recipientName: "Thomas Petit",
    phoneNumber: "+33619202122",
    receiptLocation: "Rennes",
    receiptDate: "2024-06-05",
    deliveryLocation: "Nantes",
    status: "Problème",
    customerInfo: "Adresse incorrecte, contacter le client"
  },
  {
    trackingNumber: trackingNumbers[5],
    recipientName: "Claire Dubois",
    phoneNumber: "+33623242526",
    receiptLocation: "Montpellier",
    receiptDate: "2024-06-06",
    deliveryLocation: "Grenoble",
    status: "En cours",
    customerInfo: "Appeler avant livraison"
  },
  {
    trackingNumber: trackingNumbers[6],
    recipientName: "Antoine Richard",
    phoneNumber: "+33627282930",
    receiptLocation: "Lille",
    receiptDate: "2024-06-07",
    deliveryLocation: "Dijon",
    status: "Expédié",
    customerInfo: "Livraison express"
  },
  {
    trackingNumber: trackingNumbers[7],
    recipientName: "Émilie Moreau",
    phoneNumber: "+33631323334",
    receiptLocation: "Strasbourg",
    receiptDate: "2024-06-08",
    deliveryLocation: "Lyon",
    status: "En livraison",
    customerInfo: "Colis volumineux"
  },
  {
    trackingNumber: trackingNumbers[8],
    recipientName: "Lucas Simon",
    phoneNumber: "+33635363738",
    receiptLocation: "Toulouse",
    receiptDate: "2024-06-09",
    deliveryLocation: "Marseille",
    status: "Livré",
    customerInfo: "Signature requise"
  },
  {
    trackingNumber: trackingNumbers[9],
    recipientName: "Julie Leroy",
    phoneNumber: "+33639404142",
    receiptLocation: "Lyon",
    receiptDate: "2024-06-10",
    deliveryLocation: "Paris",
    status: "En cours",
    customerInfo: "Contient des documents importants"
  },
  {
    trackingNumber: trackingNumbers[10],
    recipientName: "Mathieu Girard",
    phoneNumber: "+33643444546",
    receiptLocation: "Nantes",
    receiptDate: "2024-06-11",
    deliveryLocation: "Bordeaux",
    status: "Expédié",
    customerInfo: "Assurance supplémentaire"
  },
  {
    trackingNumber: trackingNumbers[11],
    recipientName: "Camille Fournier",
    phoneNumber: "+33647484950",
    receiptLocation: "Dijon",
    receiptDate: "2024-06-12",
    deliveryLocation: "Nice",
    status: "En livraison",
    customerInfo: "Ne pas plier"
  },
  {
    trackingNumber: trackingNumbers[12],
    recipientName: "Nicolas Mercier",
    phoneNumber: "+33651525354",
    receiptLocation: "Grenoble",
    receiptDate: "2024-06-13",
    deliveryLocation: "Rennes",
    status: "Livré",
    customerInfo: "Déposer à l'accueil"
  },
  {
    trackingNumber: trackingNumbers[13],
    recipientName: "Laura Blanc",
    phoneNumber: "+33655565758",
    receiptLocation: "Reims",
    receiptDate: "2024-06-14",
    deliveryLocation: "Montpellier",
    status: "Problème",
    customerInfo: "Client absent, tentative de livraison le lendemain"
  },
  {
    trackingNumber: trackingNumbers[14],
    recipientName: "Alexandre Rousseau",
    phoneNumber: "+33659606162",
    receiptLocation: "Angers",
    receiptDate: "2024-06-15",
    deliveryLocation: "Metz",
    status: "En cours",
    customerInfo: "Livraison en soirée préférable"
  },
  {
    trackingNumber: trackingNumbers[15],
    recipientName: "Chloé Vincent",
    phoneNumber: "+33663646566",
    receiptLocation: "Le Havre",
    receiptDate: "2024-06-16",
    deliveryLocation: "Brest",
    status: "Expédié",
    customerInfo: "Matériel électronique"
  },
  {
    trackingNumber: trackingNumbers[16],
    recipientName: "Maxime Legrand",
    phoneNumber: "+33667686970",
    receiptLocation: "Clermont-Ferrand",
    receiptDate: "2024-06-17",
    deliveryLocation: "Besançon",
    status: "En livraison",
    customerInfo: "Livraison urgente"
  },
  {
    trackingNumber: trackingNumbers[17],
    recipientName: "Aurélie Garnier",
    phoneNumber: "+33671727374",
    receiptLocation: "Tours",
    receiptDate: "2024-06-18",
    deliveryLocation: "Perpignan",
    status: "Livré",
    customerInfo: "Instructions de livraison spéciales dans le mail"
  },
  {
    trackingNumber: trackingNumbers[18],
    recipientName: "Julien Faure",
    phoneNumber: "+33675767778",
    receiptLocation: "Limoges",
    receiptDate: "2024-06-19",
    deliveryLocation: "Amiens",
    status: "En cours",
    customerInfo: "Produits périssables"
  },
  {
    trackingNumber: trackingNumbers[19],
    recipientName: "Sarah Morel",
    phoneNumber: "+33679808182",
    receiptLocation: "Nancy",
    receiptDate: "2024-06-20",
    deliveryLocation: "Annecy",
    status: "Expédié",
    customerInfo: "Remise en main propre uniquement"
  }
];

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
