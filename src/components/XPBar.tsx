interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
}

const XPBar = ({ currentXP, requiredXP, level }: XPBarProps) => {
  const progress = (currentXP / requiredXP) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            {level}
          </div>
          <span className="text-sm text-muted-foreground">Level {level}</span>
        </div>
        <span className="text-sm font-medium text-xp">
          {currentXP} / {requiredXP} XP
        </span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full rounded-full gradient-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default XPBar;
