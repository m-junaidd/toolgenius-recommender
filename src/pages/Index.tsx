
import { useState } from 'react';
import Hero from '@/components/Hero';
import SearchInput from '@/components/SearchInput';
import ToolList from '@/components/ToolList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTools } from '@/hooks/useTools';
import { dummyTools } from '@/lib/dummyData';

const Index = () => {
  const { tools, isLoading, error, lastQuery, searchTools } = useTools();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    searchTools(query);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-6 px-4 border-b border-border/40 bg-background/90 backdrop-blur-sm fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">A</div>
            <span className="text-xl font-medium">AI Tools Finder</span>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <a href="#" className="px-4 py-2 rounded-md text-sm hover:bg-secondary transition">Features</a>
            <a href="#" className="px-4 py-2 rounded-md text-sm hover:bg-secondary transition">Categories</a>
            <a href="#" className="px-4 py-2 rounded-md text-sm hover:bg-secondary transition">About</a>
          </nav>
          
          <div>
            <button className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md text-sm transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <Hero />
        
        <SearchInput 
          onSearch={handleSearch}
          isLoading={isLoading}
          className="mb-12"
        />
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mt-8 mb-12 max-w-2xl mx-auto">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          <div className="animate-in">
            <ToolList tools={tools} />
            
            {tools.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  {lastQuery && `Results for "${lastQuery}"`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-medium mb-2">Popular AI Tools</h2>
              <p className="text-muted-foreground">Browse some of the most popular AI tools</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyTools.slice(0, 6).map((tool, index) => (
                <div key={tool.id} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="glass-panel rounded-xl p-6 h-full transition-all duration-300 hover:shadow-medium group">
                    <div className="flex items-center mb-4">
                      {tool.imageUrl ? (
                        <div className="w-10 h-10 mr-3 rounded-lg overflow-hidden bg-white/50 flex items-center justify-center">
                          <img 
                            src={tool.imageUrl} 
                            alt={tool.name}
                            className="w-8 h-8 object-contain" 
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 mr-3 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {tool.name.substring(0, 2)}
                        </div>
                      )}
                      <h3 className="font-medium text-lg">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">{tool.category}</span>
                      <span className="text-xs text-muted-foreground">{tool.pricing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t border-border/40 py-8 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xs">A</div>
              <span className="text-sm font-medium">AI Tools Finder</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Tools Finder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
