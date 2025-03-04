
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageSearch } from "lucide-react";
import { TranslationType } from "@/types/package";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  t: TranslationType;
}

const SearchBar = ({ value, onChange, t }: SearchBarProps) => {
  return (
    <div className="flex space-x-4">
      <Input
        placeholder={t.search}
        className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button 
        variant="outline"
        className="border-[#E3F2FD] text-blue-600 hover:bg-[#E3F2FD]/10 transition-colors duration-300"
      >
        <PackageSearch className="mr-2 h-4 w-4" />
        {t.searchButton}
      </Button>
    </div>
  );
};

export default SearchBar;
