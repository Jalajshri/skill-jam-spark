import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneCardProps {
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MilestoneCard = ({ 
  title, 
  description, 
  xp, 
  completed, 
  locked = false, 
  icon,
  onClick 
}: MilestoneCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={cn(
        "w-full p-5 rounded-xl text-left transition-all duration-300 group",
        "border border-border hover:border-primary/50",
        completed && "bg-primary/10 border-primary/30",
        locked && "opacity-50 cursor-not-allowed",
        !locked && !completed && "gradient-card hover:scale-[1.02] hover:glow-primary"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          completed ? "bg-primary" : "bg-secondary",
          locked && "bg-muted"
        )}>
          {locked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : completed ? (
            <Check className="w-5 h-5 text-primary-foreground" />
          ) : (
            <span className="text-primary">{icon}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={cn(
              "font-semibold truncate",
              completed && "text-primary"
            )}>
              {title}
            </h3>
            <span className={cn(
              "text-sm font-bold px-2 py-1 rounded-full shrink-0",
              completed ? "bg-primary/20 text-primary" : "bg-xp/20 text-xp"
            )}>
              +{xp} XP
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default MilestoneCard;
