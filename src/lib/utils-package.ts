
import { Package } from "@/types/package";

// Creating a global namespace for package functions
export const PackageStorage = {
  // Save package to localStorage with user identifier
  savePackage: (pkg: Package) => {
    // Add timestamp for tracking updates
    const updatedPkg = {
      ...pkg,
      lastUpdated: Date.now()
    };
    
    const existingPackages = PackageStorage.getPackages();
    const index = existingPackages.findIndex((p: Package) => p.trackingNumber === pkg.trackingNumber);
    
    if (index >= 0) {
      existingPackages[index] = updatedPkg;
    } else {
      existingPackages.push(updatedPkg);
    }
    
    localStorage.setItem('packages', JSON.stringify(existingPackages));
    
    // Also store package information individually by tracking number
    // This allows non-logged in users to still access package info
    localStorage.setItem(`package_${pkg.trackingNumber}`, JSON.stringify(updatedPkg));
    
    // Log storage success for debugging
    console.log(`Package ${pkg.trackingNumber} saved successfully`);
    
    return updatedPkg;
  },
  
  // Get all packages from localStorage
  getPackages: (): Package[] => {
    try {
      const packagesData = localStorage.getItem('packages');
      return packagesData ? JSON.parse(packagesData) : [];
    } catch (error) {
      console.error("Error retrieving packages:", error);
      return [];
    }
  },
  
  // Get a specific package by tracking number (works without login)
  getPackageByTrackingNumber: (trackingNumber: string): Package | null => {
    try {
      // First check in individual package storage
      const individualPackage = localStorage.getItem(`package_${trackingNumber}`);
      if (individualPackage) {
        return JSON.parse(individualPackage);
      }
      
      // If not found, check in the packages list
      const allPackages = PackageStorage.getPackages();
      return allPackages.find(p => p.trackingNumber === trackingNumber) || null;
    } catch (error) {
      console.error(`Error retrieving package ${trackingNumber}:`, error);
      return null;
    }
  },
  
  // Remove package from localStorage
  removePackage: (trackingNumber: string) => {
    // Remove from packages list
    const existingPackages = PackageStorage.getPackages();
    const updatedPackages = existingPackages.filter((p: Package) => p.trackingNumber !== trackingNumber);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    
    // Also remove individual package entry
    localStorage.removeItem(`package_${trackingNumber}`);
    
    console.log(`Package ${trackingNumber} removed successfully`);
  },
  
  // Synchronize packages from URL params (for sharing)
  syncPackageFromUrl: () => {
    const url = new URL(window.location.href);
    const trackParam = url.searchParams.get('track');
    
    if (trackParam) {
      const pkg = PackageStorage.getPackageByTrackingNumber(trackParam);
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
