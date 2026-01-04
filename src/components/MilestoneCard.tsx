import { Check, Lock, Play } from "lucide-react";
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
        "w-full p-4 rounded-md text-left transition-all duration-200 group relative",
        "bg-secondary/30 hover:bg-secondary/60",
        completed && "bg-primary/10",
        locked && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail with play button overlay */}
        <div className={cn(
          "w-12 h-12 rounded flex items-center justify-center shrink-0 relative",
          completed ? "bg-primary" : "bg-card",
          locked && "bg-muted"
        )}>
          {locked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : completed ? (
            <Check className="w-5 h-5 text-primary-foreground" />
          ) : (
            <>
              <span className="text-primary group-hover:opacity-0 transition-opacity">{icon}</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 text-primary-foreground fill-current ml-0.5" />
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium truncate text-sm",
            completed && "text-primary"
          )}>
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {description}
          </p>
        </div>

        <span className={cn(
          "text-xs font-semibold px-2 py-1 rounded-full shrink-0",
          completed ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
        )}>
          +{xp} XP
        </span>
      </div>
    </button>
  );
};

export default MilestoneCard;
