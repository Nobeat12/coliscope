
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { predefinedPackages, logTrackingNumbers } from "@/data/predefinedPackages";
import { Loader2 } from "lucide-react";
import { Package as PackageType } from "@/types/package";
import { PackageStorage } from "@/lib/utils-package";
import { 
  Header, 
  TrackingForm, 
  PackageDetails, 
  PackageNotFound, 
  ServicesSection, 
  Footer 
} from "@/components/track";

const DEMO_PACKAGES = [
  {
    trackingNumber: "CH-79087623",
    recipientName: "Fatlum Beluli",
    phoneNumber: "",
    receiptLocation: "Bellinzona",
    receiptDate: "2025-03-10",
    deliveryLocation: "Brunnenmöslistrasse 10,6280 Hochdorf",
    status: "Expédié",
    customerInfo: "Airpods Max"
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
  const [language, setLanguage] = useState("DE");
  const [foundPackage, setFoundPackage] = useState<PackageType | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [predefinedCodesLoaded, setPredefinedCodesLoaded] = useState(false);
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
          console.log("Colis de démo chargés dans IndexedDB");
        }
        
        if (!predefinedCodesLoaded) {
          console.log("Chargement des colis prédéfinis...");
          
          const existingTrackingNumbers = existingPackages.map(pkg => pkg.trackingNumber);
          let loadedCount = 0;
          
          for (const pkg of predefinedPackages) {
            if (!existingTrackingNumbers.includes(pkg.trackingNumber)) {
              await PackageStorage.savePackage(pkg);
              loadedCount++;
            }
          }
          
          if (loadedCount > 0) {
            console.log(`${loadedCount} nouveaux colis prédéfinis chargés dans IndexedDB`);
          }
          
          logTrackingNumbers();
          
          setPredefinedCodesLoaded(true);
        }
        
        setDemoLoaded(true);
      } catch (error) {
        console.error("Erreur lors du chargement des colis:", error);
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
      
      console.log("Recherche du colis avec numéro:", number);
      
      let pkg;
      try {
        console.log("Recherche dans IndexedDB...");
        pkg = await PackageStorage.getPackageByTrackingNumber(number);
        console.log("Résultat de PackageStorage:", pkg);
      } catch (storageError) {
        console.error("Erreur d'accès à PackageStorage:", storageError);
        pkg = null;
      }
      
      if (pkg) {
        console.log("Colis trouvé dans IndexedDB:", pkg);
        setFoundPackage(pkg);
        toast({
          title: "Colis trouvé",
          description: `Colis trouvé: ${pkg.trackingNumber}`,
        });
      } else {
        console.log("Recherche dans les colis prédéfinis...");
        const predefinedPkg = predefinedPackages.find(p => p.trackingNumber === number);
        
        if (predefinedPkg) {
          console.log("Colis trouvé dans les colis prédéfinis:", predefinedPkg);
          await PackageStorage.savePackage(predefinedPkg);
          setFoundPackage(predefinedPkg);
          toast({
            title: "Colis trouvé",
            description: `Colis trouvé: ${predefinedPkg.trackingNumber}`,
          });
        } else {
          console.log("Recherche dans les colis de démo pour:", number);
          const demoPkg = DEMO_PACKAGES.find(p => p.trackingNumber === number);
          
          if (demoPkg) {
            console.log("Colis trouvé dans les colis de démo:", demoPkg);
            setFoundPackage(demoPkg);
            toast({
              title: "Colis trouvé",
              description: `Colis trouvé: ${demoPkg.trackingNumber}`,
            });
          } else {
            setFoundPackage(null);
            console.log("Aucun colis trouvé avec le numéro:", number);
            toast({
              title: t.packageNotFound,
              description: t.tryAgain,
              variant: "destructive",
            });
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du colis:", error);
      toast({
        title: t.error,
        description: "Erreur lors de la recherche du colis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackingWithNumber(trackingNumber);
  };

  const resetTrackingNumber = () => {
    setTrackingNumber("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isHeaderScrolled={isHeaderScrolled}
        language={language}
        setLanguage={setLanguage}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        t={t}
      />

      <main className="flex-1 pt-24">
        <div className="bg-gradient-to-b from-[#003366] to-[#0056b3] py-20">
          <TrackingForm 
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            handleTracking={handleTracking}
            isLoading={isLoading}
            t={t}
          />
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
              <PackageDetails packageData={foundPackage} t={t} />
            ) : (
              <PackageNotFound 
                trackingNumber={trackingNumber} 
                t={t} 
                onTryAgain={resetTrackingNumber}
              />
            )}
          </div>
        )}

        <ServicesSection t={t} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Track;
