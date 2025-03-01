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
  Search, Package, CreditCard, Mailbox, Calendar, Globe, MapPin, Phone, User, TruckIcon, Clock, AlertCircle, Menu, X
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const getPackagesFromLocalStorage = (): Package[] => {
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

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [foundPackage, setFoundPackage] = useState<Package | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || "DE";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled 
            ? "bg-[#D3E4FD] shadow-md" 
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
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px]">
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
                  className="bg-blue-600 hover:bg-blue-700 transition-colors hidden md:inline-flex"
                >
                  {t.login}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] z-50 bg-white">
                <DialogHeader>
                  <DialogTitle>Connexion</DialogTitle>
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
                      <Button type="submit">
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
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className={`md:hidden ${isHeaderScrolled ? "bg-[#D3E4FD]" : "bg-[#FFC107]"} shadow-lg p-4 animate-in fade-in`}>
            <nav className="flex flex-col space-y-4">
              <a href="/" className="hover:text-blue-600 transition-colors py-2 border-b border-yellow-600">{t.menuTrack}</a>
              <a href="#services" className="hover:text-blue-600 transition-colors py-2 border-b border-yellow-600" onClick={() => setMobileMenuOpen(false)}>{t.menuServices}</a>
              <a href="/help" className="hover:text-blue-600 transition-colors py-2 border-b border-yellow-600">{t.menuHelp}</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors py-2 border-b border-yellow-600">{t.menuFaq}</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors py-2 border-b border-yellow-600">{t.menuContact}</a>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 transition-colors w-full mt-2"
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
        <div className="bg-gradient-to-b from-[#FFC107] to-white py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">{t.trackPackage}</h1>
            <form onSubmit={handleTracking} className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
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

        {showResults && (
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
            {foundPackage ? (
              <Card className="shadow-lg border border-[#E3F2FD] animate-in fade-in">
                <CardHeader className="bg-[#F5F7FA]/50">
                  <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="mb-2 md:mb-0">{t.packageDetails}</span>
                    <span className={`px-3 py-1 rounded-full text-sm inline-block ${
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

        <div id="services" className="max-w-3xl mx-auto px-4 py-12 md:py-20">
          <h2 className="text-2xl font-semibold mb-6 md:mb-8 text-center">{t.ourServices}</h2>
          <Accordion type="single" collapsible className="space-y-4 w-full">
            <AccordionItem value="tracking" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Package className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.packageTracking}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                {t.trackingDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="costs" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.shippingCosts}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                {t.costsDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mailbox" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Mailbox className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.virtualMailbox}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                {t.mailboxDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="planning" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>{t.deliveryPlanning}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
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
