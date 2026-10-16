// Audio manager ensuring synchronous user-gesture playback and state management

type AudioListener = (isPlaying: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<AudioListener> = new Set();
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    this.initialized = true;
    try {
      this.audio = new Audio("/romantic-waltz.mp3");
      this.audio.loop = true;
      this.audio.volume = 0.35;
      this.audio.preload = "auto";

      this.audio.addEventListener("play", () => this.setPlaying(true));
      this.audio.addEventListener("pause", () => this.setPlaying(false));
      this.audio.addEventListener("ended", () => this.setPlaying(false));
    } catch (e) {
      console.warn("Audio init deferred:", e);
    }
  }

  private setPlaying(playing: boolean) {
    this.isPlaying = playing;
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.setPlaying(true);
      return true;
    } catch (err) {
      console.warn("Audio playback interrupted or blocked:", err);
      this.setPlaying(false);
      return false;
    }
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.setPlaying(false);
    }
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve(false);
    }
    return this.play();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }
}

export const audioManager = new AudioManager();
