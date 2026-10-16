import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Clock, MapPin, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

import welcome from "@/assets/event-welcome.jpg";
import ceremony from "@/assets/event-ceremony.jpg";
import cocktail from "@/assets/event-cocktail.jpg";
import dinner from "@/assets/event-dinner.jpg";
import dance from "@/assets/event-dance.jpg";

interface EventItem {
  time: string;
  title: string;
  note: string;
  image: string;
  location: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  attireTip?: string;
}

const events: EventItem[] = [
  {
    time: "15:30",
    title: "Welcome & Seating",
    note: "Find your name, greet the families, and enjoy welcome refreshments under the olive trees.",
    image: welcome,
    location: "Courtyard & Olive Terrace",
    highlights: [
      "Chilled peach bellinis and botanical iced teas upon arrival",
      "Live acoustic Spanish guitar prelude melodies",
      "Seating assistance and personalized calligraphed place cards",
    ],
    schedule: [
      { time: "15:30", activity: "Guest arrivals & welcome refreshment" },
      { time: "15:45", activity: "Prelude music by string duo" },
      { time: "15:55", activity: "Guests guided to ceremony seating" },
    ],
    attireTip: "Garden-friendly footwear recommended for stone paths and lawns.",
  },
  {
    time: "16:00",
    title: "The Ceremony",
    note: "Vows beneath the floral garden arch surrounded by our closest family and friends.",
    image: ceremony,
    location: "The Rose Garden Pavilion",
    highlights: [
      "Intimate unplugged ceremony so everyone is fully present with us",
      "Personal vows and traditional blessings",
      "White petal and olive leaf confetti celebration",
    ],
    schedule: [
      { time: "16:00", activity: "Processional of bride, groom & families" },
      { time: "16:15", activity: "Exchange of rings & vows" },
      { time: "16:40", activity: "Recessional & celebratory garden toast" },
    ],
    attireTip: "Tissues for happy tears provided at every seat.",
  },
  {
    time: "17:00",
    title: "Cocktail Hour",
    note: "Toasts, artisanal canapés, and golden hour light overlooking the Lisbon hills.",
    image: cocktail,
    location: "Belvedere Sunset Terrace",
    highlights: [
      "Signature cocktails crafted with Lisbon botanicals",
      "Artisanal Portuguese cheese boards, oysters, and fig crostinis",
      "Golden hour photo portraits with friends & family",
    ],
    schedule: [
      { time: "17:00", activity: "Bar opens & butler-passed canapés" },
      { time: "17:30", activity: "Sunset family & group portraits" },
      { time: "18:15", activity: "Chimes calling guests to dinner" },
    ],
  },
  {
    time: "18:30",
    title: "Dinner Is Served",
    note: "A candlelit Mediterranean feast at long banqueting tables under the pergola.",
    image: dinner,
    location: "The Grand Pergola Ballroom",
    highlights: [
      "Four-course seasonal tasting menu with paired local wines",
      "Heartfelt toasts from parents and the bridal party",
      "Candlelit ambiance with fresh white floral runners",
    ],
    schedule: [
      { time: "18:30", activity: "Grand entrance of the newlyweds" },
      { time: "19:00", activity: "Dinner service commences" },
      { time: "20:00", activity: "Toasts, champagne & dessert" },
    ],
    attireTip: "Evenings in Lisbon cool down; cozy cashmere wraps provided.",
  },
  {
    time: "20:30",
    title: "First Dance & Party",
    note: "The dance floor opens for everyone with a live band, late-night treats, and sparklers.",
    image: dance,
    location: "Main Courtyard Under Fairy Lights",
    highlights: [
      "Newlyweds' first dance to our favorite vinyl track",
      "Live 7-piece swing and dance band followed by DJ",
      "Midnight pastel de nata & espresso bar before carriages",
    ],
    schedule: [
      { time: "20:30", activity: "First dance & cake cutting" },
      { time: "21:00", activity: "Dance floor opens for all guests" },
      { time: "23:30", activity: "Late night treats & farewell sparklers" },
    ],
  },
];

export function EventCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + events.length) % events.length);
  }, []);

  useEffect(() => {
    if (paused || selectedEvent !== null) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % events.length), 3200);
    return () => clearInterval(id);
  }, [paused, selectedEvent]);

  const active = events[index]!;

  const openPopup = (event: EventItem) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "";
  };

  return (
    <div
      className="mx-auto w-full max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tap instruction */}
      <p className="text-center font-sans text-xs tracking-[0.25em] text-muted-foreground uppercase mb-4">
        Tap the card to view full event details &amp; schedule
      </p>

      {/* Carousel Container */}
      <div
        onClick={() => openPopup(active)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPopup(active);
        }}
        aria-label={`View details for ${active.title}`}
        className="group relative aspect-[16/11] sm:aspect-[16/9] w-full overflow-hidden rounded-md bg-muted shadow-[var(--shadow-soft)] cursor-pointer transition-all duration-500 hover:shadow-2xl"
      >
        {/* Slides */}
        {events.map((event, i) => (
          <img
            key={event.title}
            src={event.image}
            alt={event.title}
            loading="lazy"
            width={1408}
            height={912}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent transition-opacity duration-300 group-hover:from-ink/95" />

        {/* Content text */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-10 text-primary-foreground">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs tracking-[0.4em] text-gold-soft uppercase font-semibold">
              {active.time}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold-soft/60" />
            <span className="font-sans text-xs tracking-wider text-primary-foreground/75 uppercase flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gold-soft" />
              {active.location}
            </span>
          </div>

          <h3 key={active.title} className="animate-fade-in font-display text-3xl sm:text-5xl">
            {active.title}
          </h3>

          <p className="max-w-lg font-sans text-xs sm:text-sm text-primary-foreground/85 leading-relaxed">
            {active.note}
          </p>

          {/* Tap badge prompt */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 font-sans text-xs tracking-wider text-gold-soft uppercase backdrop-blur-xs w-fit transition-transform group-hover:scale-105">
            <Eye className="h-3.5 w-3.5" />
            <span>Tap to explore schedule &amp; highlights</span>
          </div>
        </div>

        {/* Prev Arrow */}
        <button
          type="button"
          aria-label="Previous moment"
          onClick={(e) => {
            e.stopPropagation();
            go(index - 1);
          }}
          className="cursor-pointer absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/20 p-2.5 text-primary-foreground backdrop-blur-sm transition-all hover:bg-background/40 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next Arrow */}
        <button
          type="button"
          aria-label="Next moment"
          onClick={(e) => {
            e.stopPropagation();
            go(index + 1);
          }}
          className="cursor-pointer absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 rounded-full border border-background/30 bg-background/20 p-2.5 text-primary-foreground backdrop-blur-sm transition-all hover:bg-background/40 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Pagination indicator dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5 sm:gap-3">
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

      {/* Event Details Popup Modal ("into mark" to close) */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedEvent.title}
          onClick={closePopup}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-sm animate-fade-in"
        >
          {/* Card with Popup Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-md bg-[#faf8f4] border border-gold/30 shadow-2xl animate-fade-in text-ink"
          >
            {/* "Into mark" ('X') Close Button */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close event details"
              className="cursor-pointer absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-md transition-all hover:bg-ink hover:scale-105 active:scale-95 shadow-md"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Event Photo Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 font-sans text-xs font-semibold tracking-widest text-background uppercase shadow-sm">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedEvent.time}
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            {/* Popup Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Location Badge */}
              <div className="flex items-center gap-2 font-sans text-sm text-gold font-medium">
                <MapPin className="h-4 w-4" />
                <span>{selectedEvent.location}</span>
              </div>

              {/* Note */}
              <p className="font-sans text-base leading-relaxed text-muted-foreground border-l-2 border-gold/40 pl-4 italic">
                "{selectedEvent.note}"
              </p>

              {/* Schedule Breakdown */}
              <div>
                <h4 className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] text-gold uppercase font-semibold">
                  <Clock className="h-4 w-4 text-gold" />
                  Timeline Schedule
                </h4>
                <ul className="mt-3.5 space-y-2.5 font-sans text-sm">
                  {selectedEvent.schedule.map((item) => (
                    <li
                      key={item.activity}
                      className="flex items-start gap-3 rounded-sm bg-white p-2.5 border border-border/60 shadow-xs"
                    >
                      <span className="font-semibold text-gold tabular-nums w-14 shrink-0">
                        {item.time}
                      </span>
                      <span className="text-ink/85">{item.activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience Highlights */}
              <div>
                <h4 className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] text-gold uppercase font-semibold">
                  <Sparkles className="h-4 w-4 text-gold" />
                  Highlights
                </h4>
                <ul className="mt-3 space-y-2 font-sans text-sm text-muted-foreground">
                  {selectedEvent.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guest Tip */}
              {selectedEvent.attireTip && (
                <div className="rounded-sm border border-gold/30 bg-gold/10 p-4 font-sans text-xs leading-relaxed text-ink/85">
                  <strong className="block text-gold uppercase tracking-wider mb-1">
                    Helpful Note for Guests
                  </strong>
                  {selectedEvent.attireTip}
                </div>
              )}

              {/* Close Button at bottom */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={closePopup}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-2.5 font-sans text-xs tracking-wider text-muted-foreground hover:text-ink hover:border-gold transition-colors shadow-xs"
                >
                  <X className="h-4 w-4" />
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
