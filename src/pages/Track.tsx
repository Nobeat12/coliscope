
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const { toast } = useToast();

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Suche nach Paket",
      description: `Tracking Nummer: ${trackingNumber}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-xl glass rounded-2xl p-8 animate-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Paket verfolgen</h1>
          <p className="text-muted-foreground">
            Geben Sie Ihre Tracking-Nummer ein
          </p>
        </div>

        <form onSubmit={handleTracking} className="space-y-6">
          <div className="flex space-x-4">
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Tracking Nummer eingeben"
              className="h-12"
              required
            />
            <Button type="submit" className="h-12 px-6">
              <Search className="mr-2 h-4 w-4" />
              Suchen
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-primary hover:underline text-sm">
            Zurück zur Anmeldung
          </a>
        </div>
      </div>
    </div>
  );
};

export default Track;
