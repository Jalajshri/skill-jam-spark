import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Globe, Target, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "30+ Languages",
      description: "From Spanish to Japanese, learn any language you desire"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Goals",
      description: "Set your pace and track daily & weekly milestones"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "XP & Levels",
      description: "Earn rewards and level up as you progress"
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Streak System",
      description: "Build habits with our motivating streak counter"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
              Lingua<span className="text-gradient">Flow</span>
            </span>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-12 md:pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Flame className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Join 50M+ learners worldwide</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
            Master any language with
            <span className="text-gradient block">daily milestones</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Build lasting habits with gamified lessons, track your progress with XP and streaks, 
            and achieve fluency faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="gradient-primary hover:opacity-90 text-primary-foreground gap-2 px-8 py-6 text-lg glow-primary"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="gap-2 px-8 py-6 text-lg border-border hover:bg-secondary"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">50M+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">30+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">4.9★</div>
              <div className="text-sm text-muted-foreground">App Rating</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 rounded-2xl gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <span className="text-primary-foreground">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <div className="inline-flex flex-col items-center p-8 md:p-12 rounded-3xl gradient-card border border-border max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join millions of learners and achieve fluency with our proven method.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="gradient-primary hover:opacity-90 text-primary-foreground gap-2 px-8"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 LinguaFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
