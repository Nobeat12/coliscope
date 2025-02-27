
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
import { PackageSearch, Plus, X } from "lucide-react";
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

const packageSchema = z.object({
  trackingNumber: z.string().min(3, "Tracking Nummer ist erforderlich"),
  recipientName: z.string().min(2, "Name ist erforderlich"),
  phoneNumber: z.string().min(5, "Telefonnummer ist erforderlich"),
  receiptLocation: z.string().min(2, "Abholort ist erforderlich"),
  receiptDate: z.string().min(5, "Datum ist erforderlich"),
  deliveryLocation: z.string().min(2, "Lieferort ist erforderlich"),
  status: z.string().min(1, "Status ist erforderlich"),
  customerInfo: z.string().optional(),
});

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      trackingNumber: "",
      recipientName: "",
      phoneNumber: "",
      receiptLocation: "",
      receiptDate: new Date().toISOString().split('T')[0],
      deliveryLocation: "",
      status: "In Bearbeitung",
      customerInfo: "",
    },
  });

  const onSubmit = (data: z.infer<typeof packageSchema>) => {
    setPackages([...packages, data]);
    toast({
      title: "Paket hinzugefügt",
      description: `Tracking Nummer: ${data.trackingNumber}`,
    });
    setOpen(false);
    form.reset();
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-[#E3F2FD]/20 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Paket Management System</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#E3F2FD] text-blue-600 hover:bg-blue-100 transition-colors duration-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Neues Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Neues Paket hinzufügen</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="trackingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking Nummer</FormLabel>
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
                          <FormLabel>Empfänger</FormLabel>
                          <FormControl>
                            <Input placeholder="Max Mustermann" {...field} />
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
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="+49123456789" {...field} />
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
                          <FormLabel>Abholort</FormLabel>
                          <FormControl>
                            <Input placeholder="Berlin" {...field} />
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
                          <FormLabel>Datum</FormLabel>
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
                          <FormLabel>Lieferort</FormLabel>
                          <FormControl>
                            <Input placeholder="München" {...field} />
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
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Status auswählen" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
                              <SelectItem value="Versandt">Versandt</SelectItem>
                              <SelectItem value="In Zustellung">In Zustellung</SelectItem>
                              <SelectItem value="Zugestellt">Zugestellt</SelectItem>
                              <SelectItem value="Problem">Problem</SelectItem>
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
                          <FormLabel>Kundeninfo</FormLabel>
                          <FormControl>
                            <Input placeholder="Zusätzliche Informationen" {...field} />
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
                      Abbrechen
                    </Button>
                    <Button type="submit">
                      <Plus className="mr-2 h-4 w-4" />
                      Hinzufügen
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Suchen..."
              className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg) => (
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
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          pkg.status === "Zugestellt" 
                            ? "bg-green-100 text-green-600" 
                            : pkg.status === "Problem"
                            ? "bg-red-100 text-red-600"
                            : "bg-[#E3F2FD] text-blue-600"
                        }`}>
                          {pkg.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Keine Pakete gefunden
                    </TableCell>
                  </TableRow>
                )}
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
