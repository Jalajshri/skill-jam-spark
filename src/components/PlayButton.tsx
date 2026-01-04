import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const PlayButton = ({ size = "md", className, onClick }: PlayButtonProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={cn(
        "rounded-full bg-primary flex items-center justify-center shadow-lg",
        "hover:scale-105 hover:bg-primary/90 transition-all duration-200",
        "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
        sizeClasses[size],
        className
      )}
    >
      <Play className={cn("text-primary-foreground fill-current ml-0.5", iconSizes[size])} />
    </button>
  );
};

export default PlayButton;
