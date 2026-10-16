import { useEffect, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause background music" : "Play background music"}
        className="group flex items-center gap-2.5 rounded-full border border-gold/40 bg-background/90 px-3.5 py-2.5 shadow-[0_10px_25px_-5px_rgba(100,80,60,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-background cursor-pointer"
      >
        {/* Animated equalizer waves when playing */}
        <div className="flex h-4 items-end gap-[2.5px] px-0.5">
          <span
            className={`w-[2.5px] rounded-full bg-gold transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-[pulse_0.7s_ease-in-out_infinite]" : "h-1"
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-gold transition-all duration-300 ${
              isPlaying ? "h-4 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" : "h-1.5"
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-gold transition-all duration-300 ${
              isPlaying ? "h-2.5 animate-[pulse_0.6s_ease-in-out_infinite_0.4s]" : "h-1"
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-gold transition-all duration-300 ${
              isPlaying ? "h-3 animate-[pulse_0.8s_ease-in-out_infinite_0.1s]" : "h-1.5"
            }`}
          />
        </div>

        {/* Track Label */}
        <span className="hidden sm:inline-block font-sans text-xs tracking-wider text-ink/90 font-medium">
          {isPlaying ? "Romantic Waltz" : "Play Music"}
        </span>

        {/* Play / Mute Icon */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold group-hover:bg-gold group-hover:text-background transition-colors">
          {isPlaying ? (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </button>
    </div>
  );
}
