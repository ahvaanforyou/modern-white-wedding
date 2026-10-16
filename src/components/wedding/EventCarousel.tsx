import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import welcome from "@/assets/event-welcome.jpg";
import ceremony from "@/assets/event-ceremony.jpg";
import cocktail from "@/assets/event-cocktail.jpg";
import dinner from "@/assets/event-dinner.jpg";
import dance from "@/assets/event-dance.jpg";

const events = [
  { time: "15:30", title: "Welcome & Seating", note: "Find your name, greet the families.", image: welcome },
  { time: "16:00", title: "The Ceremony", note: "Vows beneath the garden arch.", image: ceremony },
  { time: "17:00", title: "Cocktail Hour", note: "Toasts, canapés and golden light.", image: cocktail },
  { time: "18:30", title: "Dinner Is Served", note: "A long table under the candles.", image: dinner },
  { time: "20:30", title: "First Dance", note: "The floor opens for everyone after.", image: dance },
];

export function EventCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + events.length) % events.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % events.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  const active = events[index]!;

  return (
    <div
      className="mx-auto w-full max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-muted shadow-[var(--shadow-soft)] sm:aspect-[16/9]">
        {events.map((event, i) => (
          <img
            key={event.title}
            src={event.image}
            alt={event.title}
            loading="lazy"
            width={1408}
            height={912}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 text-primary-foreground sm:gap-2 sm:p-10">
          <span className="font-sans text-[0.7rem] tracking-[0.4em] text-gold-soft uppercase sm:text-xs">
            {active.time}
          </span>
          <h3 key={active.title} className="animate-fade-in font-display text-2xl sm:text-4xl md:text-5xl">
            {active.title}
          </h3>
          <p className="max-w-md font-sans text-xs text-primary-foreground/80 sm:text-sm">
            {active.note}
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous moment"
          onClick={() => go(index - 1)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition hover:bg-background/40 active:scale-95 sm:left-3"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          aria-label="Next moment"
          onClick={() => go(index + 1)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition hover:bg-background/40 active:scale-95 sm:right-3"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5 sm:mt-6 sm:gap-3">
        {events.map((event, i) => (
          <button
            key={event.title}
            type="button"
            aria-label={`Show ${event.title}`}
            onClick={() => go(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
              i === index ? "w-8 bg-gold sm:w-10" : "w-3 bg-border hover:bg-gold-soft sm:w-4",
            )}
          />
        ))}
      </div>
    </div>
  );
}
