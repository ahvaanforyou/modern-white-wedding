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
      <div className="relative aspect-[4/5] min-h-[460px] w-full overflow-hidden rounded-md bg-muted shadow-[var(--shadow-soft)] sm:aspect-[16/10] sm:min-h-[420px] md:aspect-[16/9] md:min-h-0">
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

        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 text-primary-foreground sm:p-10">
          <span className="font-sans text-xs sm:text-sm tracking-[0.4em] text-gold-soft uppercase font-semibold">
            {active.time}
          </span>
          <h3 key={active.title} className="animate-fade-in font-display text-3xl sm:text-5xl leading-tight">
            {active.title}
          </h3>
          <p className="max-w-md font-sans text-sm sm:text-base text-primary-foreground/85 leading-relaxed">
            {active.note}
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous moment"
          onClick={() => go(index - 1)}
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/15 p-2 text-primary-foreground backdrop-blur-sm transition hover:bg-background/30 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next moment"
          onClick={() => go(index + 1)}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/15 p-2 text-primary-foreground backdrop-blur-sm transition hover:bg-background/30 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {events.map((event, i) => (
          <button
            key={event.title}
            type="button"
            aria-label={`Show ${event.title}`}
            onClick={() => go(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
              i === index ? "w-10 bg-gold" : "w-4 bg-border hover:bg-gold-soft",
            )}
          />
        ))}
      </div>
    </div>
  );
}
