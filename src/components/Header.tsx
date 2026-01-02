import { Bell, Settings, Zap } from "lucide-react";
import StreakCounter from "./StreakCounter";
import XPBar from "./XPBar";

interface HeaderProps {
  streak: number;
  currentXP: number;
  requiredXP: number;
  level: number;
  userName: string;
}

const Header = ({ streak, currentXP, requiredXP, level, userName }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              Lingua<span className="text-gradient">Flow</span>
            </span>
          </div>

          {/* XP Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <XPBar currentXP={currentXP} requiredXP={requiredXP} level={level} />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <StreakCounter streak={streak} isActive={streak > 0} />
            
            <button className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Mobile XP Bar */}
        <div className="md:hidden mt-4">
          <XPBar currentXP={currentXP} requiredXP={requiredXP} level={level} />
        </div>
      </div>
    </header>
  );
};

export default Header;
