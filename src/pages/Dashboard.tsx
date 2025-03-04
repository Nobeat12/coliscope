
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Package } from "@/types/package";
import { PackageStorage } from "@/lib/utils-package";
import { translations } from "@/lib/translations";
import { PackageSchema, LoginSchema } from "@/lib/schemas";

// Dashboard components
import PackageForm from "@/components/dashboard/PackageForm";
import PackageTable from "@/components/dashboard/PackageTable";
import LoginForm from "@/components/dashboard/LoginForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchBar from "@/components/dashboard/SearchBar";

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || "DE";
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const t = translations[language as keyof typeof translations];

  const editForm = useForm<z.infer<typeof PackageSchema>>({
    resolver: zodResolver(PackageSchema),
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

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
      setIsLoadingAuth(false);
      
      if (authStatus !== 'true') {
        setLoginDialogOpen(true);
      }
    };
    
    checkAuth();
  }, []);

  // Load packages on component mount
  useEffect(() => {
    const loadPackages = async () => {
      setIsLoadingPackages(true);
      try {
        const pkgs = await PackageStorage.getPackages();
        setPackages(pkgs);
        console.log("Packages loaded from storage:", pkgs.length);
      } catch (error) {
        console.error("Error loading packages:", error);
        toast({
          title: t.error,
          description: "Erreur lors du chargement des colis",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPackages(false);
      }
    };
    
    loadPackages();

    // Set up periodic refresh to check for new packages from other devices
    const refreshInterval = setInterval(async () => {
      const pkgs = await PackageStorage.getPackages();
      if (JSON.stringify(pkgs) !== JSON.stringify(packages)) {
        setPackages(pkgs);
        console.log("Packages refreshed from storage:", pkgs.length);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const onLoginSubmit = (data: z.infer<typeof LoginSchema>) => {
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

  const handleOpenNewPackageDialog = () => {
    setOpen(true);
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

  const onSubmit = async (data: z.infer<typeof PackageSchema>) => {
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
    
    const existingIndex = packages.findIndex(p => p.trackingNumber === newPackage.trackingNumber);
    if (existingIndex >= 0 && currentPackageIndex === null) {
      toast({
        title: t.error,
        description: t.trackingExists,
        variant: "destructive",
      });
      return;
    }
    
    try {
      await PackageStorage.savePackage(newPackage);
      
      // Reload all packages to ensure consistency
      const updatedPackages = await PackageStorage.getPackages();
      setPackages(updatedPackages);
      
      toast({
        title: t.packageAdded,
        description: `${t.trackingNumber}: ${data.trackingNumber}`,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error saving package:", error);
      toast({
        title: t.error,
        description: "Erreur lors de l'enregistrement du colis",
        variant: "destructive",
      });
    }
  };

  const onEditSubmit = async (data: z.infer<typeof PackageSchema>) => {
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
      
      try {
        await PackageStorage.removePackage(originalPackage.trackingNumber);
      } catch (error) {
        console.error("Error removing original package:", error);
      }
    }
    
    try {
      await PackageStorage.savePackage(updatedPackage);
      
      // Reload all packages to ensure consistency
      const updatedPackages = await PackageStorage.getPackages();
      setPackages(updatedPackages);
      
      toast({
        title: t.packageUpdated,
        description: `${t.trackingNumber}: ${data.trackingNumber}`,
      });
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating package:", error);
      toast({
        title: t.error,
        description: "Erreur lors de la mise à jour du colis",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (index: number) => {
    const packageToDelete = packages[index];
    
    try {
      await PackageStorage.removePackage(packageToDelete.trackingNumber);
      
      // Remove from local state
      const updatedPackages = [...packages];
      updatedPackages.splice(index, 1);
      setPackages(updatedPackages);
      
      toast({
        title: t.packageDeleted,
        description: `${t.trackingNumber}: ${packageToDelete.trackingNumber}`,
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      toast({
        title: t.error,
        description: "Erreur lors de la suppression du colis",
        variant: "destructive",
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
    // Additional search handling can be added here if needed
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.loginTitle}</DialogTitle>
            <DialogDescription>
              Connectez-vous pour accéder au tableau de bord
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSubmit={onLoginSubmit} t={t} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-[#E3F2FD]/20 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-in">
        <DashboardHeader 
          t={t} 
          language={language} 
          onLanguageChange={handleLanguageChange} 
          onNewPackage={handleOpenNewPackageDialog} 
          onLogout={handleLogout} 
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.addNewPackage}</DialogTitle>
            </DialogHeader>
            <PackageForm 
              onSubmit={onSubmit} 
              packages={packages} 
              onCancel={() => setOpen(false)} 
              t={t} 
            />
          </DialogContent>
        </Dialog>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.edit}</DialogTitle>
            </DialogHeader>
            <PackageForm 
              onSubmit={onEditSubmit} 
              packages={packages} 
              onCancel={() => setEditDialogOpen(false)} 
              t={t} 
              isEdit={true} 
            />
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          <SearchBar 
            value={searchQuery} 
            onChange={handleSearchChange} 
            onSearch={handleSearch}
            t={t} 
          />

          <div className="rounded-xl border border-[#F5F7FA] overflow-hidden bg-white">
            {isLoadingPackages ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Chargement des colis...</p>
              </div>
            ) : (
              <PackageTable 
                packages={filteredPackages} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                t={t} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
