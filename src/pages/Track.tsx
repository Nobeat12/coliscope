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
  CardFooter,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search, Package, CreditCard, Mailbox, Calendar, Globe, MapPin, Phone, User, TruckIcon, Clock, 
  AlertCircle, Loader2, Check, XCircle, Info, ArrowRight, ExternalLink, RefreshCw, ShieldCheck
} from "lucide-react";

import { Package as PackageType } from "@/types/package";
import { PackageStorage } from "@/lib/utils-package";

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

const trackingSteps = {
  "En cours": 1,
  "Expédié": 2,
  "En livraison": 3,
  "Livré": 4,
  "Problème": 0
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
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const loadDemoPackages = async () => {
      if (demoLoaded) return;
      
      try {
        const existingPackages = await PackageStorage.getPackages();
        
        if (existingPackages.length === 0) {
          for (const pkg of DEMO_PACKAGES) {
            await PackageStorage.savePackage(pkg);
          }
          console.log("Demo packages loaded into IndexedDB");
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
    setSearchAttempted(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Searching for tracking number:", number);
      
      let pkg;
      try {
        pkg = await PackageStorage.getPackageByTrackingNumber(number);
        console.log("Result from PackageStorage:", pkg);
      } catch (storageError) {
        console.error("Error accessing PackageStorage:", storageError);
        pkg = null;
      }
      
      setShowResults(true);
      
      if (pkg) {
        setFoundPackage(pkg);
        toast({
          title: "Colis trouvé",
          description: `Colis trouvé: ${pkg.trackingNumber}`,
        });
      } else {
        console.log("Checking demo packages for:", number);
        const demoPkg = DEMO_PACKAGES.find(p => p.trackingNumber === number);
        
        if (demoPkg) {
          setFoundPackage(demoPkg);
          toast({
            title: "Colis trouvé",
            description: `Colis trouvé: ${demoPkg.trackingNumber}`,
          });
        } else {
          setFoundPackage(null);
          console.log("No package found with tracking number:", number);
          toast({
            title: t.packageNotFound,
            description: t.tryAgain,
            variant: "destructive",
          });
        }
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

  const renderSteps = (status: string) => {
    const currentStep = trackingSteps[status] || 0;
    const steps = [
      { text: t.inProcess, step: 1, icon: <Package className="h-4 w-4" /> },
      { text: t.shipped, step: 2, icon: <TruckIcon className="h-4 w-4" /> },
      { text: t.inDelivery, step: 3, icon: <ArrowRight className="h-4 w-4" /> },
      { text: t.delivered, step: 4, icon: <Check className="h-4 w-4" /> }
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
                {step.step < currentStep ? <Check className="h-4 w-4" /> : step.icon}
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
    <div className="min-h-screen flex flex-col">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled 
            ? "bg-white shadow-md" 
            : "bg-[#003366]"
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
              <a 
                href="/track" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {t.menuTrack}
              </a>
              <a 
                href="#services" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {t.menuServices}
              </a>
              <a 
                href="/help" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {t.menuHelp}
              </a>
              <a 
                href="/faq" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {t.menuFaq}
              </a>
              <a 
                href="/contact" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {t.menuContact}
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center ${isHeaderScrolled ? 'text-gray-700' : 'text-white'}`}
                >
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
                  <DialogDescription>
                    Connectez-vous pour accéder au tableau de bord
                  </DialogDescription>
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
        <div className="bg-gradient-to-b from-[#003366] to-[#0056b3] py-20">
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
        </div>

        {isLoading && (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Loader2 className="h-16 w-16 animate-spin mx-auto mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.searchingPackage}...</h3>
              <p className="text-gray-600">Veuillez patienter pendant que nous recherchons votre colis.</p>
            </div>
          </div>
        )}

        {!isLoading && showResults && (
          <div className="max-w-3xl mx-auto px-4 py-10">
            {foundPackage ? (
              <Card className="shadow-lg border border-[#E3F2FD] animate-in fade-in">
                <CardHeader className="bg-[#F5F7FA]">
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
                  {renderSteps(foundPackage.status)}
                  
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
            ) : (
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
                      onClick={() => setTrackingNumber("")}
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
            )}
          </div>
        )}

        <div id="services" className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">{t.ourServices}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="tracking" className="border border-blue-100 rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Package className="h-6 w-6 mr-4 text-[#0056b3]" />
                  <span>{t.packageTracking}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  {t.trackingDescription}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="costs" className="border border-blue-100 rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-4 text-[#0056b3]" />
                  <span>{t.shippingCosts}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  {t.costsDescription}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mailbox" className="border border-blue-100 rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Mailbox className="h-6 w-6 mr-4 text-[#0056b3]" />
                  <span>{t.virtualMailbox}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  {t.mailboxDescription}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="planning" className="border border-blue-100 rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-4 text-[#0056b3]" />
                  <span>{t.deliveryPlanning}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  {t.planningDescription}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      
      <footer className="bg-white text-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PackExpress</h3>
              <p className="text-gray-600 text-sm">
                Service de livraison professionnel et fiable pour tous vos besoins d'expédition.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/track" className="text-gray-600 hover:text-gray-900 transition-colors">Suivi de colis</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Conditions générales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-sm text-gray-600">
                <p>123 Rue de la Livraison</p>
                <p>75000 Paris, France</p>
                <p className="mt-2">Email: contact@packexpress.com</p>
                <p>Tél: +33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            &copy; 2024 PackExpress. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Track;
