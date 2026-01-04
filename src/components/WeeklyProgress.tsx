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
    <div className="p-4 rounded-lg bg-card border border-border">
      <h3 className="text-sm font-semibold mb-3">Weekly Progress</h3>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              day.completed && "bg-primary",
              !day.completed && day.isToday && "border-2 border-primary border-dashed",
              !day.completed && !day.isToday && "bg-muted"
            )}>
              {day.completed && (
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-medium",
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
