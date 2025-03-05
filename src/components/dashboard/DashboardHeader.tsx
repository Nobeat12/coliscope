
import { Button } from "@/components/ui/button";
import { Globe, LogOut, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslationType } from "@/types/package";

interface DashboardHeaderProps {
  t: TranslationType;
  language: string;
  onLanguageChange: (value: string) => void;
  onNewPackage: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({ 
  t, 
  language, 
  onLanguageChange, 
  onNewPackage, 
  onLogout 
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">{t.dashboard}</h1>
        <p className="text-gray-500">{t.packageManagement}</p>
      </div>
      <div className="flex space-x-4">
        <Select value={language} onValueChange={onLanguageChange}>
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

        <Button 
          className="bg-[#003366] text-white hover:bg-[#00264d] transition-colors duration-300"
          onClick={onNewPackage}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t.newPackage}
        </Button>

        <Button 
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-300"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t.logout}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
