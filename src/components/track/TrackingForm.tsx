
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { TranslationType } from "@/types/package";
import { predefinedPackages } from "@/data/predefinedPackages";

interface TrackingFormProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  handleTracking: (e: React.FormEvent) => void;
  isLoading: boolean;
  t: TranslationType;
}

const TrackingForm = ({
  trackingNumber,
  setTrackingNumber,
  handleTracking,
  isLoading,
  t,
}: TrackingFormProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">{t.trackPackage}</h1>
      <p className="text-blue-100 mb-8 max-w-xl mx-auto">
        Entrez le numéro de suivi de votre colis pour connaître son statut actuel et son emplacement.
      </p>
      <form onSubmit={handleTracking} className="space-y-4">
        <div className="flex space-x-4">
          <Input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={t.trackingPlaceholder}
            className="h-12 text-lg bg-white text-gray-800"
            disabled={isLoading}
            // Removed the list attribute so that suggestions don't show automatically
          />
          <Button 
            type="submit" 
            className="h-12 px-8 bg-[#FFC107] hover:bg-[#FFA000] text-gray-900 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            {isLoading ? t.searchingPackage : t.trackButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TrackingForm;
