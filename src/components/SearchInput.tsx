
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  className?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchInput = ({ className, onSearch, isLoading = false }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form 
        onSubmit={handleSubmit}
        className="animate-in stagger-4 relative"
      >
        <div className="glass-panel flex items-center rounded-xl shadow-soft transition-all duration-300 focus-within:shadow-medium">
          <Input
            type="text"
            placeholder="Describe your work or task (e.g., 'I need to edit videos for social media')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-0 h-14 pl-5 pr-32 text-base md:text-lg w-full focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 h-10 rounded-lg transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                <span>Thinking...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <SearchIcon size={18} className="mr-2" />
                <span>Search</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
