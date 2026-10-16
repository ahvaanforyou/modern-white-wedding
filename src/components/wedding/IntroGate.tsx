import { useEffect, useState } from "react";
import { audioManager } from "@/lib/audioManager";

export function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  function handleOpen() {
    if (opening) return;
    setOpening(true);

    // Guaranteed synchronous audio trigger
    audioManager.play();

    setTimeout(() => {
      setDone(true);
    }, 1400);
  }

  const ease = "transition-all duration-[1300ms] ease-[cubic-bezier(0.7,0,0.2,1)]";

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label="Open the invitation"
      className="fixed inset-0 z-[100] block h-full w-full cursor-pointer overflow-hidden text-left select-none"
    >
      {/* Top Half Flap (Original darker tone with clear crease lines) */}
      <span
        className={`absolute inset-x-0 top-0 h-1/2 z-10 ${ease} ${
          opening ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ filter: "drop-shadow(0 6px 12px rgba(60, 45, 30, 0.16))" }}
      >
        <span className="absolute inset-0 bg-[#ebe4d5] [clip-path:polygon(0_0,100%_0,100%_46%,50%_100%,0_46%)]" />
        
        {/* Crisp diagonal crease lines for top flap */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line
            x1="0"
            y1="46%"
            x2="50%"
            y2="100%"
            stroke="#a3937d"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <line
            x1="100%"
            y1="46%"
            x2="50%"
            y2="100%"
            stroke="#a3937d"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <line
            x1="0"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="#c4b6a1"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4,4"
          />
          <line
            x1="100%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="#c4b6a1"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4,4"
          />
        </svg>

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-black/[0.04]" />
      </span>

      {/* Bottom Half Flap (Original darker tone with clear crease lines) */}
      <span
        className={`absolute inset-x-0 bottom-0 h-1/2 z-10 ${ease} ${
          opening ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ filter: "drop-shadow(0 -4px 10px rgba(60, 45, 30, 0.12))" }}
      >
        <span className="absolute inset-0 bg-[#e3dcce] [clip-path:polygon(0_54%,50%_0,100%_54%,100%_100%,0_100%)]" />
        
        {/* Crisp diagonal crease lines for bottom flap */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line
            x1="0"
            y1="54%"
            x2="50%"
            y2="0%"
            stroke="#9c8c76"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <line
            x1="100%"
            y1="54%"
            x2="50%"
            y2="0%"
            stroke="#9c8c76"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <line
            x1="0"
            y1="100%"
            x2="50%"
            y2="0%"
            stroke="#beaf99"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4,4"
          />
          <line
            x1="100%"
            y1="100%"
            x2="50%"
            y2="0%"
            stroke="#beaf99"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4,4"
          />
        </svg>

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.05] to-transparent" />
      </span>

      {/* Base Background */}
      <span
        className={`absolute inset-0 -z-10 bg-[#e7dfcf] ${ease} ${
          opening ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Centered Wax Seal & Typography */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-7 text-center ${ease} ${
          opening ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        {/* Top Text */}
        <p className="font-sans text-[0.65rem] sm:text-xs tracking-[0.55em] text-ink/80 uppercase font-semibold">
          You are invited
        </p>

        {/* Central Circle Seal - Bold, solid, stable, non-blinking */}
        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] via-[#b88c3a] to-[#7f5b1d] font-display text-3xl sm:text-4xl font-bold italic text-white shadow-[0_20px_45px_-6px_rgba(80,55,15,0.55)] ring-4 ring-[#e6ca85] transition-transform duration-300 hover:scale-105 active:scale-95">
          <span className="drop-shadow-md tracking-tight font-bold">A&amp;R</span>
          <div className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-white/50" />
          <div className="pointer-events-none absolute inset-0 rounded-full border border-amber-200/40" />
        </div>

        {/* Bottom Text */}
        <p className="font-display text-2xl sm:text-3xl italic text-ink/90 font-medium">
          Tap to open
        </p>
      </div>
    </button>
  );
}
