
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Package, CreditCard, Mailbox, Calendar } from "lucide-react";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine Tracking-Nummer ein",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Suche nach Paket",
      description: `Tracking Nummer: ${trackingNumber}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled 
            ? "bg-white shadow-md" 
            : "bg-[#FFC107]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/" className="font-bold text-2xl">Logo</a>
            <nav className="hidden md:flex space-x-8">
              <a href="/track" className="hover:text-blue-600 transition-colors">Pakete verfolgen</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">Unsere Dienste</a>
              <a href="/help" className="hover:text-blue-600 transition-colors">Hilfe</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">Kontakt</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600"
            >
              DE
            </Button>
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Anmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#FFC107] to-white py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">Verfolgen Sie Ihr Paket</h1>
            <form onSubmit={handleTracking} className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Tracking Nummer eingeben"
                  className="h-12 text-lg"
                />
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Verfolgen
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Unsere Dienste</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="tracking">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Package className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>Paketverfolgung</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Verfolgen Sie den aktuellen Status und Standort Ihres Pakets in Echtzeit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="costs">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>Versandkosten</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Transparente Preise für alle Versandoptionen und Destinationen.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mailbox">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Mailbox className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>Virtuelle Mailbox</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Verwalten Sie Ihre Sendungen digital und papierlos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="planning">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-4 text-[#FFC107]" />
                  <span>Lieferplanung</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Planen Sie Ihre Lieferungen im Voraus und wählen Sie Ihr Wunschzeitfenster.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default Track;
