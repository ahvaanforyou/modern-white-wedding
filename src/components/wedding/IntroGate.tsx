import { useEffect, useState } from "react";

type Variant = "envelope" | "curtain" | "seal";

const VARIANTS: Variant[] = ["envelope", "curtain", "seal"];

function Seal({ pulse }: { pulse?: boolean }) {
  return (
    <span
      className={`grid h-24 w-24 place-items-center rounded-full bg-gold font-display text-3xl italic text-background shadow-[var(--shadow-soft)] ring-4 ring-gold-soft sm:h-28 sm:w-28 ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      A&amp;R
    </span>
  );
}

export function IntroGate() {
  const [variant, setVariant] = useState<Variant>("envelope");
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("intro") as Variant | null;
    if (v && VARIANTS.includes(v)) setVariant(v);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  function open() {
    if (opening) return;
    setOpening(true);
    window.dispatchEvent(new Event("invitation-opened"));
    setTimeout(() => setDone(true), 1600);
  }

  const ease = "transition-all duration-[1400ms] ease-[cubic-bezier(0.7,0,0.2,1)]";

  const prompt = (
    <div
      className={`flex flex-col items-center gap-6 text-center ${ease} ${
        opening ? "scale-90 opacity-0" : ""
      }`}
    >
      <p className="font-sans text-[0.65rem] tracking-[0.5em] text-ink/70 uppercase">
        You are invited
      </p>
      <Seal pulse={!opening} />
      <p className="font-display text-2xl italic text-ink">Tap to open</p>
    </div>
  );

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open the invitation"
      className="fixed inset-0 z-[100] block h-full w-full cursor-pointer overflow-hidden text-left"
    >
      {variant === "envelope" && (
        <>
          <span
            className={`absolute inset-x-0 top-0 h-1/2 ${ease} ${
              opening ? "-translate-y-full" : ""
            }`}
          >
            <span className="absolute inset-0 bg-secondary [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0_60%)]" />
            <span className="absolute inset-x-0 bottom-[24%] flex justify-center px-4">
              <p className="font-sans text-[0.65rem] tracking-[0.5em] text-ink/70 uppercase text-center">
                You are invited
              </p>
            </span>
          </span>
          <span
            className={`absolute inset-x-0 bottom-0 h-1/2 ${ease} ${
              opening ? "translate-y-full" : ""
            }`}
          >
            <span className="absolute inset-0 bg-muted [clip-path:polygon(0_40%,50%_0,100%_40%,100%_100%,0_100%)]" />
            <span className="absolute inset-x-0 top-[10%] flex flex-col items-center gap-6">
              <Seal pulse={!opening} />
              <p className="font-display text-2xl italic text-ink">Tap to open</p>
            </span>
          </span>
          <span
            className={`absolute inset-0 -z-10 bg-background ${ease} ${
              opening ? "opacity-0" : ""
            }`}
          />
        </>
      )}
      {variant === "curtain" && (
        <>
          <span
            className={`absolute inset-y-0 left-0 w-1/2 border-r border-gold/40 bg-secondary ${ease} ${
              opening ? "-translate-x-full" : ""
            }`}
          />
          <span
            className={`absolute inset-y-0 right-0 w-1/2 border-l border-gold/40 bg-secondary ${ease} ${
              opening ? "translate-x-full" : ""
            }`}
          />
        </>
      )}
      {variant === "seal" && (
        <span
          className={`absolute inset-0 bg-background ${ease}`}
          style={{ clipPath: opening ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)" }}
        />
      )}
      {variant !== "envelope" && (
        <span className="absolute inset-0 grid place-items-center">{prompt}</span>
      )}
    </button>
  );
}
