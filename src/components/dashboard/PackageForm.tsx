
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PackageSchema } from "@/lib/schemas";
import { Package, TranslationType } from "@/types/package";
import { generateUniqueTrackingNumber } from "@/lib/utils-package";

interface PackageFormProps {
  onSubmit: (data: z.infer<typeof PackageSchema>) => void;
  packages: Package[];
  onCancel: () => void;
  t: TranslationType;
  isEdit?: boolean;
}

const PackageForm = ({ 
  onSubmit, 
  packages, 
  onCancel, 
  t, 
  isEdit = false 
}: PackageFormProps) => {
  const form = useForm<z.infer<typeof PackageSchema>>({
    resolver: zodResolver(PackageSchema),
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

  const handleGenerateTrackingNumber = () => {
    const uniqueTrackingNumber = generateUniqueTrackingNumber(packages);
    form.setValue("trackingNumber", uniqueTrackingNumber);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.trackingNumber}</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input placeholder="PKT-123456789" {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleGenerateTrackingNumber}
                    className="flex-shrink-0"
                  >
                    <PackageSearch className="h-4 w-4" />
                  </Button>
                </div>
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
            onClick={onCancel}
          >
            <X className="mr-2 h-4 w-4" />
            {t.cancel}
          </Button>
          <Button type="submit">
            {isEdit ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {t.update}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {t.add}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PackageForm;
