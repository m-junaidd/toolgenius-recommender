
import { cn } from "@/lib/utils";
import { Tool } from "@/lib/dummyData";
import ToolCard from "./ToolCard";

interface ToolListProps {
  tools: Tool[];
  className?: string;
}

const ToolList = ({ tools, className }: ToolListProps) => {
  if (tools.length === 0) {
    return (
      <div className={cn("my-16 text-center", className)}>
        <h3 className="text-2xl font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or being more specific about your needs.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Recommended Tools</h2>
        <span className="text-muted-foreground">
          {tools.length} result{tools.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolList;
