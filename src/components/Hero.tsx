
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <div className={cn("text-center px-6 py-16 md:py-24", className)}>
      <div className="animate-in stagger-1">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
          AI Tool Recommendations
        </span>
      </div>
      <h1 className="animate-in stagger-2 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl mb-6">
        Find the perfect <span className="text-primary">AI tools</span> <br className="hidden sm:inline" />
        for your workflow
      </h1>
      <p className="animate-in stagger-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Describe your work or task, and we'll recommend the best AI tools 
        to enhance your productivity and creativity.
      </p>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 -z-10 animate-float opacity-70">
        <div className="w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Hero;
