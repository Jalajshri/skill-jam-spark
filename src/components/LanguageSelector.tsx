import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
  learners: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string | null;
  onSelect: (code: string) => void;
}

const LanguageSelector = ({ languages, selectedLanguage, onSelect }: LanguageSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={cn(
            "p-4 rounded-xl text-left transition-all duration-300 border",
            selectedLanguage === lang.code
              ? "border-primary bg-primary/10 glow-primary"
              : "border-border gradient-card hover:border-primary/50 hover:scale-[1.02]"
          )}
        >
          <span className="text-3xl mb-2 block">{lang.flag}</span>
          <h4 className="font-semibold">{lang.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{lang.learners} learners</p>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
