
import React from "react";
import { 
  Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter 
} from "@/components/ui/card";
import { 
  User, Phone, MapPin, TruckIcon, Clock, 
  AlertCircle, ShieldCheck, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package as PackageType } from "@/types/package";
import { TranslationType } from "@/types/package";

interface PackageDetailsProps {
  packageData: PackageType;
  t: TranslationType;
}

const PackageDetails = ({ packageData, t }: PackageDetailsProps) => {
  const getTranslatedStatus = (status: string) => {
    switch(status) {
      case "En cours": return t.inProcess;
      case "Expédié": return t.shipped;
      case "En livraison": return t.inDelivery;
      case "Livré": return t.delivered;
      case "Problème": return t.problem;
      default: return status;
    }
  };

  const trackingSteps = {
    "En cours": 1,
    "Expédié": 2,
    "En livraison": 3,
    "Livré": 4,
    "Problème": 0
  };

  const renderSteps = (status: string) => {
    const currentStep = trackingSteps[status] || 0;
    const steps = [
      { text: t.inProcess, step: 1, icon: <TruckIcon className="h-4 w-4" /> },
      { text: t.shipped, step: 2, icon: <TruckIcon className="h-4 w-4" /> },
      { text: t.inDelivery, step: 3, icon: <TruckIcon className="h-4 w-4" /> },
      { text: t.delivered, step: 4, icon: <TruckIcon className="h-4 w-4" /> }
    ];

    return (
      <div className="relative mt-8 mb-10">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                step.step < currentStep 
                  ? 'bg-green-500 text-white' 
                  : step.step === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.icon}
              </div>
              <span className={`text-xs mt-2 ${
                step.step === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-lg border border-[#E3F2FD] animate-in fade-in">
      <CardHeader className="bg-[#F5F7FA]">
        <CardTitle className="flex items-center justify-between">
          <span>{t.packageDetails}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            packageData.status === "Livré" 
              ? "bg-green-100 text-green-600" 
              : packageData.status === "Problème"
              ? "bg-red-100 text-red-600"
              : "bg-[#E3F2FD] text-blue-600"
          }`}>
            {getTranslatedStatus(packageData.status)}
          </span>
        </CardTitle>
        <CardDescription>
          {t.trackingNumber}: <span className="font-semibold">{packageData.trackingNumber}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {renderSteps(packageData.status)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.recipient}</p>
                <p className="font-medium">{packageData.recipientName}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.phone}</p>
                <p className="font-medium">{packageData.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.origin}</p>
                <p className="font-medium">{packageData.receiptLocation}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <TruckIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.destination}</p>
                <p className="font-medium">{packageData.deliveryLocation}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.date}</p>
                <p className="font-medium">{new Date(packageData.receiptDate).toLocaleDateString()}</p>
              </div>
            </div>
            {packageData.customerInfo && (
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">{t.additionalInfo}</p>
                  <p className="font-medium">{packageData.customerInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6 text-sm text-gray-500">
        <div className="flex items-center">
          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
          Dernière mise à jour il y a 2 heures
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageDetails;
