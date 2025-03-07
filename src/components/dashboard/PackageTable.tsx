
import { Package, TranslationType } from "@/types/package";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { predefinedPackages } from "@/data/predefinedPackages";

interface PackageTableProps {
  packages: Package[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  t: TranslationType;
}

const PackageTable = ({ packages, onEdit, onDelete, t }: PackageTableProps) => {
  // Liste des numéros de suivi prédéfinis pour les mettre en évidence
  const predefinedTrackingNumbers = predefinedPackages.map(pkg => pkg.trackingNumber);

  return (
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
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
            <TableRow 
              key={pkg.trackingNumber + index} 
              className={`hover:bg-[#F5F7FA]/30 transition-colors duration-300 ${
                predefinedTrackingNumbers.includes(pkg.trackingNumber) ? 'bg-blue-50' : ''
              }`}
            >
              <TableCell className="font-medium text-[#003366]">{pkg.trackingNumber}</TableCell>
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
                    : "bg-[#003366]/10 text-[#003366]"
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
                    onClick={() => onEdit(index)}
                  >
                    <Edit className="h-4 w-4 text-[#003366]" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDelete(index)}
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
  );
};

export default PackageTable;
