
import * as z from "zod";

export const PackageSchema = z.object({
  trackingNumber: z.string().min(3, "Numéro de suivi requis"),
  recipientName: z.string().min(2, "Nom du destinataire requis"),
  phoneNumber: z.string().min(5, "Numéro de téléphone requis"),
  receiptLocation: z.string().min(2, "Lieu de collecte requis"),
  receiptDate: z.string().min(5, "Date requise"),
  deliveryLocation: z.string().min(2, "Lieu de livraison requis"),
  status: z.string().min(1, "Statut requis"),
  customerInfo: z.string().optional(),
  lastUpdated: z.number().optional(), // Timestamp pour la synchronisation
});

export const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(5, "Mot de passe requis"),
});
