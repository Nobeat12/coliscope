
import { createClient } from '@supabase/supabase-js';
import { Package } from '@/types/package';

// Remplacez ces valeurs par celles de votre projet Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour convertir les réponses de Supabase en objets Package
const mapSupabaseToPackage = (pkg: any): Package => {
  return {
    trackingNumber: pkg.tracking_number,
    recipientName: pkg.recipient_name,
    phoneNumber: pkg.phone_number,
    receiptLocation: pkg.receipt_location,
    receiptDate: pkg.receipt_date,
    deliveryLocation: pkg.delivery_location,
    status: pkg.status,
    customerInfo: pkg.customer_info || '',
    lastUpdated: pkg.last_updated,
  };
};

// Fonction pour convertir les objets Package en format Supabase
const mapPackageToSupabase = (pkg: Package) => {
  return {
    tracking_number: pkg.trackingNumber,
    recipient_name: pkg.recipientName,
    phone_number: pkg.phoneNumber,
    receipt_location: pkg.receiptLocation,
    receipt_date: pkg.receiptDate,
    delivery_location: pkg.deliveryLocation,
    status: pkg.status,
    customer_info: pkg.customerInfo,
    last_updated: pkg.lastUpdated || Date.now(),
  };
};

// Nouveau service de stockage de packages utilisant Supabase
export const SupabasePackageStorage = {
  // Sauvegarder un package
  savePackage: async (pkg: Package): Promise<Package> => {
    const updatedPkg = {
      ...pkg,
      lastUpdated: Date.now()
    };
    
    const mappedData = mapPackageToSupabase(updatedPkg);
    
    const { data, error } = await supabase
      .from('packages')
      .upsert(mappedData, { 
        onConflict: 'tracking_number',
        returning: 'minimal'
      });
      
    if (error) {
      console.error('Error saving package to Supabase:', error);
      throw error;
    }
    
    // Également maintenir une copie locale pour compatibilité et fonctionnement hors ligne
    localStorage.setItem(`package_${pkg.trackingNumber}`, JSON.stringify(updatedPkg));
    
    return updatedPkg;
  },
  
  // Récupérer tous les packages
  getPackages: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('last_updated', { ascending: false });
      
    if (error) {
      console.error('Error fetching packages from Supabase:', error);
      
      // Fallback vers localStorage si Supabase échoue
      try {
        const packagesData = localStorage.getItem('packages');
        return packagesData ? JSON.parse(packagesData) : [];
      } catch (fallbackError) {
        console.error("Error retrieving packages from localStorage:", fallbackError);
        return [];
      }
    }
    
    return data.map(mapSupabaseToPackage);
  },
  
  // Récupérer un package spécifique par numéro de suivi
  getPackageByTrackingNumber: async (trackingNumber: string): Promise<Package | null> => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single();
      
    if (error) {
      console.error(`Error fetching package ${trackingNumber} from Supabase:`, error);
      
      // Fallback vers localStorage si Supabase échoue
      try {
        const individualPackage = localStorage.getItem(`package_${trackingNumber}`);
        if (individualPackage) {
          return JSON.parse(individualPackage);
        }
        
        // Si non trouvé, vérifier dans la liste des packages
        const allPackages = JSON.parse(localStorage.getItem('packages') || '[]');
        return allPackages.find((p: Package) => p.trackingNumber === trackingNumber) || null;
      } catch (fallbackError) {
        console.error(`Error retrieving package ${trackingNumber} from localStorage:`, fallbackError);
        return null;
      }
    }
    
    return data ? mapSupabaseToPackage(data) : null;
  },
  
  // Supprimer un package
  removePackage: async (trackingNumber: string): Promise<void> => {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('tracking_number', trackingNumber);
      
    if (error) {
      console.error(`Error removing package ${trackingNumber} from Supabase:`, error);
      
      // Fallback vers localStorage si Supabase échoue
      try {
        // Supprimer de localStorage
        localStorage.removeItem(`package_${trackingNumber}`);
        
        // Supprimer également de la liste des packages
        const existingPackages = JSON.parse(localStorage.getItem('packages') || '[]');
        const updatedPackages = existingPackages.filter((p: Package) => p.trackingNumber !== trackingNumber);
        localStorage.setItem('packages', JSON.stringify(updatedPackages));
      } catch (fallbackError) {
        console.error(`Error removing package ${trackingNumber} from localStorage:`, fallbackError);
      }
    }
    
    // Également supprimer de localStorage pour la synchronisation
    localStorage.removeItem(`package_${trackingNumber}`);
  },
  
  // Synchroniser un package depuis l'URL
  syncPackageFromUrl: async (): Promise<Package | null> => {
    const url = new URL(window.location.href);
    const trackParam = url.searchParams.get('track');
    
    if (trackParam) {
      const pkg = await SupabasePackageStorage.getPackageByTrackingNumber(trackParam);
      if (pkg) {
        console.log(`Package ${trackParam} found in storage, ready for display`);
        return pkg;
      } else {
        console.log(`Package ${trackParam} not found in storage`);
        return null;
      }
    }
    return null;
  }
};

// Script d'initialisation pour créer la structure de la base de données Supabase
export const initializeSupabaseDatabase = async () => {
  try {
    // Vérifier si la table exists déjà
    const { error: checkError } = await supabase
      .from('packages')
      .select('tracking_number')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') {
      console.log('La table "packages" n\'existe pas encore. Veuillez la créer manuellement dans l\'interface Supabase ou utiliser les migrations.');
      
      // Note: La création de table devrait idéalement être faite via l'interface Supabase 
      // ou des migrations, car le client JavaScript a des permissions limitées.
      console.error('Erreur lors de la vérification de la table:', checkError);
    } else {
      console.log('La table "packages" existe déjà.');
    }
    
    // Importer les données existantes depuis IndexedDB/localStorage
    console.log('Migration des données locales vers Supabase...');
    const existingPackages = await window.PackageStorage.getPackages();
    
    if (existingPackages && existingPackages.length > 0) {
      for (const pkg of existingPackages) {
        await SupabasePackageStorage.savePackage(pkg);
      }
      console.log(`${existingPackages.length} packages migrés vers Supabase.`);
    } else {
      console.log('Aucune donnée locale à migrer.');
    }
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données Supabase:', error);
  }
};
