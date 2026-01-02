import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import GoalCard from "@/components/GoalCard";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸", learners: "34.5M" },
  { code: "fr", name: "French", flag: "🇫🇷", learners: "28.2M" },
  { code: "de", name: "German", flag: "🇩🇪", learners: "17.8M" },
  { code: "it", name: "Italian", flag: "🇮🇹", learners: "12.4M" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", learners: "15.9M" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", learners: "21.3M" },
];

const goals = [
  { 
    id: "casual", 
    title: "Casual Learner", 
    description: "Perfect for those who want to learn at a relaxed pace",
    minutesPerDay: 5 
  },
  { 
    id: "regular", 
    title: "Regular Practice", 
    description: "Build a consistent habit with daily exercises",
    minutesPerDay: 10 
  },
  { 
    id: "serious", 
    title: "Serious Commitment", 
    description: "Fast-track your progress with intensive learning",
    minutesPerDay: 15 
  },
  { 
    id: "intense", 
    title: "Intensive Mode", 
    description: "Maximum immersion for rapid language acquisition",
    minutesPerDay: 20 
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 1 && selectedLanguage) {
      setStep(2);
    } else if (step === 2 && selectedGoal) {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">
            Lingua<span className="text-gradient">Flow</span>
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6">
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              What language do you want to learn?
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Choose a language to start your learning journey
            </p>
            <LanguageSelector 
              languages={languages}
              selectedLanguage={selectedLanguage}
              onSelect={setSelectedLanguage}
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Set your daily goal
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              How much time can you dedicate each day?
            </p>
            <div className="space-y-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  minutesPerDay={goal.minutesPerDay}
                  selected={selectedGoal === goal.id}
                  onSelect={() => setSelectedGoal(goal.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-border">
        <div className="container mx-auto max-w-2xl flex justify-between">
          {step === 2 ? (
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button 
            onClick={handleNext}
            disabled={(step === 1 && !selectedLanguage) || (step === 2 && !selectedGoal)}
            className="gap-2 gradient-primary hover:opacity-90 text-primary-foreground px-8"
          >
            {step === 2 ? "Start Learning" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
