import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PackageStorage } from "@/lib/utils-package";
import { Package as PackageType } from "@/types/package";
import { predefinedPackages, logTrackingNumbers } from "@/data/predefinedPackages";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search, CreditCard, Mailbox, Calendar, Globe, MapPin, Phone, User, TruckIcon, 
  Clock, AlertCircle, Menu, X, XCircle, Info, ExternalLink, ShieldCheck, Check, ArrowRight
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface PackageData {
  trackingNumber: string;
  recipientName: string;
  phoneNumber: string;
  receiptLocation: string;
  receiptDate: string;
  deliveryLocation: string;
  status: string;
  customerInfo: string;
}

const getPackagesFromLocalStorage = (): PackageData[] => {
  return JSON.parse(localStorage.getItem('packages') || '[]');
};

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(5, "Mot de passe requis"),
});

const translations = {
  DE: {
    trackPackage: "Verfolgen Sie Ihr Paket",
    trackButton: "Verfolgen",
    trackingPlaceholder: "Geben Sie die Sendungsnummer ein",
    ourServices: "Unsere Dienstleistungen",
    packageTracking: "Paketverfolgung",
    shippingCosts: "Versandkosten",
    virtualMailbox: "Virtuelle Mailbox",
    deliveryPlanning: "Lieferplanung",
    login: "Anmelden",
    email: "E-Mail",
    password: "Passwort",
    loginSuccess: "Anmeldung erfolgreich",
    welcomeBack: "Willkommen!",
    error: "Fehler",
    invalidCredentials: "Ungültige Anmeldedaten",
    enterTrackingNumber: "Bitte geben Sie eine Sendungsnummer ein",
    searchingPackage: "Paketsuche",
    trackingNumber: "Sendungsnummer",
    trackingDescription: "Verfolgen Sie den aktuellen Status und Standort Ihres Pakets in Echtzeit.",
    costsDescription: "Transparente Preise für alle Versandoptionen und Ziele.",
    mailboxDescription: "Verwalten Sie Ihre Sendungen digital und papierlos.",
    planningDescription: "Planen Sie Ihre Lieferungen im Voraus und wählen Sie Ihren bevorzugten Zeitslot.",
    menuTrack: "Pakete verfolgen",
    menuServices: "Dienstleistungen",
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
    tryAgain: "Bitte überprüfen Sie die Sendungsnummer und versuchen Sie es erneut.",
    inProcess: "In Bearbeitung",
    shipped: "Versendet",
    inDelivery: "In Zustellung",
    delivered: "Zugestellt",
    problem: "Problem",
    languageSelection: "Sprache",
    german: "Deutsch",
    french: "Französisch",
    english: "Englisch"
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
    login: "Connexion",
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
    problem: "Problème",
    languageSelection: "Langue",
    german: "Allemand",
    french: "Français",
    english: "Anglais"
  },
  EN: {
    trackPackage: "Track your package",
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
    loginSuccess: "Login successful",
    welcomeBack: "Welcome back!",
    error: "Error",
    invalidCredentials: "Invalid credentials",
    enterTrackingNumber: "Please enter a tracking number",
    searchingPackage: "Searching package",
    trackingNumber: "Tracking number",
    trackingDescription: "Track the current status and location of your package in real-time.",
    costsDescription: "Transparent pricing for all shipping options and destinations.",
    mailboxDescription: "Manage your shipments digitally and paperless.",
    planningDescription: "Plan your deliveries in advance and choose your preferred time slot.",
    menuTrack: "Track packages",
    menuServices: "Our services",
    menuHelp: "Help",
    menuFaq: "FAQ",
    menuContact: "Contact",
    packageDetails: "Package details",
    recipient: "Recipient",
    phone: "Phone",
    origin: "Collection location",
    destination: "Delivery location",
    date: "Date",
    status: "Status",
    additionalInfo: "Additional information",
    packageNotFound: "Package not found",
    tryAgain: "Please check the tracking number and try again.",
    inProcess: "In process",
    shipped: "Shipped",
    inDelivery: "In delivery",
    delivered: "Delivered",
    problem: "Problem",
    languageSelection: "Language",
    german: "German",
    french: "French",
    english: "English"
  }
};

const trackingSteps = {
  "En cours": 1,
  "Expédié": 2,
  "En livraison": 3,
  "Livré": 4,
  "Problème": 0
};

const DEMO_PACKAGES: PackageData[] = [
  {
    trackingNumber: "CH-78906428",
    recipientName: "BIANCA Bertaccini",
    phoneNumber: "",
    receiptLocation: "6500 Bellinzona",
    receiptDate: "10-03-2025",
    deliveryLocation: "Rue Le-Corbusier 26, Geneva",
    status: "En cours",
    customerInfo: "ASPIRATEUR DYSON V12, envoyé par LEUTWYLER Manon Danielle à 13:07"
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

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [foundPackage, setFoundPackage] = useState<PackageType | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || "FR";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [predefinedCodesLoaded, setPredefinedCodesLoaded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const t = translations[language as keyof typeof translations];

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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

  useEffect(() => {
    const loadPredefinedPackages = async () => {
      if (predefinedCodesLoaded) return;
      
      try {
        const existingPackages = await PackageStorage.getPackages();
        const existingTrackingNumbers = existingPackages.map(pkg => pkg.trackingNumber);
        
        console.log("Chargement des codes de suivi prédéfinis...");
        
        let loadedCount = 0;
        for (const pkg of predefinedPackages) {
          if (!existingTrackingNumbers.includes(pkg.trackingNumber)) {
            await PackageStorage.savePackage(pkg);
            loadedCount++;
          }
        }
        
        if (loadedCount > 0) {
          console.log(`${loadedCount} nouveaux colis prédéfinis chargés dans IndexedDB`);
          toast({
            title: "Colis prédéfinis chargés",
            description: `${loadedCount} codes de suivi sont prêts à être utilisés.`,
          });
        } else {
          console.log("Tous les colis prédéfinis sont déjà chargés dans IndexedDB");
        }
        
        logTrackingNumbers();
        
        setPredefinedCodesLoaded(true);
      } catch (error) {
        console.error("Erreur lors du chargement des colis prédéfinis:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les codes de suivi prédéfinis.",
          variant: "destructive",
        });
      }
    };
    
    loadPredefinedPackages();
  }, [toast]);

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    if (data.email === "codedesuivi@gmail.com" && data.password === "20250") {
      localStorage.setItem('isAuthenticated', 'true');
      setLoginDialogOpen(false);
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
    
    setIsLoading(true);
    setShowResults(false);
    setSearchAttempted(true);
    
    console.log("Recherche du colis avec numéro:", trackingNumber);
    
    setTimeout(async () => {
      try {
        console.log("Recherche dans IndexedDB...");
        const pkg = await PackageStorage.getPackageByTrackingNumber(trackingNumber);
        
        if (pkg) {
          console.log("Colis trouvé dans IndexedDB:", pkg);
          setFoundPackage(pkg as PackageType);
          toast({
            title: "Colis trouvé",
            description: `Colis trouvé: ${pkg.trackingNumber}`,
          });
        } else {
          console.log("Colis non trouvé dans IndexedDB, recherche dans les packages prédéfinis...");
          const predefinedPkg = predefinedPackages.find(p => p.trackingNumber === trackingNumber);
          
          if (predefinedPkg) {
            console.log("Colis trouvé dans les packages prédéfinis:", predefinedPkg);
            await PackageStorage.savePackage(predefinedPkg);
            setFoundPackage(predefinedPkg);
            toast({
              title: "Colis trouvé",
              description: `Colis trouvé: ${predefinedPkg.trackingNumber}`,
            });
          } else {
            console.log("Recherche dans localStorage...");
            const allPackages = getPackagesFromLocalStorage();
            const localStoragePkg = allPackages.find(p => p.trackingNumber === trackingNumber);
            
            if (localStoragePkg) {
              console.log("Colis trouvé dans localStorage:", localStoragePkg);
              await PackageStorage.savePackage(localStoragePkg);
              setFoundPackage(localStoragePkg);
              toast({
                title: "Colis trouvé",
                description: `Colis trouvé: ${localStoragePkg.trackingNumber}`,
              });
            } else {
              console.log("Recherche dans les packages de démo...");
              const demoPkg = DEMO_PACKAGES.find(p => p.trackingNumber === trackingNumber);
              
              if (demoPkg) {
                console.log("Colis trouvé dans les packages de démo:", demoPkg);
                setFoundPackage(demoPkg);
                toast({
                  title: "Colis trouvé",
                  description: `Colis trouvé: ${demoPkg.trackingNumber}`,
                });
              } else {
                console.log("Aucun colis trouvé avec le numéro:", trackingNumber);
                setFoundPackage(null);
                toast({
                  title: t.packageNotFound,
                  description: t.tryAgain,
                  variant: "destructive",
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la recherche du colis:", error);
        setFoundPackage(null);
        toast({
          title: t.error,
          description: "Erreur lors de la recherche du colis",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setShowResults(true);
      }
    }, 1000);
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

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderSteps = (status: string) => {
    const currentStep = trackingSteps[status as keyof typeof trackingSteps] || 0;
    const steps = [
      { text: t.inProcess, step: 1, icon: <TruckIcon className="h-4 w-4" /> },
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
              <a 
                href="/" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {t.menuTrack}
              </a>
              <a 
                href="#services" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {t.menuServices}
              </a>
              <a 
                href="/help" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {t.menuHelp}
              </a>
              <a 
                href="/faq" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {t.menuFaq}
              </a>
              <a 
                href="/contact" 
                className={`transition-colors ${isHeaderScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {t.menuContact}
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className={`w-[140px] ${isHeaderScrolled ? 'bg-white text-gray-700' : 'bg-[#FFC107] text-gray-800 border-yellow-500'}`}>
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t.languageSelection} />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white">
                <SelectItem value="DE">{t.german}</SelectItem>
                <SelectItem value="FR">{t.french}</SelectItem>
                <SelectItem value="EN">{t.english}</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="default"
                  className="bg-[#003366] hover:bg-[#002244] text-white transition-colors hidden md:inline-flex"
                >
                  {t.login}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] z-50 bg-white">
                <DialogHeader>
                  <DialogTitle>Connexion</DialogTitle>
                  <DialogDescription>
                    Connectez-vous pour accéder au tableau de bord
                  </DialogDescription>
                </DialogHeader>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 mt-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={`${t.email}...`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.password}</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder={`${t.password}...`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-[#003366] hover:bg-[#002244]">
                        {t.login}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`md:hidden ${isHeaderScrolled ? 'text-gray-700' : 'text-gray-800'}`}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className={`md:hidden ${isHeaderScrolled ? "bg-white" : "bg-[#FFC107]"} shadow-lg p-4 animate-in fade-in`}>
            <nav className="flex flex-col space-y-4">
              <a 
                href="/" 
                className={`py-2 border-b ${isHeaderScrolled ? 'border-gray-200 text-gray-700 hover:text-blue-600' : 'border-yellow-500 text-gray-800 hover:text-gray-900'} transition-colors`}
              >
                {t.menuTrack}
              </a>
              <a 
                href="#services" 
                className={`py-2 border-b ${isHeaderScrolled ? 'border-gray-200 text-gray-700 hover:text-blue-600' : 'border-yellow-500 text-gray-800 hover:text-gray-900'} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.menuServices}
              </a>
              <a 
                href="/help" 
                className={`py-2 border-b ${isHeaderScrolled ? 'border-gray-200 text-gray-700 hover:text-blue-600' : 'border-yellow-500 text-gray-800 hover:text-gray-900'} transition-colors`}
              >
                {t.menuHelp}
              </a>
              <a 
                href="/faq" 
                className={`py-2 border-b ${isHeaderScrolled ? 'border-gray-200 text-gray-700 hover:text-blue-600' : 'border-yellow-500 text-gray-800 hover:text-gray-900'} transition-colors`}
              >
                {t.menuFaq}
              </a>
              <a 
                href="/contact" 
                className={`py-2 border-b ${isHeaderScrolled ? 'border-gray-200 text-gray-700 hover:text-blue-600' : 'border-yellow-500 text-gray-800 hover:text-gray-900'} transition-colors`}
              >
                {t.menuContact}
              </a>
              <Button 
                variant="default"
                className="bg-[#003366] hover:bg-[#002244] text-white w-full mt-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginDialogOpen(true);
                }}
              >
                {t.login}
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-24">
        <div className="bg-gradient-to-b from-[#FFC107] to-[#FFD54F] py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 text-center text-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.trackPackage}</h1>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto">
              Entrez le numéro de suivi de votre colis pour connaître son statut actuel et son emplacement.
            </p>
            <form onSubmit={handleTracking} className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <Input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder={t.trackingPlaceholder}
                  className="h-12 text-lg bg-white text-gray-800"
                  disabled={isLoading}
                  list="tracking-numbers"
                />
                <datalist id="tracking-numbers">
                  {predefinedPackages.map(pkg => (
                    <option key={pkg.trackingNumber} value={pkg.trackingNumber} />
                  ))}
                </datalist>
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-[#003366] hover:bg-[#002244] text-white transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Clock className="animate-spin mr-2 h-5 w-5" />
                      {t.searchingPackage}...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      {t.trackButton}
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {isLoading && (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Clock className="h-16 w-16 animate-spin mx-auto mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.searchingPackage}...</h3>
              <p className="text-gray-600">Veuillez patienter pendant que nous recherchons votre colis.</p>
            </div>
          </div>
        )}

        {!isLoading && showResults && (
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
            {foundPackage ? (
              <Card className="shadow-lg border border-blue-100 animate-in fade-in">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>{t.packageDetails}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      foundPackage.status === "Livré" 
                        ? "bg-green-100 text-green-600" 
                        : foundPackage.status === "Problème"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#003366]/10 text-[#003366]"
                    }`}>
                      {foundPackage.status === "En cours" ? t.inProcess : 
                       foundPackage.status === "Expédié" ? t.shipped :
                       foundPackage.status === "En livraison" ? t.inDelivery : 
                       foundPackage.status === "Livré" ? t.delivered : 
                       foundPackage.status === "Problème" ? t.problem : foundPackage.status}
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
                          <p className="font-medium">{foundPackage.receiptDate}</p>
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
                      <Info className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
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
                    
                    <Button
                      variant="default"
                      className="bg-[#003366] hover:bg-[#00264d]"
                      onClick={() => window.location.href = "/contact"}
                    >
                      Contacter le support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">À propos</h3>
              <p className="text-gray-700">
                Notre service de suivi de colis vous permet de suivre vos envois en temps réel.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-700 hover:text-gray-900">Accueil</a></li>
                <li><a href="/faq" className="text-gray-700 hover:text-gray-900">FAQ</a></li>
                <li><a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Suivi de colis</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Expédition</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Livraison internationale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
              <address className="not-italic text-gray-700">
                <p>Email: contact@example.com</p>
                <p>Téléphone: +33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-700">
            <p>&copy; {new Date().getFullYear()} Suivi de Colis. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
