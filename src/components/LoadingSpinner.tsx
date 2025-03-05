
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16", className)}>
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse-subtle">Finding the perfect tools for you...</p>
    </div>
  );
};

export default LoadingSpinner;
