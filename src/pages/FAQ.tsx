import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Phone, Mail, Clock, MapPin, Globe, HelpCircle, Package, Info, Calendar, Smartphone, Laptop
} from "lucide-react";

// Traductions
const translations = {
  DE: {
    faqTitle: "Häufig gestellte Fragen",
    faqDescription: "Finden Sie Antworten auf Ihre Fragen zum Paketverfolgungsdienst",
    contactCenter: "Kontaktzentrum",
    address: "Adresse Kontaktzentrum",
    mondayToFriday: "Montag bis Freitag",
    saturday: "Samstag",
    buttonBack: "Zurück zur Startseite",
    languageSelection: "Sprache",
    german: "Deutsch",
    french: "Französisch",
    english: "Englisch",
    // FAQs
    delivery: "Lieferung und Sendungen",
    tracking: "Sendungsverfolgung",
    pricing: "Preise und Kosten",
    returns: "Rücksendungen",
    international: "Internationale Sendungen",
    // Questions and answers
    q1: "Wie kann ich mein Paket verfolgen?",
    a1: "Sie können Ihr Paket verfolgen, indem Sie Ihre Sendungsnummer auf unserer Startseite eingeben. Sie erhalten dann Echtzeit-Updates zum Standort und Status Ihres Pakets.",
    q2: "Was soll ich tun, wenn mein Paket nicht ankommt?",
    a2: "Wenn Ihr Paket nicht innerhalb des erwarteten Zeitrahmens ankommt, überprüfen Sie zunächst den Status mit Ihrer Sendungsnummer. Falls Sie weitere Hilfe benötigen, kontaktieren Sie bitte unser Kontaktzentrum unter +41 848 888 888.",
    q3: "Wie lange dauert die Standardlieferung?",
    a3: "Die Standardlieferung dauert in der Regel 3-5 Werktage innerhalb des Landes. Internationale Sendungen können je nach Zielland 7-14 Tage dauern.",
    q4: "Welche Zahlungsmethoden werden akzeptiert?",
    a4: "Wir akzeptieren Kreditkarten (Visa, MasterCard, American Express), PayPal und Banküberweisung.",
    q5: "Wie kann ich eine Rücksendung veranlassen?",
    a5: "Um eine Rücksendung zu veranlassen, loggen Sie sich in Ihr Konto ein und wählen Sie das Paket, das Sie zurücksenden möchten. Folgen Sie den Anweisungen, um ein Rücksendeetikett zu erstellen und Ihre Rücksendung zu planen.",
    q6: "Kann ich den Liefertermin ändern?",
    a6: "Ja, Sie können den Liefertermin ändern, indem Sie die Sendungsnummer verwenden, um Ihr Paket zu verfolgen und dann die Option 'Lieferung ändern' auszuwählen. Beachten Sie, dass dies mindestens 24 Stunden vor der geplanten Lieferung erfolgen muss.",
    q7: "Was ist im Versandpreis enthalten?",
    a7: "Der Standardversandpreis umfasst die Abholung, den Transport und die Lieferung Ihres Pakets. Versicherung und Zusatzleistungen wie Express- oder Wochenendlieferung können zusätzliche Kosten verursachen.",
    q8: "Wie kann ich den Kundenservice kontaktieren?",
    a8: "Sie können unseren Kundenservice telefonisch unter +41 848 888 888 erreichen, montags bis freitags von 7:30 bis 18:00 Uhr und samstags von 8:00 bis 12:00 Uhr. Alternativ können Sie uns über das Kontaktformular auf unserer Website erreichen.",
    
    // Added contact translations
    contactUs: "Kontaktieren Sie uns",
    emailUs: "E-Mail",
    phoneCall: "Telefon",
    visitUs: "Besuchen Sie uns",
    mobileApp: "Mobile App",
    webApp: "Web App",
    downloadApp: "Laden Sie unsere App herunter, um Ihre Sendungen unterwegs zu verfolgen.",
    useWebsite: "Nutzen Sie unsere Website für umfassende Sendungsverfolgung und Support.",
    emailAddress: "support@packtrack.ch",
    workingHours: "Öffnungszeiten",
    followUs: "Folgen Sie uns",
    feedback: "Feedback"
  },
  FR: {
    faqTitle: "Questions fréquemment posées",
    faqDescription: "Trouvez des réponses à vos questions sur le service de suivi de colis",
    contactCenter: "Centre de contact",
    address: "Adresse du centre de contact",
    mondayToFriday: "Du lundi au vendredi",
    saturday: "Samedi",
    buttonBack: "Retour à la page d'accueil",
    languageSelection: "Langue",
    german: "Allemand",
    french: "Français",
    english: "Anglais",
    // FAQs
    delivery: "Livraison et expédition",
    tracking: "Suivi des colis",
    pricing: "Prix et coûts",
    returns: "Retours",
    international: "Envois internationaux",
    // Questions and answers
    q1: "Comment puis-je suivre mon colis ?",
    a1: "Vous pouvez suivre votre colis en entrant votre numéro de suivi sur notre page d'accueil. Vous recevrez des mises à jour en temps réel sur l'emplacement et le statut de votre colis.",
    q2: "Que faire si mon colis n'arrive pas ?",
    a2: "Si votre colis n'arrive pas dans le délai prévu, vérifiez d'abord son statut avec votre numéro de suivi. Si vous avez besoin d'aide supplémentaire, veuillez contacter notre centre de contact au +41 848 888 888.",
    q3: "Combien de temps prend la livraison standard ?",
    a3: "La livraison standard prend généralement 3 à 5 jours ouvrables à l'intérieur du pays. Les envois internationaux peuvent prendre de 7 à 14 jours selon le pays de destination.",
    q4: "Quels modes de paiement sont acceptés ?",
    a4: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal et les virements bancaires.",
    q5: "Comment puis-je effectuer un retour ?",
    a5: "Pour effectuer un retour, connectez-vous à votre compte et sélectionnez le colis que vous souhaitez retourner. Suivez les instructions pour créer une étiquette de retour et planifier votre retour.",
    q6: "Puis-je modifier la date de livraison ?",
    a6: "Oui, vous pouvez modifier la date de livraison en utilisant le numéro de suivi pour suivre votre colis, puis en sélectionnant l'option 'Modifier la livraison'. Notez que cela doit être fait au moins 24 heures avant la livraison prévue.",
    q7: "Qu'est-ce qui est inclus dans le prix d'expédition ?",
    a7: "Le prix d'expédition standard comprend la collecte, le transport et la livraison de votre colis. L'assurance et les services supplémentaires comme la livraison express ou le week-end peuvent entraîner des frais supplémentaires.",
    q8: "Comment puis-je contacter le service client ?",
    a8: "Vous pouvez contacter notre service client par téléphone au +41 848 888 888, du lundi au vendredi de 7h30 à 18h00 et le samedi de 8h00 à 12h00. Vous pouvez également nous contacter via le formulaire de contact sur notre site web.",
    
    // Added contact translations
    contactUs: "Contactez-nous",
    emailUs: "E-mail",
    phoneCall: "Téléphone",
    visitUs: "Visitez-nous",
    mobileApp: "Application mobile",
    webApp: "Application web",
    downloadApp: "Téléchargez notre application pour suivre vos envois en déplacement.",
    useWebsite: "Utilisez notre site web pour un suivi complet des envois et une assistance.",
    emailAddress: "support@packtrack.ch",
    workingHours: "Heures d'ouverture",
    followUs: "Suivez-nous",
    feedback: "Commentaires"
  },
  EN: {
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Find answers to your questions about the package tracking service",
    contactCenter: "Contact Center",
    address: "Contact Center Address",
    mondayToFriday: "Monday to Friday",
    saturday: "Saturday",
    buttonBack: "Back to Home",
    languageSelection: "Language",
    german: "German",
    french: "French",
    english: "English",
    // FAQs
    delivery: "Delivery and Shipping",
    tracking: "Package Tracking",
    pricing: "Pricing and Costs",
    returns: "Returns",
    international: "International Shipments",
    // Questions and answers
    q1: "How can I track my package?",
    a1: "You can track your package by entering your tracking number on our home page. You will receive real-time updates on the location and status of your package.",
    q2: "What should I do if my package doesn't arrive?",
    a2: "If your package doesn't arrive within the expected timeframe, first check its status using your tracking number. If you need further assistance, please contact our contact center at +41 848 888 888.",
    q3: "How long does standard delivery take?",
    a3: "Standard delivery typically takes 3-5 business days within the country. International shipments may take 7-14 days depending on the destination country.",
    q4: "What payment methods are accepted?",
    a4: "We accept credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.",
    q5: "How can I arrange a return?",
    a5: "To arrange a return, log into your account and select the package you wish to return. Follow the instructions to create a return label and schedule your return.",
    q6: "Can I change the delivery date?",
    a6: "Yes, you can change the delivery date by using the tracking number to track your package and then selecting the 'Change delivery' option. Note that this must be done at least 24 hours before the scheduled delivery.",
    q7: "What's included in the shipping price?",
    a7: "The standard shipping price includes collection, transportation, and delivery of your package. Insurance and additional services like express or weekend delivery may incur additional costs.",
    q8: "How can I contact customer service?",
    a8: "You can reach our customer service by phone at +41 848 888 888, Monday to Friday from 7:30 AM to 6:00 PM and Saturday from 8:00 AM to 12:00 PM. Alternatively, you can contact us through the contact form on our website.",
    
    // Added contact translations
    contactUs: "Contact Us",
    emailUs: "Email",
    phoneCall: "Phone",
    visitUs: "Visit Us",
    mobileApp: "Mobile App",
    webApp: "Web App",
    downloadApp: "Download our app to track your shipments on the go.",
    useWebsite: "Use our website for comprehensive shipment tracking and support.",
    emailAddress: "support@packtrack.ch",
    workingHours: "Working Hours",
    followUs: "Follow Us",
    feedback: "Feedback"
  }
};

const FAQ = () => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || "DE";
  });
  const navigate = useNavigate();

  // Langue sélectionnée
  const t = translations[language as keyof typeof translations];

  // Sauvegarder la langue dans localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
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
            <a href="/" className="w-12 h-12">
              <img 
                src="/lovable-uploads/9dd54a53-50ad-417d-a0a2-3b4110ef83fb.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </a>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-blue-600 transition-colors">Tracking</a>
              <a href="/#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="/help" className="hover:text-blue-600 transition-colors">Help</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors font-semibold">FAQ</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">{t.faqTitle}</h1>
            <p className="text-gray-600">{t.faqDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-blue-600" />
                FAQ
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Package className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q1}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a1}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q2}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a2}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q3}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a3}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q6}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a6}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Package className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q5}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a5}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q7}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a7}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7" className="border rounded-lg p-2">
                  <AccordionTrigger className="hover:no-underline font-medium text-left">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-[#FFC107] mt-0.5 shrink-0" />
                      <span>{t.q8}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {t.a8}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Contact Information - Enhanced Version */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                {t.contactUs}
              </h2>
              
              <Card className="mb-6 border-[#E3F2FD]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-blue-600" />
                    {t.phoneCall}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-xl mb-2">+41 848 888 888</p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">{t.mondayToFriday}</p>
                        <p className="font-medium">7 h 30 – 18 h 00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">{t.saturday}</p>
                        <p className="font-medium">8 h 00 – 12 h 00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6 border-[#E3F2FD]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-blue-600" />
                    {t.emailUs}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-xl mb-2">{t.emailAddress}</p>
                  <p className="text-gray-600">{t.feedback}</p>
                </CardContent>
              </Card>
              
              <Card className="mb-6 border-[#E3F2FD]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                    {t.visitUs}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    <p className="font-medium">Post CH Netz AG</p>
                    <p>Contact Center Post</p>
                    <p>Wankdorfallee 4</p>
                    <p>3030 Bern, Switzerland</p>
                  </address>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-500">{t.workingHours}:</p>
                    <p className="text-gray-600">{t.mondayToFriday}: 8 h 00 – 17 h 00</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border-[#E3F2FD]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Smartphone className="mr-2 h-4 w-4 text-blue-600" />
                      {t.mobileApp}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{t.downloadApp}</p>
                  </CardContent>
                </Card>
                
                <Card className="border-[#E3F2FD]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Laptop className="mr-2 h-4 w-4 text-blue-600" />
                      {t.webApp}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{t.useWebsite}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {t.buttonBack}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
