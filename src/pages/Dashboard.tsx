import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { PackageSchema } from "@/lib/schemas";
import { Package, TranslationType } from "@/types/package";
import { generateUniqueTrackingNumber } from "@/lib/utils-package";
import { SupabasePackageStorage, initializeSupabaseDatabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, LogOut, Package as PackageIcon, Plus, Search } from "lucide-react";
import PackageTable from "@/components/dashboard/PackageTable";
import PackageForm from "@/components/dashboard/PackageForm";
import LoginForm from "@/components/dashboard/LoginForm";
import { LoginSchema } from "@/lib/schemas";

const TRANSLATIONS = {
  DE: {
    dashboard: "Dashboard",
    packageManagement: "Paketverwaltung",
    newPackage: "Neues Paket",
    cancel: "Abbrechen",
    add: "Hinzufügen",
    logout: "Abmelden",
    edit: "Bearbeiten",
    update: "Aktualisieren",
    search: "Suchen",
    searchButton: "Suchen",
    trackingNumber: "Tracking Nummer",
    recipient: "Empfänger",
    phone: "Telefon",
    origin: "Abholort",
    date: "Datum",
    destination: "Lieferort",
    status: "Status",
    actions: "Aktionen",
    noPackagesFound: "Keine Pakete gefunden",
    addNewPackage: "Neues Paket hinzufügen",
    additionalInfo: "Zusätzliche Informationen",
    inProcess: "In Bearbeitung",
    shipped: "Versandt",
    inDelivery: "In Zustellung",
    delivered: "Zugestellt",
    problem: "Problem",
    packageAdded: "Paket hinzugefügt",
    packageUpdated: "Paket aktualisiert",
    packageDeleted: "Paket gelöscht",
    error: "Fehler",
    trackingExists: "Tracking-Nummer existiert bereits",
    selectStatus: "Status auswählen",
    loginTitle: "Admin Login",
    email: "E-Mail",
    password: "Passwort",
    loginButton: "Anmelden",
    loginSuccess: "Erfolgreich angemeldet",
    welcomeAdmin: "Willkommen, Admin!",
    loginError: "Anmeldefehler",
    invalidCredentials: "Ungültige Anmeldeinformationen",
    logoutSuccess: "Abgemeldet",
    loggedOut: "Sie wurden erfolgreich abgemeldet",
    languageSelection: "Sprache",
    german: "Deutsch",
    french: "Französisch",
    english: "Englisch"
  },
  FR: {
    dashboard: "Tableau de bord",
    packageManagement: "Gestion des colis",
    newPackage: "Nouveau colis",
    cancel: "Annuler",
    add: "Ajouter",
    logout: "Déconnexion",
    edit: "Modifier",
    update: "Mettre à jour",
    search: "Rechercher",
    searchButton: "Rechercher",
    trackingNumber: "Numéro de suivi",
    recipient: "Destinataire",
    phone: "Téléphone",
    origin: "Lieu de collecte",
    date: "Date",
    destination: "Lieu de livraison",
    status: "Statut",
    actions: "Actions",
    noPackagesFound: "Aucun colis trouvé",
    addNewPackage: "Ajouter un nouveau colis",
    additionalInfo: "Informations supplémentaires",
    inProcess: "En cours",
    shipped: "Expédié",
    inDelivery: "En livraison",
    delivered: "Livré",
    problem: "Problème",
    packageAdded: "Colis ajouté",
    packageUpdated: "Colis mis à jour",
    packageDeleted: "Colis supprimé",
    error: "Erreur",
    trackingExists: "Le numéro de suivi existe déjà",
    selectStatus: "Sélectionner un statut",
    loginTitle: "Connexion Admin",
    email: "E-mail",
    password: "Mot de passe",
    loginButton: "Se connecter",
    loginSuccess: "Connexion réussie",
    welcomeAdmin: "Bienvenue, Admin !",
    loginError: "Erreur de connexion",
    invalidCredentials: "Identifiants invalides",
    logoutSuccess: "Déconnecté",
    loggedOut: "Vous avez été déconnecté avec succès",
    languageSelection: "Langue",
    german: "Allemand",
    french: "Français",
    english: "Anglais"
  },
  EN: {
    dashboard: "Dashboard",
    packageManagement: "Package Management",
    newPackage: "New Package",
    cancel: "Cancel",
    add: "Add",
    logout: "Logout",
    edit: "Edit",
    update: "Update",
    search: "Search",
    searchButton: "Search",
    trackingNumber: "Tracking Number",
    recipient: "Recipient",
    phone: "Phone",
    origin: "Collection Location",
    date: "Date",
    destination: "Delivery Location",
    status: "Status",
    actions: "Actions",
    noPackagesFound: "No packages found",
    addNewPackage: "Add New Package",
    additionalInfo: "Additional Information",
    inProcess: "In Process",
    shipped: "Shipped",
    inDelivery: "In Delivery",
    delivered: "Delivered",
    problem: "Problem",
    packageAdded: "Package Added",
    packageUpdated: "Package Updated",
    packageDeleted: "Package Deleted",
    error: "Error",
    trackingExists: "Tracking number already exists",
    selectStatus: "Select status",
    loginTitle: "Admin Login",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    loginSuccess: "Login Successful",
    welcomeAdmin: "Welcome, Admin!",
    loginError: "Login Error",
    invalidCredentials: "Invalid credentials",
    logoutSuccess: "Logged Out",
    loggedOut: "You have been successfully logged out",
    languageSelection: "Language",
    german: "German",
    french: "French",
    english: "English"
  }
};

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("FR");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];

  // Initialize Supabase and load packages
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Supabase database and migrate data if needed
        await initializeSupabaseDatabase();
        
        // Load packages
        const data = await SupabasePackageStorage.getPackages();
        setPackages(data);
        setFilteredPackages(data);
      } catch (error) {
        console.error("Error initializing app:", error);
        toast({
          title: t.error,
          description: "Une erreur est survenue lors du chargement des colis",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredPackages(packages);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = packages.filter(pkg => 
      pkg.trackingNumber.toLowerCase().includes(query) ||
      pkg.recipientName.toLowerCase().includes(query) ||
      pkg.phoneNumber.toLowerCase().includes(query) ||
      pkg.receiptLocation.toLowerCase().includes(query) ||
      pkg.deliveryLocation.toLowerCase().includes(query)
    );
    
    setFilteredPackages(filtered);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: t.logoutSuccess,
      description: t.loggedOut,
    });
  };

  const handleAddPackage = async (data: z.infer<typeof PackageSchema>) => {
    try {
      // Make sure the tracking number is unique
      const existingPackage = await SupabasePackageStorage.getPackageByTrackingNumber(data.trackingNumber);
      
      if (existingPackage && !isEditMode) {
        toast({
          title: t.error,
          description: t.trackingExists,
          variant: "destructive",
        });
        return;
      }
      
      // Save the package
      const newPackage = await SupabasePackageStorage.savePackage(data);
      
      // Update the UI
      if (isEditMode) {
        const updatedPackages = packages.map((pkg) => 
          pkg.trackingNumber === newPackage.trackingNumber ? newPackage : pkg
        );
        setPackages(updatedPackages);
        setFilteredPackages(updatedPackages);
        
        toast({
          title: t.packageUpdated,
          description: `${t.trackingNumber}: ${newPackage.trackingNumber}`,
        });
      } else {
        const updatedPackages = [...packages, newPackage];
        setPackages(updatedPackages);
        setFilteredPackages(updatedPackages);
        
        toast({
          title: t.packageAdded,
          description: `${t.trackingNumber}: ${newPackage.trackingNumber}`,
        });
      }
      
      setIsAddModalOpen(false);
      setIsEditMode(false);
      setCurrentPackage(null);
    } catch (error) {
      console.error("Error saving package:", error);
      toast({
        title: t.error,
        description: "Une erreur est survenue lors de l'enregistrement du colis",
        variant: "destructive",
      });
    }
  };

  const handleEditPackage = (index: number) => {
    const packageToEdit = filteredPackages[index];
    setCurrentPackage(packageToEdit);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleDeletePackage = async (index: number) => {
    try {
      const packageToDelete = filteredPackages[index];
      
      await SupabasePackageStorage.removePackage(packageToDelete.trackingNumber);
      
      const updatedPackages = packages.filter(
        (pkg) => pkg.trackingNumber !== packageToDelete.trackingNumber
      );
      
      setPackages(updatedPackages);
      setFilteredPackages(updatedPackages);
      
      toast({
        title: t.packageDeleted,
        description: `${t.trackingNumber}: ${packageToDelete.trackingNumber}`,
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      toast({
        title: t.error,
        description: "Une erreur est survenue lors de la suppression du colis",
        variant: "destructive",
      });
    }
  };

  const handleLogin = (data: z.infer<typeof LoginSchema>) => {
    if (data.email === "codedesuivi@gmail.com" && data.password === "20250") {
      setIsAuthenticated(true);
      toast({
        title: t.loginSuccess,
        description: t.welcomeAdmin,
      });
    } else {
      toast({
        title: t.loginError,
        description: t.invalidCredentials,
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>{t.loginTitle}</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder au tableau de bord
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleLogin} t={t} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="w-10 h-10">
              <img 
                src="/lovable-uploads/9dd54a53-50ad-417d-a0a2-3b4110ef83fb.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </a>
            <h1 className="text-xl font-semibold">{t.dashboard}</h1>
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
                <DropdownMenuItem onClick={() => handleLanguageChange("DE")}>
                  {t.german}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("FR")}>
                  {t.french}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("EN")}>
                  {t.english}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="packages">
          <TabsList className="mb-8">
            <TabsTrigger value="packages" className="flex items-center">
              <PackageIcon className="h-4 w-4 mr-2" />
              {t.packageManagement}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="packages">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">{t.packageManagement}</h2>
                <Button 
                  onClick={() => {
                    setIsEditMode(false);
                    setCurrentPackage(null);
                    setIsAddModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.newPackage}
                </Button>
              </div>

              <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
                <Input
                  placeholder={`${t.search}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  {t.searchButton}
                </Button>
              </form>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Chargement...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <PackageTable 
                    packages={filteredPackages}
                    onEdit={handleEditPackage}
                    onDelete={handleDeletePackage}
                    t={t}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? t.edit : t.addNewPackage}
            </DialogTitle>
          </DialogHeader>
          <PackageForm
            onSubmit={handleAddPackage}
            packages={packages}
            onCancel={() => {
              setIsAddModalOpen(false);
              setIsEditMode(false);
              setCurrentPackage(null);
            }}
            t={t}
            isEdit={isEditMode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
