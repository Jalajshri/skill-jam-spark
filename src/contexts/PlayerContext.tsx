import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from "react";

export interface Track {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  duration: number; // in seconds
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isLiked: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  play: (track: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (percent: number) => void;
  setVolume: (volume: number) => void;
  toggleLike: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  skipNext: () => void;
  skipPrev: () => void;
  formatTime: (seconds: number) => string;
  currentTime: number;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Sample tracks/lessons
export const sampleTracks: Track[] = [
  { id: "1", title: "Spanish Basics - Lesson 1", subtitle: "Greetings & Introductions", emoji: "🇪🇸", duration: 180 },
  { id: "2", title: "Spanish Basics - Lesson 2", subtitle: "Numbers 1-20", emoji: "🇪🇸", duration: 240 },
  { id: "3", title: "Spanish Basics - Lesson 3", subtitle: "Common Phrases", emoji: "🇪🇸", duration: 200 },
  { id: "4", title: "Spanish Basics - Lesson 4", subtitle: "Vocabulary Sprint", emoji: "🇪🇸", duration: 242 },
  { id: "5", title: "French Verbs - Lesson 1", subtitle: "Present Tense", emoji: "🇫🇷", duration: 300 },
  { id: "6", title: "Travel Phrases", subtitle: "At the Airport", emoji: "✈️", duration: 180 },
  { id: "7", title: "Business German", subtitle: "Meeting Introductions", emoji: "🇩🇪", duration: 260 },
];

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(sampleTracks[3]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolumeState] = useState(70);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(84); // 1:24 in seconds
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= currentTrack.duration) {
            if (isRepeat) {
              return 0;
            }
            setIsPlaying(false);
            return currentTrack.duration;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentTrack, isRepeat]);

  // Update progress when currentTime changes
  useEffect(() => {
    if (currentTrack) {
      setProgress((currentTime / currentTrack.duration) * 100);
    }
  }, [currentTime, currentTrack]);

  const play = useCallback((track: Track) => {
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      setCurrentTime(0);
      setProgress(0);
    }
    setIsPlaying(true);
  }, [currentTrack]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const seek = useCallback((percent: number) => {
    if (currentTrack) {
      const newTime = (percent / 100) * currentTrack.duration;
      setCurrentTime(newTime);
      setProgress(percent);
    }
  }, [currentTrack]);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
  }, []);

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const skipNext = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = sampleTracks.findIndex((t) => t.id === currentTrack.id);
    let nextIndex: number;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * sampleTracks.length);
    } else {
      nextIndex = (currentIndex + 1) % sampleTracks.length;
    }
    
    setCurrentTrack(sampleTracks[nextIndex]);
    setCurrentTime(0);
    setProgress(0);
  }, [currentTrack, isShuffle]);

  const skipPrev = useCallback(() => {
    if (!currentTrack) return;
    
    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      setCurrentTime(0);
      setProgress(0);
      return;
    }
    
    const currentIndex = sampleTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? sampleTracks.length - 1 : currentIndex - 1;
    
    setCurrentTrack(sampleTracks[prevIndex]);
    setCurrentTime(0);
    setProgress(0);
  }, [currentTrack, currentTime]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        volume,
        isLiked,
        isShuffle,
        isRepeat,
        play,
        pause,
        togglePlay,
        seek,
        setVolume,
        toggleLike,
        toggleShuffle,
        toggleRepeat,
        skipNext,
        skipPrev,
        formatTime,
        currentTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
