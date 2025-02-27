
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  Search, Package, CreditCard, Mailbox, Calendar, Globe
} from "lucide-react";

// Traductions
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
  }
};

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("DE");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language as keyof typeof translations];

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
    toast({
      title: t.searchingPackage,
      description: `${t.trackingNumber}: ${trackingNumber}`,
    });
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

export default Track;
