import { useState } from "react";
import { BookOpen, Headphones, MessageSquare, Pencil, Trophy, Target, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import ProgressRing from "@/components/ProgressRing";
import MilestoneCard from "@/components/MilestoneCard";
import WeeklyProgress from "@/components/WeeklyProgress";

const Dashboard = () => {
  const [dailyMilestones, setDailyMilestones] = useState([
    { id: 1, title: "Vocabulary Sprint", description: "Learn 10 new words in your chosen language", xp: 50, completed: true, icon: <BookOpen className="w-5 h-5" /> },
    { id: 2, title: "Listening Practice", description: "Complete a 5-minute listening exercise", xp: 40, completed: true, icon: <Headphones className="w-5 h-5" /> },
    { id: 3, title: "Speaking Challenge", description: "Record yourself speaking 3 sentences", xp: 60, completed: false, icon: <MessageSquare className="w-5 h-5" /> },
    { id: 4, title: "Writing Exercise", description: "Write a short paragraph about your day", xp: 45, completed: false, icon: <Pencil className="w-5 h-5" /> },
    { id: 5, title: "Grammar Quiz", description: "Score 80% or higher on today's quiz", xp: 55, completed: false, locked: true, icon: <Target className="w-5 h-5" /> },
  ]);

  const weeklyProgress = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: false, isToday: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const completedCount = dailyMilestones.filter(m => m.completed).length;
  const totalCount = dailyMilestones.filter(m => !m.locked).length;
  const progressPercent = (completedCount / totalCount) * 100;

  const handleMilestoneClick = (id: number) => {
    setDailyMilestones(prev => 
      prev.map(m => m.id === id && !m.locked ? { ...m, completed: true } : m)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        streak={12} 
        currentXP={1250} 
        requiredXP={2000} 
        level={8}
        userName="Alex"
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Good morning, <span className="text-gradient">Alex</span>! 👋
          </h1>
          <p className="text-muted-foreground">Continue your Spanish journey today</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Progress Card */}
            <div className="p-6 rounded-2xl gradient-card border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ProgressRing progress={progressPercent} size={140}>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gradient">{completedCount}</span>
                    <span className="text-muted-foreground">/{totalCount}</span>
                    <p className="text-xs text-muted-foreground mt-1">Tasks</p>
                  </div>
                </ProgressRing>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold mb-2">Today's Progress</h2>
                  <p className="text-muted-foreground mb-4">
                    {completedCount === totalCount 
                      ? "Amazing! You've completed all tasks! 🎉" 
                      : `${totalCount - completedCount} more tasks to complete your daily goal`
                    }
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-xp/20 text-xp">
                    <Trophy className="w-4 h-4" />
                    <span className="font-semibold">+{dailyMilestones.filter(m => m.completed).reduce((acc, m) => acc + m.xp, 0)} XP earned today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Milestones */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Daily Milestones</h2>
                <span className="text-sm text-muted-foreground">{completedCount}/{totalCount} completed</span>
              </div>
              <div className="space-y-3">
                {dailyMilestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.id}
                    title={milestone.title}
                    description={milestone.description}
                    xp={milestone.xp}
                    completed={milestone.completed}
                    locked={milestone.locked}
                    icon={milestone.icon}
                    onClick={() => handleMilestoneClick(milestone.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <WeeklyProgress days={weeklyProgress} />
            </div>

            {/* Current Language */}
            <div className="p-6 rounded-2xl gradient-card border border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-lg font-semibold mb-4">Current Course</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                <span className="text-4xl">🇪🇸</span>
                <div className="flex-1">
                  <h4 className="font-semibold">Spanish</h4>
                  <p className="text-sm text-muted-foreground">Intermediate Level</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="p-6 rounded-2xl gradient-card border border-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-lg font-semibold mb-4">Weekly Goal</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">XP Goal</span>
                    <span className="font-medium">750 / 1000 XP</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/4 rounded-full gradient-primary" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Practice Days</span>
                    <span className="font-medium">3 / 5 days</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/5 rounded-full gradient-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="p-4 rounded-xl gradient-card border border-border text-center">
                <span className="text-2xl font-bold text-gradient">847</span>
                <p className="text-xs text-muted-foreground mt-1">Words Learned</p>
              </div>
              <div className="p-4 rounded-xl gradient-card border border-border text-center">
                <span className="text-2xl font-bold text-gradient">32h</span>
                <p className="text-xs text-muted-foreground mt-1">Time Spent</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
