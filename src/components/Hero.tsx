
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  className?: string;
  onGetStarted: () => void;
}

const Hero = ({ className, onGetStarted }: HeroProps) => {
  return (
    <div className={cn("relative text-center px-6 py-16 md:py-24 overflow-hidden", className)}>
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/50 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="absolute top-10 left-10 animate-leaf opacity-10">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12" stroke="currentColor" strokeWidth="2" />
          <path d="M21 5V12H14" stroke="currentColor" strokeWidth="2" />
          <path d="M21 3L13 11" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10 animate-leaf-delayed opacity-10">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12" stroke="currentColor" strokeWidth="2" />
          <path d="M21 5V12H14" stroke="currentColor" strokeWidth="2" />
          <path d="M21 3L13 11" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="animate-in stagger-1">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
          <Sparkles size={16} className="mr-2" />
          AI Tool Recommendations
        </div>
      </div>
      
      <h1 className="animate-in stagger-2 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl mb-6">
        Find the perfect <span className="text-primary relative">AI tools 
          <div className="absolute inset-x-0 bottom-1 h-3 bg-primary/20 -z-10 skew-x-12 transform"></div>
        </span>
        <br className="hidden sm:inline" /> for your workflow
      </h1>
      
      <p className="animate-in stagger-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Describe your work or task, and we'll recommend the best AI tools 
        to enhance your productivity and creativity.
      </p>
      
      <div className="animate-in stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          onClick={onGetStarted}
          className="rounded-full px-8 py-6 text-base font-medium btn-green flex items-center"
        >
          Get Started
          <ArrowRightIcon size={18} className="ml-2" />
        </Button>
        
        <Button
          variant="outline" 
          className="rounded-full px-8 py-6 text-base font-medium btn-outline-green"
        >
          Browse Popular Tools
        </Button>
      </div>
      
      <div className="mt-12 animate-in stagger-5 flex flex-wrap justify-center items-center gap-6">
        <div className="flex items-center px-3 py-2 bg-primary/5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="ml-2 text-sm">AI-powered recommendations</span>
        </div>
        
        <div className="flex items-center px-3 py-2 bg-primary/5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="ml-2 text-sm">100+ verified tools</span>
        </div>
        
        <div className="flex items-center px-3 py-2 bg-primary/5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="ml-2 text-sm">Free & premium options</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
