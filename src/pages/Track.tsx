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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search, Package, CreditCard, Mailbox, Calendar, Globe, MapPin, Phone, User, TruckIcon, Clock, AlertCircle, Loader2
} from "lucide-react";

import { Package as PackageType } from "@/types/package";
import { SupabasePackageStorage } from "@/lib/supabase";

const DEMO_PACKAGES = [
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

const translations = {
  DE: {
    trackPackage: "Verfolgen Sie Ihr Paket",
    trackButton: "Verfolgen",
    trackingPlaceholder: "Tracking Nummer eingeben",
    ourServices: "Unsere Dienste",
    packageTracking: "Paketverfolgung",
    shippingCosts: "Versandkosten",
    virtualMailbox: "Virtuelle Mailbox",
    deliveryPlanning: "Lieferplanung",
    login: "Anmelden",
    email: "E-Mail",
    password: "Passwort",
    loginSuccess: "Erfolgreich angemeldet",
    welcomeBack: "Willkommen zurück!",
    error: "Fehler",
    invalidCredentials: "Ungültige Anmeldeinformationen",
    enterTrackingNumber: "Bitte geben Sie eine Tracking-Nummer ein",
    searchingPackage: "Suche nach Paket",
    trackingNumber: "Tracking Nummer",
    trackingDescription: "Verfolgen Sie den aktuellen Status und Standort Ihres Pakets in Echtzeit.",
    costsDescription: "Transparente Preise für alle Versandoptionen und Destinationen.",
    mailboxDescription: "Verwalten Sie Ihre Sendungen digital und papierlos.",
    planningDescription: "Planen Sie Ihre Lieferungen im Voraus und wählen Sie Ihr Wunschzeitfenster.",
    menuTrack: "Pakete verfolgen",
    menuServices: "Unsere Dienste",
    menuHelp: "Hilfe",
    menuFaq: "FAQ",
    menuContact: "Kontakt",
    packageDetails: "Paketdetails",
    recipient: "Empfänger",
    phone: "Telefon",
    origin: "Abholort",
    destination: "Lieferort",
    date: "Datum",
    status: "Status",
    additionalInfo: "Zusätzliche Informationen",
    packageNotFound: "Paket nicht gefunden",
    tryAgain: "Bitte überprüfen Sie die Tracking-Nummer und versuchen Sie es erneut.",
    inProcess: "In Bearbeitung",
    shipped: "Versandt",
    inDelivery: "In Zustellung",
    delivered: "Zugestellt",
    problem: "Problem"
  },
  FR: {
    trackPackage: "Suivez votre colis",
    trackButton: "Suivre",
    trackingPlaceholder: "Entrez le numéro de suivi",
    ourServices: "Nos Services",
    packageTracking: "Suivi de colis",
    shippingCosts: "Frais d'expédition",
    virtualMailbox: "Boîte aux lettres virtuelle",
    deliveryPlanning: "Planification de livraison",
    login: "Se connecter",
    email: "E-mail",
    password: "Mot de passe",
    loginSuccess: "Connexion réussie",
    welcomeBack: "Bienvenue !",
    error: "Erreur",
    invalidCredentials: "Identifiants invalides",
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
    problem: "Problème"
  },
  EN: {
    trackPackage: "Track Your Package",
    trackButton: "Track",
    trackingPlaceholder: "Enter tracking number",
    ourServices: "Our Services",
    packageTracking: "Package Tracking",
    shippingCosts: "Shipping Costs",
    virtualMailbox: "Virtual Mailbox",
    deliveryPlanning: "Delivery Planning",
    login: "Login",
    email: "Email",
    password: "Password",
    loginSuccess: "Successfully logged in",
    welcomeBack: "Welcome back!",
    error: "Error",
    invalidCredentials: "Invalid credentials",
    enterTrackingNumber: "Please enter a tracking number",
    searchingPackage: "Searching for package",
    trackingNumber: "Tracking number",
    trackingDescription: "Track the current status and location of your package in real-time.",
    costsDescription: "Transparent pricing for all shipping options and destinations.",
    mailboxDescription: "Manage your shipments digitally and paperless.",
    planningDescription: "Plan your deliveries in advance and choose your preferred time window.",
    menuTrack: "Track packages",
    menuServices: "Our services",
    menuHelp: "Help",
    menuFaq: "FAQ",
    menuContact: "Contact",
    packageDetails: "Package Details",
    recipient: "Recipient",
    phone: "Phone",
    origin: "Collection Location",
    destination: "Delivery Location",
    date: "Date",
    status: "Status",
    additionalInfo: "Additional Information",
    packageNotFound: "Package not found",
    tryAgain: "Please check the tracking number and try again.",
    inProcess: "In Process",
    shipped: "Shipped",
    inDelivery: "In Delivery",
    delivered: "Delivered",
    problem: "Problem"
  }
};

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("FR");
  const [foundPackage, setFoundPackage] = useState<PackageType | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const loadDemoPackages = async () => {
      if (demoLoaded) return;
      
      try {
        const existingPackages = await SupabasePackageStorage.getPackages();
        
        if (existingPackages.length === 0) {
          for (const pkg of DEMO_PACKAGES) {
            await SupabasePackageStorage.savePackage(pkg);
          }
          console.log("Demo packages loaded into Supabase");
        }
        
        setDemoLoaded(true);
      } catch (error) {
        console.error("Error loading demo packages:", error);
      }
    };
    
    const checkUrlParameters = async () => {
      const url = new URL(window.location.href);
      const trackParam = url.searchParams.get('track');
      
      if (trackParam) {
        setTrackingNumber(trackParam);
        handleTrackingWithNumber(trackParam);
      }
    };
    
    loadDemoPackages();
    checkUrlParameters();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "codedesuivi@gmail.com" && password === "20250") {
      toast({
        title: t.loginSuccess,
        description: t.welcomeBack,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: t.error,
        description: t.invalidCredentials,
        variant: "destructive",
      });
    }
  };

  const handleTrackingWithNumber = async (number: string) => {
    if (!number) {
      toast({
        title: t.error,
        description: t.enterTrackingNumber,
        variant: "destructive",
      });
      return;
    }
    
    const url = new URL(window.location.href);
    url.searchParams.set('track', number);
    window.history.pushState({}, '', url);
    
    setIsLoading(true);
    setShowResults(false);
    
    try {
      const pkg = await SupabasePackageStorage.getPackageByTrackingNumber(number);
      setFoundPackage(pkg);
      setShowResults(true);
      
      if (pkg) {
        toast({
          title: t.packageDetails,
          description: `${t.trackingNumber}: ${number}`,
        });
      } else {
        toast({
          title: t.packageNotFound,
          description: t.tryAgain,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error retrieving package:", error);
      toast({
        title: t.error,
        description: "Erreur lors de la recherche du colis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackingWithNumber(trackingNumber);
  };

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

  return (
    <div className="min-h-screen flex flex-col">
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
              <a href="/track" className="hover:text-blue-600 transition-colors">{t.menuTrack}</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">{t.menuServices}</a>
              <a href="/help" className="hover:text-blue-600 transition-colors">{t.menuHelp}</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors">{t.menuFaq}</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">{t.menuContact}</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("DE")}>Deutsch</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("FR")}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("EN")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {t.login}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t.login}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder={t.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder={t.password}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t.login}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
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
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 transition-colors"
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
        </div>

        {isLoading && (
          <div className="max-w-3xl mx-auto px-4 py-10 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">{t.searchingPackage}...</p>
          </div>
        )}

        {!isLoading && showResults && (
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

export default Track;
