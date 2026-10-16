import { useState } from "react";
import { ChevronDown, Clock, MapPin, Sparkles, Utensils, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

import welcome from "@/assets/event-welcome.jpg";
import ceremony from "@/assets/event-ceremony.jpg";
import cocktail from "@/assets/event-cocktail.jpg";
import dinner from "@/assets/event-dinner.jpg";
import dance from "@/assets/event-dance.jpg";

interface EventDetail {
  time: string;
  title: string;
  note: string;
  image: string;
  location: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  attireTip?: string;
}

const events: EventDetail[] = [
  {
    time: "15:30",
    title: "Welcome & Seating",
    note: "Find your name, greet the families, and sip chilled spritzes under the olive trees.",
    image: welcome,
    location: "Courtyard & Olive Terrace",
    highlights: [
      "Chilled peach bellinis and botanical iced teas upon arrival",
      "Live acoustic Spanish guitar welcome melodies",
      "Seating assistance and handwritten place cards",
    ],
    schedule: [
      { time: "15:30", activity: "Guest arrivals & welcome refreshment" },
      { time: "15:45", activity: "Prelude music by string duo" },
      { time: "15:55", activity: "Guests guided to ceremony seating" },
    ],
    attireTip: "Garden-friendly footwear recommended for the stone paths.",
  },
  {
    time: "16:00",
    title: "The Ceremony",
    note: "Vows beneath the floral garden arch surrounded by our closest family and friends.",
    image: ceremony,
    location: "The Rose Garden Pavilion",
    highlights: [
      "Intimate unplugged ceremony so everyone is fully present",
      "Personal vows and traditional blessings",
      "Olive leaf and white petal confetti celebration",
    ],
    schedule: [
      { time: "16:00", activity: "Processional of bride and groom" },
      { time: "16:15", activity: "Exchange of rings & vows" },
      { time: "16:40", activity: "Recessional & celebratory toast" },
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
    note: "A candlelit feast of Mediterranean flavors at long tables under the pergola.",
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
    attireTip: "Evenings in Sintra/Lisbon cool down; light wraps provided.",
  },
  {
    time: "20:30",
    title: "First Dance & Party",
    note: "The dance floor opens for everyone with a live band, late-night bites, and sparklers.",
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Intro instruction */}
      <p className="text-center font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Tap any moment to view detailed itinerary &amp; location
      </p>

      {/* Cards list */}
      <div className="grid gap-8">
        {events.map((event, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={event.title}
              className={cn(
                "group relative overflow-hidden rounded-md border border-border/80 bg-card shadow-[var(--shadow-soft)] transition-all duration-500",
                isExpanded ? "ring-2 ring-gold/50 shadow-2xl" : "hover:border-gold/40 hover:shadow-lg",
              )}
            >
              {/* Card Banner / Header - Clickable */}
              <div
                onClick={() => toggleExpand(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleExpand(idx);
                }}
                className="relative cursor-pointer"
              >
                {/* Large Background Photo */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-muted">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    width={1408}
                    height={912}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

                  {/* Header Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-primary-foreground">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1 font-sans text-xs font-medium tracking-[0.25em] text-background uppercase shadow-sm">
                        <Clock className="h-3.5 w-3.5" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1 font-sans text-xs tracking-wider text-gold-soft uppercase">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-2xl font-sans text-sm text-primary-foreground/85 leading-relaxed">
                      {event.note}
                    </p>

                    {/* Expand Indicator button */}
                    <div className="mt-4 flex items-center gap-2 font-sans text-xs tracking-[0.25em] text-gold uppercase font-medium">
                      <span>{isExpanded ? "Hide Details" : "View Details & Itinerary"}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Deep-Dive Content */}
              {isExpanded && (
                <div className="animate-fade-in border-t border-border bg-[#faf8f5] p-6 sm:p-10 text-ink">
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Schedule breakdown */}
                    <div>
                      <h4 className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] text-gold uppercase font-semibold">
                        <Clock className="h-4 w-4 text-gold" />
                        Schedule Breakdown
                      </h4>
                      <ul className="mt-4 space-y-3 font-sans text-sm">
                        {event.schedule.map((item) => (
                          <li
                            key={item.activity}
                            className="flex items-start gap-3 rounded-sm bg-white/70 p-2.5 shadow-xs border border-border/40"
                          >
                            <span className="font-semibold text-gold tabular-nums w-14 shrink-0">
                              {item.time}
                            </span>
                            <span className="text-muted-foreground">{item.activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights & Attire */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] text-gold uppercase font-semibold">
                          <Sparkles className="h-4 w-4 text-gold" />
                          Experience Highlights
                        </h4>
                        <ul className="mt-4 space-y-2.5 font-sans text-sm text-muted-foreground">
                          {event.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2.5">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {event.attireTip && (
                        <div className="rounded-sm border border-gold/30 bg-gold/5 p-4 font-sans text-xs leading-relaxed text-ink/80">
                          <strong className="block text-gold uppercase tracking-wider mb-1">
                            Guest Tip
                          </strong>
                          {event.attireTip}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collapse Button */}
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(null)}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 font-sans text-xs tracking-wider text-muted-foreground hover:text-ink hover:border-gold transition-colors"
                    >
                      <span>Close details</span>
                      <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
