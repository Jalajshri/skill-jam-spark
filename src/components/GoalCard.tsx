import { cn } from "@/lib/utils";
import { Target } from "lucide-react";

interface GoalCardProps {
  title: string;
  description: string;
  minutesPerDay: number;
  selected: boolean;
  onSelect: () => void;
}

const GoalCard = ({ title, description, minutesPerDay, selected, onSelect }: GoalCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-5 rounded-xl text-left transition-all duration-300 border",
        selected
          ? "border-primary bg-primary/10 glow-primary"
          : "border-border gradient-card hover:border-primary/50 hover:scale-[1.02]"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          selected ? "gradient-primary" : "bg-secondary"
        )}>
          <Target className={cn(
            "w-6 h-6",
            selected ? "text-primary-foreground" : "text-primary"
          )} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
              {minutesPerDay} min/day
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default GoalCard;
