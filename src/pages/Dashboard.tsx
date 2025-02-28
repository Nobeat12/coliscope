
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { PackageSearch, Plus, X, Edit, Trash2, LogOut, Globe } from "lucide-react";
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

// Fonctions pour gérer le stockage local des colis
const savePackageToLocalStorage = (pkg: Package) => {
  const existingPackages = JSON.parse(localStorage.getItem('packages') || '[]');
  
  // Vérifier si ce numéro de suivi existe déjà
  const index = existingPackages.findIndex((p: Package) => p.trackingNumber === pkg.trackingNumber);
  
  if (index >= 0) {
    // Mise à jour d'un colis existant
    existingPackages[index] = pkg;
  } else {
    // Ajout d'un nouveau colis
    existingPackages.push(pkg);
  }
  
  localStorage.setItem('packages', JSON.stringify(existingPackages));
};

const getPackagesFromLocalStorage = (): Package[] => {
  return JSON.parse(localStorage.getItem('packages') || '[]');
};

const removePackageFromLocalStorage = (trackingNumber: string) => {
  const existingPackages = JSON.parse(localStorage.getItem('packages') || '[]');
  const updatedPackages = existingPackages.filter((p: Package) => p.trackingNumber !== trackingNumber);
  localStorage.setItem('packages', JSON.stringify(updatedPackages));
};

const packageSchema = z.object({
  trackingNumber: z.string().min(3, "Numéro de suivi requis"),
  recipientName: z.string().min(2, "Nom du destinataire requis"),
  phoneNumber: z.string().min(5, "Numéro de téléphone requis"),
  receiptLocation: z.string().min(2, "Lieu de collecte requis"),
  receiptDate: z.string().min(5, "Date requise"),
  deliveryLocation: z.string().min(2, "Lieu de livraison requis"),
  status: z.string().min(1, "Statut requis"),
  customerInfo: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(5, "Mot de passe requis"),
});

// Traductions pour le tableau de bord
const translations = {
  DE: {
    dashboard: "Dashboard",
    packageManagement: "Paketverwaltungssystem",
    newPackage: "Neues Paket",
    cancel: "Abbrechen",
    add: "Hinzufügen",
    logout: "Abmelden",
    edit: "Paket bearbeiten",
    update: "Aktualisieren",
    search: "Suchen...",
    searchButton: "Suchen",
    trackingNumber: "Sendungsnummer",
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
    shipped: "Versendet",
    inDelivery: "In Zustellung",
    delivered: "Zugestellt",
    problem: "Problem",
    packageAdded: "Paket hinzugefügt",
    packageUpdated: "Paket aktualisiert",
    packageDeleted: "Paket gelöscht",
    error: "Fehler",
    trackingExists: "Diese Sendungsnummer existiert bereits",
    selectStatus: "Status auswählen",
    loginTitle: "Anmeldung",
    email: "E-Mail",
    password: "Passwort",
    loginButton: "Anmelden",
    loginSuccess: "Anmeldung erfolgreich",
    welcomeAdmin: "Willkommen im Admin-Bereich",
    loginError: "Anmeldefehler",
    invalidCredentials: "Ungültige Anmeldedaten",
    logoutSuccess: "Abmeldung erfolgreich",
    loggedOut: "Sie wurden abgemeldet",
    languageSelection: "Sprache",
    german: "Deutsch",
    french: "Französisch",
    english: "Englisch"
  },
  FR: {
    dashboard: "Tableau de bord",
    packageManagement: "Système de gestion de colis",
    newPackage: "Nouveau colis",
    cancel: "Annuler",
    add: "Ajouter",
    logout: "Déconnexion",
    edit: "Modifier le colis",
    update: "Mettre à jour",
    search: "Rechercher...",
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
    inProcess: "En traitement",
    shipped: "Expédié",
    inDelivery: "En cours de livraison",
    delivered: "Livré",
    problem: "Problème",
    packageAdded: "Colis ajouté",
    packageUpdated: "Colis modifié",
    packageDeleted: "Colis supprimé",
    error: "Erreur",
    trackingExists: "Ce numéro de suivi existe déjà",
    selectStatus: "Sélectionner un statut",
    loginTitle: "Connexion",
    email: "Email",
    password: "Mot de passe",
    loginButton: "Connexion",
    loginSuccess: "Connexion réussie",
    welcomeAdmin: "Bienvenue dans l'espace administrateur",
    loginError: "Erreur de connexion",
    invalidCredentials: "Identifiants invalides",
    logoutSuccess: "Déconnexion réussie",
    loggedOut: "Vous avez été déconnecté",
    languageSelection: "Langue",
    german: "Allemand",
    french: "Français",
    english: "Anglais"
  },
  EN: {
    dashboard: "Dashboard",
    packageManagement: "Package Management System",
    newPackage: "New Package",
    cancel: "Cancel",
    add: "Add",
    logout: "Logout",
    edit: "Edit Package",
    update: "Update",
    search: "Search...",
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
    addNewPackage: "Add a new package",
    additionalInfo: "Additional Information",
    inProcess: "In Process",
    shipped: "Shipped",
    inDelivery: "In Delivery",
    delivered: "Delivered",
    problem: "Problem",
    packageAdded: "Package added",
    packageUpdated: "Package updated",
    packageDeleted: "Package deleted",
    error: "Error",
    trackingExists: "This tracking number already exists",
    selectStatus: "Select status",
    loginTitle: "Login",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    loginSuccess: "Login successful",
    welcomeAdmin: "Welcome to the admin area",
    loginError: "Login error",
    invalidCredentials: "Invalid credentials",
    logoutSuccess: "Logout successful",
    loggedOut: "You have been logged out",
    languageSelection: "Language",
    german: "German",
    french: "French",
    english: "English"
  }
};

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(true);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || "DE";
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Langue sélectionnée
  const t = translations[language as keyof typeof translations];

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Sauvegarder la langue dans localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Vérifier si l'utilisateur est déjà authentifié
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setLoginDialogOpen(false);
    }
  }, []);

  // Charger les colis depuis localStorage au chargement du composant
  useEffect(() => {
    setPackages(getPackagesFromLocalStorage());
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    if (data.email === "codedesuivi@gmail.com" && data.password === "20250") {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setLoginDialogOpen(false);
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
    toast({
      title: t.logoutSuccess,
      description: t.loggedOut,
    });
  };

  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      trackingNumber: "",
      recipientName: "",
      phoneNumber: "",
      receiptLocation: "",
      receiptDate: new Date().toISOString().split('T')[0],
      deliveryLocation: "",
      status: "En cours",
      customerInfo: "",
    },
  });

  const editForm = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      trackingNumber: "",
      recipientName: "",
      phoneNumber: "",
      receiptLocation: "",
      receiptDate: "",
      deliveryLocation: "",
      status: "",
      customerInfo: "",
    },
  });

  const onSubmit = (data: z.infer<typeof packageSchema>) => {
    // Ensure customerInfo is not undefined
    const newPackage: Package = {
      trackingNumber: data.trackingNumber,
      recipientName: data.recipientName,
      phoneNumber: data.phoneNumber,
      receiptLocation: data.receiptLocation,
      receiptDate: data.receiptDate,
      deliveryLocation: data.deliveryLocation,
      status: data.status,
      customerInfo: data.customerInfo || "",
    };
    
    // Vérifier si le numéro de suivi existe déjà
    const existingIndex = packages.findIndex(p => p.trackingNumber === newPackage.trackingNumber);
    if (existingIndex >= 0 && currentPackageIndex === null) {
      toast({
        title: t.error,
        description: t.trackingExists,
        variant: "destructive",
      });
      return;
    }
    
    // Ajouter le colis au tableau local et au localStorage
    savePackageToLocalStorage(newPackage);
    
    // Mettre à jour l'état local
    const updatedPackages = [...packages];
    if (existingIndex >= 0) {
      updatedPackages[existingIndex] = newPackage;
    } else {
      updatedPackages.push(newPackage);
    }
    
    setPackages(updatedPackages);
    
    toast({
      title: t.packageAdded,
      description: `${t.trackingNumber}: ${data.trackingNumber}`,
    });
    setOpen(false);
    form.reset();
  };

  const handleEdit = (index: number) => {
    setCurrentPackageIndex(index);
    const pkg = packages[index];
    editForm.reset({
      trackingNumber: pkg.trackingNumber,
      recipientName: pkg.recipientName,
      phoneNumber: pkg.phoneNumber,
      receiptLocation: pkg.receiptLocation,
      receiptDate: pkg.receiptDate,
      deliveryLocation: pkg.deliveryLocation,
      status: pkg.status,
      customerInfo: pkg.customerInfo,
    });
    setEditDialogOpen(true);
  };

  const onEditSubmit = (data: z.infer<typeof packageSchema>) => {
    if (currentPackageIndex === null) return;
    
    const updatedPackage: Package = {
      trackingNumber: data.trackingNumber,
      recipientName: data.recipientName,
      phoneNumber: data.phoneNumber,
      receiptLocation: data.receiptLocation,
      receiptDate: data.receiptDate,
      deliveryLocation: data.deliveryLocation,
      status: data.status,
      customerInfo: data.customerInfo || "",
    };
    
    // Vérifier si le numéro de suivi a changé et s'il existe déjà
    const originalPackage = packages[currentPackageIndex];
    if (originalPackage.trackingNumber !== updatedPackage.trackingNumber) {
      const existingIndex = packages.findIndex(p => p.trackingNumber === updatedPackage.trackingNumber);
      if (existingIndex >= 0 && existingIndex !== currentPackageIndex) {
        toast({
          title: t.error,
          description: t.trackingExists,
          variant: "destructive",
        });
        return;
      }
      
      // Supprimer l'ancien numéro de suivi du localStorage
      removePackageFromLocalStorage(originalPackage.trackingNumber);
    }
    
    // Mettre à jour le colis dans le localStorage
    savePackageToLocalStorage(updatedPackage);
    
    // Mettre à jour l'état local
    const updatedPackages = [...packages];
    updatedPackages[currentPackageIndex] = updatedPackage;
    setPackages(updatedPackages);
    
    toast({
      title: t.packageUpdated,
      description: `${t.trackingNumber}: ${data.trackingNumber}`,
    });
    setEditDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    const packageToDelete = packages[index];
    
    // Supprimer du localStorage
    removePackageFromLocalStorage(packageToDelete.trackingNumber);
    
    // Mettre à jour l'état local
    const updatedPackages = [...packages];
    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
    
    toast({
      title: t.packageDeleted,
      description: `${t.trackingNumber}: ${packageToDelete.trackingNumber}`,
    });
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.loginTitle}</DialogTitle>
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
                  {t.loginButton}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-[#E3F2FD]/20 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">{t.dashboard}</h1>
            <p className="text-gray-500">{t.packageManagement}</p>
          </div>
          <div className="flex space-x-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px]">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t.languageSelection} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DE">{t.german}</SelectItem>
                <SelectItem value="FR">{t.french}</SelectItem>
                <SelectItem value="EN">{t.english}</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-[#E3F2FD] text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t.newPackage}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{t.addNewPackage}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="trackingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.trackingNumber}</FormLabel>
                            <FormControl>
                              <Input placeholder="PKT-123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.recipient}</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.phone}</FormLabel>
                            <FormControl>
                              <Input placeholder="+33123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiptLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.origin}</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiptDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.date}</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.destination}</FormLabel>
                            <FormControl>
                              <Input placeholder="Lyon" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.status}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.selectStatus} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="En cours">{t.inProcess}</SelectItem>
                                <SelectItem value="Expédié">{t.shipped}</SelectItem>
                                <SelectItem value="En livraison">{t.inDelivery}</SelectItem>
                                <SelectItem value="Livré">{t.delivered}</SelectItem>
                                <SelectItem value="Problème">{t.problem}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.additionalInfo}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.additionalInfo} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setOpen(false)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        {t.cancel}
                      </Button>
                      <Button type="submit">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.add}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-300"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.logout}
            </Button>
          </div>
        </div>

        {/* Modal de modification */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.edit}</DialogTitle>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="trackingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.trackingNumber}</FormLabel>
                        <FormControl>
                          <Input placeholder="PKT-123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.recipient}</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.phone}</FormLabel>
                        <FormControl>
                          <Input placeholder="+33123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="receiptLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.origin}</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="receiptDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.date}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="deliveryLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.destination}</FormLabel>
                        <FormControl>
                          <Input placeholder="Lyon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.status}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t.selectStatus} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="En cours">{t.inProcess}</SelectItem>
                            <SelectItem value="Expédié">{t.shipped}</SelectItem>
                            <SelectItem value="En livraison">{t.inDelivery}</SelectItem>
                            <SelectItem value="Livré">{t.delivered}</SelectItem>
                            <SelectItem value="Problème">{t.problem}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="customerInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.additionalInfo}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.additionalInfo} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditDialogOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {t.cancel}
                  </Button>
                  <Button type="submit">
                    <Edit className="mr-2 h-4 w-4" />
                    {t.update}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <Input
              placeholder={t.search}
              className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="outline"
              className="border-[#E3F2FD] text-blue-600 hover:bg-[#E3F2FD]/10 transition-colors duration-300"
            >
              <PackageSearch className="mr-2 h-4 w-4" />
              {t.searchButton}
            </Button>
          </div>

          <div className="rounded-xl border border-[#F5F7FA] overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F7FA]/50">
                  <TableHead className="text-gray-600">{t.trackingNumber}</TableHead>
                  <TableHead className="text-gray-600">{t.recipient}</TableHead>
                  <TableHead className="text-gray-600">{t.phone}</TableHead>
                  <TableHead className="text-gray-600">{t.origin}</TableHead>
                  <TableHead className="text-gray-600">{t.date}</TableHead>
                  <TableHead className="text-gray-600">{t.destination}</TableHead>
                  <TableHead className="text-gray-600">{t.status}</TableHead>
                  <TableHead className="text-gray-600">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg, index) => (
                    <TableRow 
                      key={pkg.trackingNumber + index} 
                      className="hover:bg-[#F5F7FA]/30 transition-colors duration-300"
                    >
                      <TableCell className="font-medium text-blue-600">{pkg.trackingNumber}</TableCell>
                      <TableCell>{pkg.recipientName}</TableCell>
                      <TableCell>{pkg.phoneNumber}</TableCell>
                      <TableCell>{pkg.receiptLocation}</TableCell>
                      <TableCell>{pkg.receiptDate}</TableCell>
                      <TableCell>{pkg.deliveryLocation}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          pkg.status === "Livré" 
                            ? "bg-green-100 text-green-600" 
                            : pkg.status === "Problème"
                            ? "bg-red-100 text-red-600"
                            : "bg-[#E3F2FD] text-blue-600"
                        }`}>
                          {pkg.status === "En cours" ? t.inProcess : 
                           pkg.status === "Expédié" ? t.shipped :
                           pkg.status === "En livraison" ? t.inDelivery : 
                           pkg.status === "Livré" ? t.delivered : 
                           pkg.status === "Problème" ? t.problem : pkg.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(packages.indexOf(pkg))}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(packages.indexOf(pkg))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      {t.noPackagesFound}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
