import { cn } from "@/lib/utils";

interface DayProgress {
  day: string;
  completed: boolean;
  isToday?: boolean;
}

interface WeeklyProgressProps {
  days: DayProgress[];
}

const WeeklyProgress = ({ days }: WeeklyProgressProps) => {
  return (
    <div className="p-6 rounded-2xl gradient-card border border-border">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
      <div className="flex justify-between gap-2">
        {days.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-2"
          >
            <div className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300",
              day.completed && "gradient-primary glow-primary",
              !day.completed && day.isToday && "border-2 border-primary border-dashed",
              !day.completed && !day.isToday && "bg-muted"
            )}>
              {day.completed && (
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={cn(
              "text-xs font-medium",
              day.isToday ? "text-primary" : "text-muted-foreground"
            )}>
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgress;
