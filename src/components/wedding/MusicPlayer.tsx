import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    const onOpen = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };
    window.addEventListener("invitation-opened", onOpen);
    return () => window.removeEventListener("invitation-opened", onOpen);
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src="/romantic-waltz.mp3" loop preload="metadata" />
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause music" : "Play music"}
        className="fixed right-4 bottom-4 z-50 h-12 w-12 rounded-full border-background/60 bg-background/85 text-ink shadow-[var(--shadow-soft)] backdrop-blur-md hover:bg-background sm:right-6 sm:bottom-6"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
      </Button>
    </>
  );
}
