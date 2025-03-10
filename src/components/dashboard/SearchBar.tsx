
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageSearch } from "lucide-react";
import { TranslationType } from "@/types/package";
import { useState, useEffect } from "react";
import { predefinedPackages } from "@/data/predefinedPackages";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  t: TranslationType;
}

const SearchBar = ({ value, onChange, onSearch, t }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    // Récupérer les numéros de suivi prédéfinis pour les suggestions
    const trackingNumbers = predefinedPackages.map(pkg => pkg.trackingNumber);
    setSuggestions(trackingNumbers);
  }, []);
  
  const handleSearch = () => {
    setIsSearching(true);
    onSearch(value);
    setTimeout(() => setIsSearching(false), 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="flex space-x-4">
      <Input
        placeholder={t.search}
        className="max-w-sm border-[#F5F7FA] focus:border-[#003366] transition-colors duration-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => setShowSuggestions(true)}
        list={showSuggestions ? "dashboard-tracking-numbers" : undefined}
      />
      {showSuggestions && (
        <datalist id="dashboard-tracking-numbers">
          {suggestions.map(number => (
            <option key={number} value={number} />
          ))}
        </datalist>
      )}
      <Button 
        variant="outline"
        className="border-[#003366] text-[#003366] hover:bg-[#003366]/10 transition-colors duration-300"
        onClick={handleSearch}
        disabled={isSearching}
      >
        <PackageSearch className="mr-2 h-4 w-4" />
        {isSearching ? "..." : t.searchButton}
      </Button>
    </div>
  );
};

export default SearchBar;
