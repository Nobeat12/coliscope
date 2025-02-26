
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageSearch, Plus } from "lucide-react";

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

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const { toast } = useToast();

  const addPackage = () => {
    const newPackage: Package = {
      trackingNumber: `PKT-${Math.random().toString(36).substr(2, 9)}`,
      recipientName: "Max Mustermann",
      phoneNumber: "+49123456789",
      receiptLocation: "Berlin",
      receiptDate: new Date().toLocaleDateString("de-DE"),
      deliveryLocation: "München",
      status: "In Bearbeitung",
      customerInfo: "Sample Customer",
    };

    setPackages([...packages, newPackage]);
    toast({
      title: "Paket hinzugefügt",
      description: `Tracking Nummer: ${newPackage.trackingNumber}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-[#E3F2FD]/20 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Paket Management System</p>
          </div>
          <Button 
            onClick={addPackage}
            className="bg-[#E3F2FD] text-blue-600 hover:bg-blue-100 transition-colors duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Neues Paket
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Suchen..."
              className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
            />
            <Button 
              variant="outline"
              className="border-[#E3F2FD] text-blue-600 hover:bg-[#E3F2FD]/10 transition-colors duration-300"
            >
              <PackageSearch className="mr-2 h-4 w-4" />
              Suchen
            </Button>
          </div>

          <div className="rounded-xl border border-[#F5F7FA] overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F7FA]/50">
                  <TableHead className="text-gray-600">Tracking Nr.</TableHead>
                  <TableHead className="text-gray-600">Empfänger</TableHead>
                  <TableHead className="text-gray-600">Telefon</TableHead>
                  <TableHead className="text-gray-600">Abholort</TableHead>
                  <TableHead className="text-gray-600">Datum</TableHead>
                  <TableHead className="text-gray-600">Lieferort</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow 
                    key={pkg.trackingNumber}
                    className="hover:bg-[#F5F7FA]/30 transition-colors duration-300"
                  >
                    <TableCell className="font-medium text-blue-600">{pkg.trackingNumber}</TableCell>
                    <TableCell>{pkg.recipientName}</TableCell>
                    <TableCell>{pkg.phoneNumber}</TableCell>
                    <TableCell>{pkg.receiptLocation}</TableCell>
                    <TableCell>{pkg.receiptDate}</TableCell>
                    <TableCell>{pkg.deliveryLocation}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 rounded-full text-sm bg-[#E3F2FD] text-blue-600">
                        {pkg.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300"
          >
            Abmelden
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
