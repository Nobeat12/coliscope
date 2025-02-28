
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, Package, CreditCard, Mailbox, Calendar, Globe, MapPin, Phone, User, TruckIcon, Clock, AlertCircle
} from "lucide-react";

// Interface pour les colis
interface Package {
  trackingNumber: string;
  recipientName: string;
  phoneNumber: string;
  receiptLocation: string;
  receiptDate: string;
  deliveryLocation: string;
  status: string;
  customerInfo: string;
}

// Fonction pour obtenir les colis depuis le localStorage
const getPackagesFromLocalStorage = (): Package[] => {
  return JSON.parse(localStorage.getItem('packages') || '[]');
};

// Traductions
const translations = {
  FR: {
    trackPackage: "Suivez votre colis",
    trackButton: "Suivre",
    trackingPlaceholder: "Entrez le numéro de suivi",
    ourServices: "Nos Services",
    packageTracking: "Suivi de colis",
    shippingCosts: "Frais d'expédition",
    virtualMailbox: "Boîte aux lettres virtuelle",
    deliveryPlanning: "Planification de livraison",
    loginSuccess: "Connexion réussie",
    welcomeBack: "Bienvenue !",
    error: "Erreur",
    enterTrackingNumber: "Veuillez entrer un numéro de suivi",
    searchingPackage: "Recherche de colis",
    trackingNumber: "Numéro de suivi",
    trackingDescription: "Suivez l'état actuel et l'emplacement de votre colis en temps réel.",
    costsDescription: "Prix transparents pour toutes les options et destinations d'expédition.",
    mailboxDescription: "Gérez vos envois numériquement et sans papier.",
    planningDescription: "Planifiez vos livraisons à l'avance et choisissez votre créneau horaire préféré.",
    menuTrack: "Suivre les colis",
    menuServices: "Nos services",
    menuHelp: "Aide",
    menuFaq: "FAQ",
    menuContact: "Contact",
    packageDetails: "Détails du colis",
    recipient: "Destinataire",
    phone: "Téléphone",
    origin: "Lieu de collecte",
    destination: "Lieu de livraison",
    date: "Date",
    status: "Statut",
    additionalInfo: "Informations supplémentaires",
    packageNotFound: "Colis non trouvé",
    tryAgain: "Veuillez vérifier le numéro de suivi et réessayer.",
    inProcess: "En traitement",
    shipped: "Expédié",
    inDelivery: "En cours de livraison",
    delivered: "Livré",
    problem: "Problème",
    adminArea: "Espace administrateur"
  }
};

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [foundPackage, setFoundPackage] = useState<Package | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Langue par défaut
  const language = "FR";
  const t = translations[language as keyof typeof translations];

  // Charger les colis depuis localStorage au chargement du composant
  useEffect(() => {
    setPackages(getPackagesFromLocalStorage());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) {
      toast({
        title: t.error,
        description: t.enterTrackingNumber,
        variant: "destructive",
      });
      return;
    }
    
    // Recherche du colis dans les données stockées
    const pkg = packages.find(p => p.trackingNumber === trackingNumber);
    setFoundPackage(pkg || null);
    setShowResults(true);
    
    if (pkg) {
      toast({
        title: t.packageDetails,
        description: `${t.trackingNumber}: ${trackingNumber}`,
      });
    } else {
      toast({
        title: t.packageNotFound,
        description: t.tryAgain,
        variant: "destructive",
      });
    }
  };

  // Traduire le statut du colis
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

  const handleAdminAccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled 
            ? "bg-white shadow-md" 
            : "bg-[#FFC107]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/" className="w-12 h-12">
              <img 
                src="/lovable-uploads/9dd54a53-50ad-417d-a0a2-3b4110ef83fb.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </a>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-blue-600 transition-colors">{t.menuTrack}</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">{t.menuServices}</a>
              <a href="/help" className="hover:text-blue-600 transition-colors">{t.menuHelp}</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors">{t.menuFaq}</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">{t.menuContact}</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={handleAdminAccess}
            >
              {t.adminArea}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#FFC107] to-white py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">{t.trackPackage}</h1>
            <form onSubmit={handleTracking} className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder={t.trackingPlaceholder}
                  className="h-12 text-lg"
                />
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Search className="mr-2 h-5 w-5" />
                  {t.trackButton}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Package Results Section */}
        {showResults && (
          <div className="max-w-3xl mx-auto px-4 py-10">
            {foundPackage ? (
              <Card className="shadow-lg border border-[#E3F2FD] animate-in fade-in">
                <CardHeader className="bg-[#F5F7FA]/50">
                  <CardTitle className="flex items-center justify-between">
                    <span>{t.packageDetails}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      foundPackage.status === "Livré" 
                        ? "bg-green-100 text-green-600" 
                        : foundPackage.status === "Problème"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#E3F2FD] text-blue-600"
                    }`}>
                      {getTranslatedStatus(foundPackage.status)}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {t.trackingNumber}: <span className="font-semibold">{foundPackage.trackingNumber}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{t.recipient}</p>
                          <p className="font-medium">{foundPackage.recipientName}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{t.phone}</p>
                          <p className="font-medium">{foundPackage.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{t.origin}</p>
                          <p className="font-medium">{foundPackage.receiptLocation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <TruckIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{t.destination}</p>
                          <p className="font-medium">{foundPackage.deliveryLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{t.date}</p>
                          <p className="font-medium">{new Date(foundPackage.receiptDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {foundPackage.customerInfo && (
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">{t.additionalInfo}</p>
                            <p className="font-medium">{foundPackage.customerInfo}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border border-red-100 animate-in fade-in">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-600">{t.packageNotFound}</CardTitle>
                  <CardDescription className="text-red-500">
                    {t.tryAgain}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        )}

        {/* Services Section */}
        <div id="services" className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">{t.ourServices}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="tracking">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Package className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.packageTracking}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {t.trackingDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="costs">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.shippingCosts}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {t.costsDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mailbox">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Mailbox className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.virtualMailbox}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {t.mailboxDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="planning">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.deliveryPlanning}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {t.planningDescription}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default Index;
