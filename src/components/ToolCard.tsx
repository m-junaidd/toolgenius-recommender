
import { cn } from "@/lib/utils";
import { Tool } from "@/lib/dummyData";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Tool;
  index: number;
  className?: string;
}

const ToolCard = ({ tool, index, className }: ToolCardProps) => {
  const staggerClass = `stagger-${Math.min(5, index + 1)}`;

  return (
    <div 
      className={cn(
        "glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-medium group animate-in",
        staggerClass,
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {tool.imageUrl ? (
            <div className="w-12 h-12 mr-4 rounded-lg overflow-hidden bg-white/50 flex items-center justify-center">
              <img 
                src={tool.imageUrl} 
                alt={tool.name}
                className="w-10 h-10 object-contain" 
              />
            </div>
          ) : (
            <div className="w-12 h-12 mr-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-medium text-lg">
              {tool.name.substring(0, 2)}
            </div>
          )}
          <div>
            <h3 className="font-medium text-xl">{tool.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {tool.category}
            </Badge>
          </div>
        </div>
        <Badge variant={
          tool.pricing === 'Free' ? 'outline' : 
          tool.pricing === 'Freemium' ? 'secondary' : 
          'default'
        } className={
          tool.pricing === 'Free' ? 'border-primary text-primary' :
          tool.pricing === 'Freemium' ? 'bg-primary/10 text-primary' :
          'bg-primary text-white'
        }>
          {tool.pricing}
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        {tool.description}
      </p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">Key Features</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tool.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">Best For</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tool.useCases.slice(0, 2).map((useCase, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <a 
        href={tool.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center w-full bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-lg transition-all duration-200 group-hover:bg-primary group-hover:text-white"
      >
        Visit Website
        <ArrowUpRight size={16} className="ml-2" />
      </a>
    </div>
  );
};

export default ToolCard;
