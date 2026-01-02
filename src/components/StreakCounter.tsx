import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  isActive?: boolean;
}

const StreakCounter = ({ streak, isActive = true }: StreakCounterProps) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
      isActive ? 'bg-warning/20 glow-primary' : 'bg-muted'
    } transition-all duration-300`}>
      <Flame 
        className={`w-6 h-6 ${isActive ? 'text-warning animate-pulse' : 'text-muted-foreground'}`} 
        fill={isActive ? 'hsl(var(--warning))' : 'none'}
      />
      <span className={`text-xl font-bold ${isActive ? 'text-warning' : 'text-muted-foreground'}`}>
        {streak}
      </span>
      <span className="text-sm text-muted-foreground">day streak</span>
    </div>
  );
};

export default StreakCounter;
