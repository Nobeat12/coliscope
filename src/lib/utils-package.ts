
import { Package } from "@/types/package";

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
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(trackingNumber);
        
        request.onsuccess = () => {
          resolve(request.result || null);
        };
        
        request.onerror = () => {
          console.error(`Error retrieving package ${trackingNumber}:`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Error in getPackageByTrackingNumber for ${trackingNumber}:`, error);
      // Fallback to localStorage if IndexedDB fails
      try {
        // First check in individual package storage
        const individualPackage = localStorage.getItem(`package_${trackingNumber}`);
        if (individualPackage) {
          return JSON.parse(individualPackage);
        }
        
        // If not found, check in the packages list
        const allPackages = JSON.parse(localStorage.getItem('packages') || '[]');
        return allPackages.find((p: Package) => p.trackingNumber === trackingNumber) || null;
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
