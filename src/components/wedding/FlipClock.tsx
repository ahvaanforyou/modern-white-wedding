import { useEffect, useRef, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function remainingFrom(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

const digitClass =
  "absolute inset-x-0 flex h-[200%] items-center justify-center font-sans font-semibold leading-none tabular-nums text-[length:var(--flip-font)]";

function FlipCard({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value === current) return;
    setPrevious(current);
    setCurrent(value);
    setFlipping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlipping(false), 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, current]);

  return (
    <div
      className="relative h-[var(--flip-h)] w-[var(--flip-w)] shrink-0 overflow-hidden rounded-[0.35em] bg-flip text-flip-foreground shadow-[0_10px_30px_-14px_oklch(0.2_0.01_60/0.65)] select-none [perspective:700px]"
    >
      {/* static top */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-flip">
        <span className={`${digitClass} top-0`}>{current}</span>
      </div>
      {/* static bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-flip">
        <span className={`${digitClass} bottom-0`}>
          {flipping ? previous : current}
        </span>
      </div>

      {flipping && (
        <>
          <div
            key={`top-${previous}-${current}`}
            className="absolute inset-x-0 top-0 z-20 h-1/2 origin-bottom overflow-hidden bg-flip [animation:flip-top_0.3s_ease-in_forwards] [backface-visibility:hidden]"
          >
            <span className={`${digitClass} top-0`}>{previous}</span>
          </div>
          <div
            key={`bottom-${previous}-${current}`}
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 origin-top overflow-hidden bg-flip [animation:flip-bottom_0.3s_0.3s_ease-out_backwards] [backface-visibility:hidden]"
          >
            <span className={`${digitClass} bottom-0`}>{current}</span>
          </div>
        </>
      )}

      {/* seam */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 h-px -translate-y-1/2 bg-flip-foreground/35" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 h-[2px] translate-y-px bg-background/5" />
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3">
      <div className="flex gap-[0.15rem] sm:gap-2">
        {pad(value)
          .split("")
          .map((digit, index) => (
            <FlipCard key={`${label}-${index}`} value={digit} />
          ))}
      </div>
      <span className="font-sans text-[0.55rem] tracking-[0.25em] text-muted-foreground uppercase sm:text-[0.7rem] sm:tracking-[0.35em]">
        {label}
      </span>
    </div>
  );
}

export function FlipClock({ target }: { target: Date }) {
  const targetTime = target.getTime();
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(remainingFrom(targetTime));
    const id = setInterval(() => setTime(remainingFrom(targetTime)), 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  const value = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  if (time?.done) {
    return <p className="font-display text-4xl text-ink italic md:text-5xl">Today is the day.</p>;
  }

  return (
    <div
      style={
        {
          "--flip-w": "clamp(1.7rem, 8.8vw, 6.2rem)",
          "--flip-h": "clamp(2.1rem, 10.8vw, 7.2rem)",
          "--flip-font": "clamp(1.2rem, 6.5vw, 4.8rem)",
        } as React.CSSProperties
      }
      className="mx-auto flex w-full max-w-full items-start justify-center gap-2 px-1 sm:gap-6 md:gap-10"
    >
      <Unit value={value.days} label="Days" />
      <Unit value={value.hours} label="Hours" />
      <Unit value={value.minutes} label="Minutes" />
      <Unit value={value.seconds} label="Seconds" />
    </div>
  );
}
