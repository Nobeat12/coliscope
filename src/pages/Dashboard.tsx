
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
import { PackageSearch, Plus, X, Edit, Trash2, LogOut } from "lucide-react";
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

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    if (data.email === "codedesuivi@gmail.com" && data.password === "20250") {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setLoginDialogOpen(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants invalides",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté",
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
        title: "Erreur",
        description: "Ce numéro de suivi existe déjà",
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
      title: "Colis ajouté",
      description: `Numéro de suivi: ${data.trackingNumber}`,
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
          title: "Erreur",
          description: "Ce numéro de suivi existe déjà",
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
      title: "Colis modifié",
      description: `Numéro de suivi: ${data.trackingNumber}`,
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
      title: "Colis supprimé",
      description: `Numéro de suivi: ${packageToDelete.trackingNumber}`,
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
            <DialogTitle>Connexion</DialogTitle>
          </DialogHeader>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 mt-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Entrez votre email" {...field} />
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Entrez votre mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  Connexion
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
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Tableau de bord</h1>
            <p className="text-gray-500">Système de gestion de colis</p>
          </div>
          <div className="flex space-x-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-[#E3F2FD] text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau colis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau colis</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="trackingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro de suivi</FormLabel>
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
                            <FormLabel>Destinataire</FormLabel>
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
                            <FormLabel>Téléphone</FormLabel>
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
                            <FormLabel>Lieu de collecte</FormLabel>
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
                            <FormLabel>Date</FormLabel>
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
                            <FormLabel>Lieu de livraison</FormLabel>
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
                            <FormLabel>Statut</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="En cours">En cours</SelectItem>
                                <SelectItem value="Expédié">Expédié</SelectItem>
                                <SelectItem value="En livraison">En livraison</SelectItem>
                                <SelectItem value="Livré">Livré</SelectItem>
                                <SelectItem value="Problème">Problème</SelectItem>
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
                            <FormLabel>Informations supplémentaires</FormLabel>
                            <FormControl>
                              <Input placeholder="Informations complémentaires" {...field} />
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
                        Annuler
                      </Button>
                      <Button type="submit">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter
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
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Modal de modification */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier le colis</DialogTitle>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="trackingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de suivi</FormLabel>
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
                        <FormLabel>Destinataire</FormLabel>
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
                        <FormLabel>Téléphone</FormLabel>
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
                        <FormLabel>Lieu de collecte</FormLabel>
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
                        <FormLabel>Date</FormLabel>
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
                        <FormLabel>Lieu de livraison</FormLabel>
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
                        <FormLabel>Statut</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="En cours">En cours</SelectItem>
                            <SelectItem value="Expédié">Expédié</SelectItem>
                            <SelectItem value="En livraison">En livraison</SelectItem>
                            <SelectItem value="Livré">Livré</SelectItem>
                            <SelectItem value="Problème">Problème</SelectItem>
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
                        <FormLabel>Informations supplémentaires</FormLabel>
                        <FormControl>
                          <Input placeholder="Informations complémentaires" {...field} />
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
                    Annuler
                  </Button>
                  <Button type="submit">
                    <Edit className="mr-2 h-4 w-4" />
                    Mettre à jour
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Rechercher..."
              className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="outline"
              className="border-[#E3F2FD] text-blue-600 hover:bg-[#E3F2FD]/10 transition-colors duration-300"
            >
              <PackageSearch className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>

          <div className="rounded-xl border border-[#F5F7FA] overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F7FA]/50">
                  <TableHead className="text-gray-600">Numéro de suivi</TableHead>
                  <TableHead className="text-gray-600">Destinataire</TableHead>
                  <TableHead className="text-gray-600">Téléphone</TableHead>
                  <TableHead className="text-gray-600">Lieu de collecte</TableHead>
                  <TableHead className="text-gray-600">Date</TableHead>
                  <TableHead className="text-gray-600">Lieu de livraison</TableHead>
                  <TableHead className="text-gray-600">Statut</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
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
                          {pkg.status}
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
                      Aucun colis trouvé
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
