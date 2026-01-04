import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Maximize2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const NowPlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-card border-t border-border z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Now Playing Info */}
        <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
          <div className="w-14 h-14 rounded-md gradient-card border border-border flex items-center justify-center shrink-0 group relative overflow-hidden">
            <span className="text-2xl">🇪🇸</span>
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate hover:underline cursor-pointer">
              Spanish Basics - Lesson 4
            </p>
            <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">
              Vocabulary Sprint
            </p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "shrink-0 hover:scale-110 transition-transform",
              isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </button>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-1 max-w-[722px] w-[40%]">
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-background fill-current" />
              ) : (
                <Play className="w-5 h-5 text-background fill-current ml-0.5" />
              )}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-[11px] text-muted-foreground w-10 text-right">1:24</span>
            <Slider
              value={[progress]}
              onValueChange={(v) => setProgress(v[0])}
              max={100}
              step={1}
              className="flex-1 cursor-pointer"
            />
            <span className="text-[11px] text-muted-foreground w-10">4:02</span>
          </div>
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center justify-end gap-3 min-w-[180px] w-[30%]">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>
          <Slider
            value={[volume]}
            onValueChange={(v) => setVolume(v[0])}
            max={100}
            step={1}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
