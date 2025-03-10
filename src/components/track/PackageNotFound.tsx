
import React from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, Info, ExternalLink } from "lucide-react";
import { TranslationType } from "@/types/package";

interface PackageNotFoundProps {
  trackingNumber: string;
  t: TranslationType;
  onTryAgain: () => void;
}

const PackageNotFound = ({ 
  trackingNumber, 
  t, 
  onTryAgain 
}: PackageNotFoundProps) => {
  return (
    <Card className="shadow-lg border border-red-100 animate-in fade-in">
      <CardHeader className="bg-red-50">
        <div className="flex items-center mb-2">
          <XCircle className="text-red-500 h-6 w-6 mr-2" />
          <CardTitle className="text-red-600">{t.packageNotFound}</CardTitle>
        </div>
        <CardDescription className="text-red-500">
          {t.tryAgain}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
          <div className="flex">
            <Info className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 mb-1">Numéro de suivi invalide</h4>
              <p className="text-red-700 text-sm">
                Le numéro de suivi "{trackingNumber}" n'a pas été trouvé dans notre système. 
                Veuillez vérifier que vous avez saisi le bon numéro.
              </p>
            </div>
          </div>
        </div>
        
        <h4 className="font-medium text-gray-700 mb-3">Suggestions :</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Vérifiez que le numéro de suivi est correctement saisi</li>
          <li>Assurez-vous que le colis a bien été enregistré dans notre système</li>
          <li>Si le colis a été expédié récemment, veuillez réessayer plus tard</li>
          <li>Contactez notre service client pour obtenir de l'aide</li>
        </ul>
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button 
            variant="outline" 
            className="border-blue-200"
            onClick={onTryAgain}
          >
            Essayer un autre numéro
          </Button>
          <Button asChild>
            <a href="/contact">
              Contacter le service client
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageNotFound;
