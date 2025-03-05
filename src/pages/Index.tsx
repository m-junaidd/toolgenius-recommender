
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import SearchInput from '@/components/SearchInput';
import ToolList from '@/components/ToolList';
import LoadingSpinner from '@/components/LoadingSpinner';
import AuthModal from '@/components/auth/AuthModal';
import ProfileModal from '@/components/auth/ProfileModal';
import { useTools } from '@/hooks/useTools';
import { useAuth } from '@/contexts/AuthContext';
import { dummyTools } from '@/lib/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserCircle, Menu, X, ChevronDown, Star, ZapIcon, Sparkles, ShieldCheck, Globe, ChevronsRight } from 'lucide-react';

const Index = () => {
  const { tools, isLoading, error, lastQuery, searchTools } = useTools();
  const [hasSearched, setHasSearched] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Check if user needs to complete profile
  useEffect(() => {
    if (user && !user.isProfileComplete) {
      // Wait a moment before showing the profile modal after login
      const timer = setTimeout(() => {
        setProfileModalOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleSearch = (query: string) => {
    searchTools(query);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-4 border-b border-border/40 bg-background/90 backdrop-blur-sm fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">A</div>
            <span className="text-xl font-medium">AI Tools Finder</span>
          </div>
          
          <nav className={`${mobileMenuOpen ? 'fixed inset-0 flex flex-col items-center justify-center bg-background z-50' : 'hidden'} md:relative md:flex md:space-x-1 md:bg-transparent`}>
            {mobileMenuOpen && (
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-foreground md:hidden"
              >
                <X size={24} />
              </button>
            )}
            
            <a href="#features" className="px-4 py-3 rounded-md text-base md:text-sm hover:bg-secondary transition mb-2 md:mb-0">Features</a>
            <a href="#categories" className="px-4 py-3 rounded-md text-base md:text-sm hover:bg-secondary transition mb-2 md:mb-0">Categories</a>
            <a href="#testimonials" className="px-4 py-3 rounded-md text-base md:text-sm hover:bg-secondary transition mb-2 md:mb-0">Testimonials</a>
            <a href="#about" className="px-4 py-3 rounded-md text-base md:text-sm hover:bg-secondary transition mb-6 md:mb-0">About</a>
            
            {mobileMenuOpen && (
              <div className="mt-6 md:hidden">
                {user ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={() => {
                        setProfileModalOpen(true);
                        setMobileMenuOpen(false);
                      }} 
                      variant="outline" 
                      className="w-full bg-primary/10 text-primary border-0"
                    >
                      Complete Profile
                    </Button>
                    <Button onClick={logout} className="w-full btn-green">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }} 
                    className="w-full btn-green"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            )}
          </nav>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <span className="mr-2 hidden md:block">{user.name}</span>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setProfileModalOpen(true)}
                    className="bg-primary/10 text-primary hover:bg-primary/20 border-0 hidden md:flex"
                  >
                    {user.isProfileComplete ? 'Update Profile' : 'Complete Profile'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                    className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                  >
                    <UserCircle className="mr-1" size={18} /> Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-primary/10 text-primary hover:bg-primary/20 border-0 hidden md:flex"
              >
                <UserCircle className="mr-1" size={18} /> Sign In
              </Button>
            )}
            
            <button 
              className="ml-2 p-2 rounded-md md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto pb-16">
        {/* Search section at the top */}
        <div className="pt-28 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Find the perfect <span className="text-primary relative">AI tools
                <div className="absolute inset-x-0 bottom-1 h-3 bg-primary/20 -z-10 skew-x-12 transform"></div>
              </span> for your workflow
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your work or task, and we'll recommend the best AI tools 
              to enhance your productivity and creativity.
            </p>
          </div>
          
          <SearchInput 
            onSearch={handleSearch}
            isLoading={isLoading}
            className="mb-12"
          />
        </div>
        
        {/* Show error if any */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mt-4 mb-8 max-w-2xl mx-auto">
            <p>{error}</p>
          </div>
        )}
        
        {/* Search Results */}
        {isLoading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          <div className="animate-in px-4">
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
          <div className="space-y-20 px-4">
            {/* Features Section */}
            <section id="features" className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How AI Tools Finder Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered platform helps you discover the perfect tools for your specific needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Search</h3>
                  <p className="text-muted-foreground">
                    Our AI understands your workflow needs and suggests the perfect tools to boost your productivity.
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Verified Tools</h3>
                  <p className="text-muted-foreground">
                    Every tool is verified and reviewed to ensure you get reliable, high-quality recommendations.
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ZapIcon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Boost Productivity</h3>
                  <p className="text-muted-foreground">
                    Save hours of research by finding the perfect AI tools to streamline your workflow instantly.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Categories Section */}
            <section id="categories" className="py-16 bg-secondary/50 -mx-4 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Explore AI Tool Categories</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse our comprehensive collection of AI tools across various categories
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Content Creation', 'Design & Graphics', 'Coding & Development', 'Marketing & SEO', 
                    'Audio & Music', 'Video Editing', 'Data Analysis', 'Productivity'].map((category) => (
                    <div key={category} className="glass-panel p-4 rounded-xl hover:shadow-medium transition-all duration-300 text-center">
                      <h3 className="font-medium">{category}</h3>
                      <div className="mt-2 text-xs text-primary">
                        <button className="inline-flex items-center">
                          Explore <ChevronsRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Popular Tools */}
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Popular AI Tools</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover the most popular AI tools used by professionals worldwide
                </p>
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
              
              <div className="text-center mt-10">
                <Button className="rounded-full px-6 btn-green">
                  View All AI Tools
                </Button>
              </div>
            </section>
            
            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 bg-secondary/50 -mx-4 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    See how AI Tools Finder has helped professionals enhance their workflows
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "UX Designer",
                      text: "AI Tools Finder helped me discover design tools I never knew existed. My workflow is 2x faster now!"
                    },
                    {
                      name: "Michael Chen",
                      role: "Content Creator",
                      text: "I was spending hours researching AI tools. This platform saved me so much time by recommending exactly what I needed."
                    },
                    {
                      name: "Jessica Williams",
                      role: "Marketing Manager",
                      text: "The AI-powered recommendations are spot on. Found the perfect tools for my marketing campaigns in minutes."
                    }
                  ].map((testimonial, i) => (
                    <div key={i} className="glass-panel p-6 rounded-xl">
                      <div className="flex items-center text-primary mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" />
                        ))}
                      </div>
                      <p className="mb-4 text-foreground italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium mr-3">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* About Section */}
            <section id="about" className="py-16">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">About AI Tools Finder</h2>
                  <p className="text-muted-foreground">
                    We're on a mission to help professionals navigate the rapidly evolving AI tools landscape
                  </p>
                </div>
                
                <div className="glass-panel p-8 rounded-xl">
                  <p className="mb-4">
                    AI Tools Finder was created to solve a common problem: with thousands of AI tools being released every month, 
                    how do you find the ones that are perfect for your specific needs?
                  </p>
                  <p className="mb-4">
                    Our platform uses advanced AI to understand your workflow requirements and match you with the tools 
                    that will truly enhance your productivity and creativity.
                  </p>
                  <p>
                    We continuously update our database with new tools, features, and reviews to ensure 
                    you always have access to the latest and greatest AI solutions.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button className="rounded-full w-full sm:w-auto px-6 btn-green">
                      Learn More
                    </Button>
                    <Button variant="outline" className="rounded-full w-full sm:w-auto px-6 btn-outline-green">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Newsletter */}
            <section className="py-16 bg-primary/10 rounded-xl">
              <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with AI Trends</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter to receive the latest AI tools and trends directly in your inbox
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="h-12 rounded-full bg-white"
                  />
                  <Button className="h-12 rounded-full whitespace-nowrap btn-green">
                    Subscribe
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </section>
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
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
