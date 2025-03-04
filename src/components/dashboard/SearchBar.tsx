
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageSearch } from "lucide-react";
import { TranslationType } from "@/types/package";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  t: TranslationType;
}

const SearchBar = ({ value, onChange, onSearch, t }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  
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
        className="max-w-sm border-[#F5F7FA] focus:border-[#E3F2FD] transition-colors duration-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        variant="outline"
        className="border-[#E3F2FD] text-blue-600 hover:bg-[#E3F2FD]/10 transition-colors duration-300"
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
