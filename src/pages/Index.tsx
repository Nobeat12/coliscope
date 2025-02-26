
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "codedesuivi@gmail.com" && password === "20250") {
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen zurück!",
      });
      navigate("/dashboard");
    } else {
      setError("Ungültige Anmeldeinformationen");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md px-8 py-12 glass rounded-2xl animate-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Paket Tracking</h1>
          <p className="text-muted-foreground">Melden Sie sich an, um fortzufahren</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12">
            Anmelden
          </Button>
        </form>

        <div className="mt-8 text-center">
          <a href="/track" className="text-primary hover:underline text-sm">
            Paket ohne Anmeldung verfolgen
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
