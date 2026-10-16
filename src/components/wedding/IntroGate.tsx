import { useEffect, useState } from "react";
import { audioManager } from "@/lib/audioManager";

export function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState<"idle" | "seal-break" | "flap-open" | "card-rise" | "fade-out">("idle");

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  async function handleOpen() {
    if (opening) return;
    setOpening(true);

    // Guaranteed synchronous audio start within user gesture
    audioManager.play();

    // Sequence stages
    setStep("seal-break");

    setTimeout(() => {
      setStep("flap-open");
    }, 400);

    setTimeout(() => {
      setStep("card-rise");
    }, 900);

    setTimeout(() => {
      setStep("fade-out");
    }, 1700);

    setTimeout(() => {
      setDone(true);
    }, 2300);
  }

  const isFlapOpen = step === "flap-open" || step === "card-rise" || step === "fade-out";
  const isCardUp = step === "card-rise" || step === "fade-out";
  const isFadeOut = step === "fade-out";

  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
      aria-label="Open wedding invitation"
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#f6f3ee] px-4 transition-all duration-700 select-none ${
        isFadeOut ? "pointer-events-none scale-105 opacity-0 blur-sm" : "opacity-100"
      }`}
    >
      {/* Background ambient texture / subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(238,233,224,0.95)_100%)]" />

      {/* Header prompt */}
      <div
        className={`relative z-20 mb-8 sm:mb-12 text-center transition-all duration-500 ${
          opening ? "opacity-0 -translate-y-4" : "opacity-100"
        }`}
      >
        <p className="font-sans text-[0.65rem] tracking-[0.55em] text-ink/70 uppercase sm:text-xs">
          You are invited
        </p>
      </div>

      {/* 3D Envelope Container */}
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-[1.45/1] [perspective:1400px]">
        {/* Envelope Body / Base */}
        <div className="relative h-full w-full rounded-md bg-[#e8e2d5] shadow-[0_25px_60px_-15px_rgba(90,75,60,0.35)] overflow-visible">
          
          {/* Inner Envelope Lining with subtle gold shimmer */}
          <div className="absolute inset-0 rounded-md bg-[#ded5c5] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] shadow-inner" />

          {/* Invitation Card Inside that rises up */}
          <div
            className={`absolute inset-x-4 top-2 h-[90%] rounded-sm border border-gold/30 bg-[#faf8f4] p-6 shadow-md transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isCardUp
                ? "-translate-y-[55%] z-15 shadow-[0_30px_50px_-10px_rgba(80,60,40,0.4)]"
                : "translate-y-0 z-5"
            }`}
          >
            <div className="flex h-full flex-col items-center justify-center border border-gold/25 p-4 text-center">
              <span className="font-sans text-[0.55rem] tracking-[0.4em] text-gold uppercase sm:text-[0.65rem]">
                The Wedding Celebration of
              </span>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-4xl">
                Aisha <span className="italic text-gold">&amp;</span> Rayan
              </h2>
              <div className="my-2 h-px w-16 bg-gold/40" />
              <p className="font-sans text-[0.6rem] tracking-[0.3em] text-ink/80 uppercase sm:text-xs">
                12 · 12 · 2026 — Lisbon
              </p>
            </div>
          </div>

          {/* Envelope Pocket Flaps (Left, Right, Bottom) */}
          {/* Left Flap */}
          <div className="absolute inset-0 z-10 [clip-path:polygon(0_0,50%_50%,0_100%)] bg-[#eae4d8] shadow-sm" />
          {/* Right Flap */}
          <div className="absolute inset-0 z-10 [clip-path:polygon(100%_0,50%_50%,100%_100%)] bg-[#eae4d8] shadow-sm" />
          {/* Bottom Flap */}
          <div className="absolute inset-0 z-20 [clip-path:polygon(0_100%,50%_48%,100%_100%)] bg-[#ede7dc] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]" />

          {/* Top Flap - Folds open backwards in 3D */}
          <div
            className="absolute inset-x-0 top-0 h-full origin-top transition-transform duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlapOpen ? "rotateX(180deg)" : "rotateX(0deg)",
              zIndex: isFlapOpen ? 4 : 30,
            }}
          >
            {/* Front of Top Flap (when closed) */}
            <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_55%)] bg-[#f0ebd9] shadow-md [backface-visibility:hidden]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            </div>

            {/* Back of Top Flap (visible when flipped open) */}
            <div
              className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_55%)] bg-[#e2d9c8] shadow-sm"
              style={{
                transform: "rotateY(180deg) rotateZ(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </div>

          {/* Wax Seal affixed to flap tip */}
          <div
            className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${
              step === "seal-break"
                ? "scale-125 rotate-12 opacity-80"
                : isFlapOpen
                  ? "scale-0 opacity-0 -translate-y-8"
                  : "scale-100 opacity-100"
            }`}
          >
            <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#99732f] shadow-[0_12px_28px_rgba(150,110,40,0.45)] ring-4 ring-[#e5c77e]/60 transition-transform duration-300 hover:scale-105">
              {/* Seal border ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-100/40" />
              {/* Monogram */}
              <span className="font-display text-2xl sm:text-3xl font-semibold italic text-[#fbf8f2] drop-shadow-sm select-none">
                A&amp;R
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom prompt */}
      <div
        className={`relative z-20 mt-8 sm:mt-12 text-center transition-all duration-500 ${
          opening ? "opacity-0 translate-y-4" : "opacity-100"
        }`}
      >
        <p className="font-display text-xl sm:text-2xl italic text-ink/80 animate-pulse">
          Tap to open
        </p>
      </div>
    </div>
  );
}
