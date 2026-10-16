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

    // Guaranteed synchronous audio start
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
      {/* Top Half Flap (Pure White with subtle soft shadow) */}
      <span
        className={`absolute inset-x-0 top-0 h-1/2 z-10 ${ease} ${
          opening ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <span className="absolute inset-0 bg-[#ffffff] [clip-path:polygon(0_0,100%_0,100%_46%,50%_100%,0_46%)] shadow-[0_10px_25px_rgba(0,0,0,0.04)]" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white to-[#fcfbfa]/80" />
      </span>

      {/* Bottom Half Flap (Off-White Cream) */}
      <span
        className={`absolute inset-x-0 bottom-0 h-1/2 z-10 ${ease} ${
          opening ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <span className="absolute inset-0 bg-[#fbf9f4] [clip-path:polygon(0_54%,50%_0,100%_54%,100%_100%,0_100%)] shadow-[0_-8px_25px_rgba(0,0,0,0.03)]" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f6f2e9] to-[#fbf9f4]" />
      </span>

      {/* Base Background (Clean Off-White) */}
      <span
        className={`absolute inset-0 -z-10 bg-[#faf9f7] ${ease} ${
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
        <p className="font-sans text-[0.65rem] sm:text-xs tracking-[0.55em] text-ink/75 uppercase font-medium">
          You are invited
        </p>

        {/* Central Circle Seal */}
        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a767] via-[#ba9452] to-[#967439] font-display text-3xl sm:text-4xl italic text-[#ffffff] shadow-[0_16px_36px_-6px_rgba(140,105,45,0.38)] ring-4 ring-[#eedbb4]/70 transition-transform duration-300 hover:scale-105 active:scale-95 animate-pulse">
          <span className="drop-shadow-sm">A&amp;R</span>
          <div className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-white/45" />
        </div>

        {/* Bottom Text */}
        <p className="font-display text-2xl sm:text-3xl italic text-ink/85">
          Tap to open
        </p>
      </div>
    </button>
  );
}
