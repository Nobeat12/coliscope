
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto glass rounded-2xl p-8 animate-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Paket Management System</p>
          </div>
          <Button onClick={addPackage}>
            <Plus className="mr-2 h-4 w-4" />
            Neues Paket
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Suchen..."
              className="max-w-sm"
            />
            <Button variant="outline">
              <PackageSearch className="mr-2 h-4 w-4" />
              Suchen
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Nr.</TableHead>
                  <TableHead>Empfänger</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Abholort</TableHead>
                  <TableHead>Lieferort</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.trackingNumber}>
                    <TableCell>{pkg.trackingNumber}</TableCell>
                    <TableCell>{pkg.recipientName}</TableCell>
                    <TableCell>{pkg.phoneNumber}</TableCell>
                    <TableCell>{pkg.receiptLocation}</TableCell>
                    <TableCell>{pkg.deliveryLocation}</TableCell>
                    <TableCell>{pkg.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-primary hover:underline text-sm">
            Abmelden
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
