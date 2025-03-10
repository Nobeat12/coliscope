
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Package, CreditCard, Mailbox, Calendar } from "lucide-react";
import { TranslationType } from "@/types/package";

interface ServicesSectionProps {
  t: TranslationType;
}

const ServicesSection = ({ t }: ServicesSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-semibold mb-8 text-center">{t.ourServices}</h2>
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="tracking" className="border border-blue-100 rounded-lg overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-4 py-3">
            <div className="flex items-center">
              <Package className="h-6 w-6 mr-4 text-[#0056b3]" />
              <span>{t.packageTracking}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              {t.trackingDescription}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="costs" className="border border-blue-100 rounded-lg overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-4 py-3">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 mr-4 text-[#0056b3]" />
              <span>{t.shippingCosts}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              {t.costsDescription}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mailbox" className="border border-blue-100 rounded-lg overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-4 py-3">
            <div className="flex items-center">
              <Mailbox className="h-6 w-6 mr-4 text-[#0056b3]" />
              <span>{t.virtualMailbox}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              {t.mailboxDescription}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="planning" className="border border-blue-100 rounded-lg overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-4 py-3">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-4 text-[#0056b3]" />
              <span>{t.deliveryPlanning}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              {t.planningDescription}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ServicesSection;
