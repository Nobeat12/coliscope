
import { Package } from "@/types/package";

// Creating a global namespace for package functions
export const PackageStorage = {
  // Save package to localStorage with user identifier
  savePackage: (pkg: Package) => {
    const existingPackages = PackageStorage.getPackages();
    const index = existingPackages.findIndex((p: Package) => p.trackingNumber === pkg.trackingNumber);
    
    if (index >= 0) {
      existingPackages[index] = pkg;
    } else {
      existingPackages.push(pkg);
    }
    
    localStorage.setItem('packages', JSON.stringify(existingPackages));
    
    // Also store package information individually by tracking number
    // This allows non-logged in users to still access package info
    localStorage.setItem(`package_${pkg.trackingNumber}`, JSON.stringify(pkg));
  },
  
  // Get all packages from localStorage
  getPackages: (): Package[] => {
    return JSON.parse(localStorage.getItem('packages') || '[]');
  },
  
  // Get a specific package by tracking number (works without login)
  getPackageByTrackingNumber: (trackingNumber: string): Package | null => {
    // First check in individual package storage
    const individualPackage = localStorage.getItem(`package_${trackingNumber}`);
    if (individualPackage) {
      return JSON.parse(individualPackage);
    }
    
    // If not found, check in the packages list
    const allPackages = PackageStorage.getPackages();
    return allPackages.find(p => p.trackingNumber === trackingNumber) || null;
  },
  
  // Remove package from localStorage
  removePackage: (trackingNumber: string) => {
    // Remove from packages list
    const existingPackages = PackageStorage.getPackages();
    const updatedPackages = existingPackages.filter((p: Package) => p.trackingNumber !== trackingNumber);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    
    // Also remove individual package entry
    localStorage.removeItem(`package_${trackingNumber}`);
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
