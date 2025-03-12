import { Package } from "@/types/package";
import { predefinedPackages, addPredefinedPackage } from "@/data/predefinedPackages";

const DB_NAME = "PackageTrackerDB";
const STORE_NAME = "packages";
const VERSION = 1;

// Helper to open database connection
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    
    request.onerror = (event) => {
      console.error("Database error:", request.error);
      reject(request.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "trackingNumber" });
      }
    };
  });
};

// Create a global namespace for package functions
export const PackageStorage = {
  // Save package to the database
  savePackage: async (pkg: Package): Promise<Package> => {
    try {
      // Add timestamp for tracking updates
      const updatedPkg = {
        ...pkg,
        lastUpdated: Date.now()
      };
      
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.put(updatedPkg);
        
        request.onsuccess = () => {
          console.log(`Package ${pkg.trackingNumber} saved successfully to IndexedDB`);
          
          // Also maintain a localStorage version for backward compatibility
          localStorage.setItem(`package_${pkg.trackingNumber}`, JSON.stringify(updatedPkg));
          
          resolve(updatedPkg);
        };
        
        request.onerror = () => {
          console.error(`Error saving package ${pkg.trackingNumber}:`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error("Error in savePackage:", error);
      // Fallback to localStorage if IndexedDB fails
      const updatedPkg = {
        ...pkg,
        lastUpdated: Date.now()
      };
      localStorage.setItem(`package_${pkg.trackingNumber}`, JSON.stringify(updatedPkg));
      
      // Also update the packages list in localStorage
      const existingPackages = await PackageStorage.getPackages();
      const index = existingPackages.findIndex((p: Package) => p.trackingNumber === pkg.trackingNumber);
      
      if (index >= 0) {
        existingPackages[index] = updatedPkg;
      } else {
        existingPackages.push(updatedPkg);
      }
      
      localStorage.setItem('packages', JSON.stringify(existingPackages));
      
      return updatedPkg;
    }
  },
  
  // Get all packages from the database
  getPackages: async (): Promise<Package[]> => {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        
        request.onerror = () => {
          console.error("Error retrieving packages:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error("Error in getPackages:", error);
      // Fallback to localStorage if IndexedDB fails
      try {
        const packagesData = localStorage.getItem('packages');
        return packagesData ? JSON.parse(packagesData) : [];
      } catch (fallbackError) {
        console.error("Error retrieving packages from localStorage:", fallbackError);
        return [];
      }
    }
  },
  
  // Get a specific package by tracking number
  getPackageByTrackingNumber: async (trackingNumber: string): Promise<Package | null> => {
    console.log("Searching for package with tracking number:", trackingNumber);
    
    try {
      // First check if IndexedDB is available
      if (!window.indexedDB) {
        console.log("IndexedDB not available, falling back to localStorage");
        throw new Error("IndexedDB not available");
      }
      
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(trackingNumber);
        
        request.onsuccess = () => {
          if (request.result) {
            console.log(`Package ${trackingNumber} found in IndexedDB:`, request.result);
            resolve(request.result);
          } else {
            console.log(`Package ${trackingNumber} not found in IndexedDB`);
            resolve(null);
          }
        };
        
        request.onerror = () => {
          console.error(`Error retrieving package ${trackingNumber}:`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.log(`Error in getPackageByTrackingNumber for ${trackingNumber}:`, error);
      
      // Fallback to localStorage if IndexedDB fails
      try {
        // First check in individual package storage
        const individualPackage = localStorage.getItem(`package_${trackingNumber}`);
        if (individualPackage) {
          console.log(`Package ${trackingNumber} found in localStorage (individual):`, individualPackage);
          return JSON.parse(individualPackage);
        }
        
        // If not found, check in the packages list
        const packagesData = localStorage.getItem('packages');
        if (packagesData) {
          const allPackages = JSON.parse(packagesData);
          const pkg = allPackages.find((p: Package) => p.trackingNumber === trackingNumber);
          if (pkg) {
            console.log(`Package ${trackingNumber} found in localStorage (list):`, pkg);
            return pkg;
          }
        }
        
        // Also check our demo packages
        const demoPackages = [
          {
            trackingNumber: "PKT-123456789",
            recipientName: "Max Mustermann",
            phoneNumber: "+49123456789",
            receiptLocation: "Berlin",
            receiptDate: "2023-06-15",
            deliveryLocation: "München",
            status: "En livraison",
            customerInfo: "Colis volumineux, manipuler avec précaution"
          },
          {
            trackingNumber: "PKT-987654321",
            recipientName: "Anna Schmidt",
            phoneNumber: "+49987654321",
            receiptLocation: "Hamburg",
            receiptDate: "2023-06-14",
            deliveryLocation: "Frankfurt",
            status: "Expédié",
            customerInfo: "Livraison express"
          },
          {
            trackingNumber: "PKT-456789123",
            recipientName: "Thomas Weber",
            phoneNumber: "+49456789123",
            receiptLocation: "München",
            receiptDate: "2023-06-13",
            deliveryLocation: "Köln",
            status: "Livré",
            customerInfo: "Laisser chez le voisin si absent"
          }
        ];
        
        const demoPkg = demoPackages.find(p => p.trackingNumber === trackingNumber);
        if (demoPkg) {
          console.log(`Package ${trackingNumber} found in demo packages:`, demoPkg);
          return demoPkg;
        }
        
        console.log(`Package ${trackingNumber} not found in localStorage or demo packages`);
        return null;
      } catch (fallbackError) {
        console.error(`Error retrieving package ${trackingNumber} from localStorage:`, fallbackError);
        return null;
      }
    }
  },
  
  // Remove package from the database
  removePackage: async (trackingNumber: string): Promise<void> => {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(trackingNumber);
        
        request.onsuccess = () => {
          console.log(`Package ${trackingNumber} removed successfully from IndexedDB`);
          
          // Also remove from localStorage for backward compatibility
          localStorage.removeItem(`package_${trackingNumber}`);
          
          resolve();
        };
        
        request.onerror = () => {
          console.error(`Error removing package ${trackingNumber}:`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Error in removePackage for ${trackingNumber}:`, error);
      // Fallback to localStorage if IndexedDB fails
      try {
        // Remove from localStorage
        localStorage.removeItem(`package_${trackingNumber}`);
        
        // Also remove from packages list
        const existingPackages = JSON.parse(localStorage.getItem('packages') || '[]');
        const updatedPackages = existingPackages.filter((p: Package) => p.trackingNumber !== trackingNumber);
        localStorage.setItem('packages', JSON.stringify(updatedPackages));
      } catch (fallbackError) {
        console.error(`Error removing package ${trackingNumber} from localStorage:`, fallbackError);
      }
    }
  },
  
  // Synchronize packages from URL params (for sharing)
  syncPackageFromUrl: async (): Promise<Package | null> => {
    const url = new URL(window.location.href);
    const trackParam = url.searchParams.get('track');
    
    if (trackParam) {
      const pkg = await PackageStorage.getPackageByTrackingNumber(trackParam);
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

export const generateTrackingNumber = (): string => {
  const prefix = "PKT-";
  const randomNumbers = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${randomNumbers}`;
};

export const isTrackingNumberExists = (trackingNumber: string, packages: Package[]): boolean => {
  return packages.some(pkg => pkg.trackingNumber === trackingNumber);
};

export const generateUniqueTrackingNumber = (packages: Package[]): string => {
  let trackingNumber = generateTrackingNumber();
  while (isTrackingNumberExists(trackingNumber, packages)) {
    trackingNumber = generateTrackingNumber();
  }
  return trackingNumber;
};

// Add a function to clear all packages from storage
export const clearAllPackages = async (): Promise<void> => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onsuccess = () => {
        console.log("All packages removed from IndexedDB");
        
        // Also clear localStorage
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.startsWith('package_') || key === 'packages') {
            localStorage.removeItem(key);
          }
        }
        
        resolve();
      };
      
      request.onerror = () => {
        console.error("Error removing all packages:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error in clearAllPackages:", error);
    // Fallback to localStorage if IndexedDB fails
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('package_') || key === 'packages') {
          localStorage.removeItem(key);
        }
      }
    } catch (fallbackError) {
      console.error("Error clearing localStorage:", fallbackError);
    }
  }
};

// Add a function to import a predefined package into storage
export const importPredefinedPackage = async (pkg: Package): Promise<Package> => {
  try {
    // Add to predefined packages list
    addPredefinedPackage(pkg);
    
    // Save to storage
    return await PackageStorage.savePackage(pkg);
  } catch (error) {
    console.error("Error importing predefined package:", error);
    throw error;
  }
};

// Function to initialize a fresh set of packages (for resets)
export const initializeFreshPackages = async (): Promise<void> => {
  try {
    // Clear existing packages
    await clearAllPackages();
    
    // Import the Swiss tracking number with Dyson vacuum cleaner
    const swissPackage = {
      trackingNumber: "CH-78906428",
      recipientName: "BIANCA Bertaccini",
      phoneNumber: "",
      receiptLocation: "6500 Bellinzona",
      receiptDate: "10-03-2025",
      deliveryLocation: "Rue Le-Corbusier 26, Geneva",
      status: "En cours",
      customerInfo: "ASPIRATEUR DYSON V12, envoyé par LEUTWYLER Manon Danielle à 13:07",
      lastUpdated: Date.now()
    };
    
    await PackageStorage.savePackage(swissPackage);
    console.log("Fresh package initialized:", swissPackage.trackingNumber);
    
    return;
  } catch (error) {
    console.error("Error initializing fresh packages:", error);
    throw error;
  }
};
