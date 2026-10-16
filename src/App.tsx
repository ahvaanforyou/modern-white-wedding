import { FlipClock } from "@/components/wedding/FlipClock";
import { EventCarousel } from "@/components/wedding/EventCarousel";
import { Reveal, SectionFade } from "@/components/wedding/Reveal";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { PhotoDump } from "@/components/wedding/PhotoDump";
import { VenueMap } from "@/components/wedding/VenueMap";
import { FloralCorner } from "@/components/wedding/FloralAccents";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { RSVPForm } from "@/components/wedding/RSVPForm";
import { IntroGate } from "@/components/wedding/IntroGate";

import weddingStage from "@/assets/wedding-stage-hd.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";

const WEDDING_DATE = new Date("2026-12-12T16:00:00Z");

function Divider() {
  return (
    <div className="mx-auto flex w-40 items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function App() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-gold-soft selection:text-ink">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-8 py-16">
        <img
          src={weddingStage}
          alt="An elegant ivory and blush wedding stage prepared for the celebration"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-ink/20" />
        <FloralCorner corner="top-left" prominent className="-left-4 -top-3 sm:-left-10 sm:-top-8" />
        <FloralCorner corner="bottom-right" prominent className="-bottom-5 -right-5 sm:-bottom-12 sm:-right-12" />
        <div className="relative z-10 mx-auto w-full max-w-3xl border border-background/50 bg-background/80 px-6 py-9 sm:py-16 text-center shadow-[var(--shadow-soft)] backdrop-blur-md animate-fade-in">
          <p className="font-sans text-[0.7rem] tracking-[0.5em] text-ink/75 uppercase">
            Together with their families
          </p>
          <h1 className="mt-5 sm:mt-7 text-center font-display text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-ink">
            Aisha
            <span className="mx-2.5 sm:mx-3 italic text-gold">&amp;</span>
            Rayan
          </h1>
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
            <Divider />
            <p className="font-sans text-[0.75rem] sm:text-xs tracking-[0.35em] text-ink/85 uppercase">
              12 · 12 · 2026 — Villa Serena
            </p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <SectionFade className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-32">
        <FloralCorner corner="top-right" className="-right-4 -top-3 sm:-right-14 sm:-top-10" />
        <FloralCorner corner="bottom-left" className="-bottom-5 -left-5 sm:-bottom-16 sm:-left-16" />
        <Reveal className="relative z-10 mx-auto max-w-6xl text-center">
          <h2 className="font-display text-4xl text-ink md:text-5xl">Counting the days</h2>
          <p className="mt-4 font-sans text-xs tracking-[0.25em] text-muted-foreground uppercase sm:text-sm">
            Until we say yes
          </p>
          <div className="mt-12 sm:mt-14">
            <FlipClock target={WEDDING_DATE} />
          </div>
        </Reveal>
      </SectionFade>

      {/* Story */}
      <SectionFade className="relative overflow-hidden px-6 py-20 md:py-28 border-t border-border/50">
        <FloralCorner corner="top-left" className="-left-4 -top-3 sm:-left-14 sm:-top-10" />
        <FloralCorner corner="bottom-right" className="-bottom-5 -right-5 sm:-bottom-12 sm:-right-12" />
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal direction="left">
            <div className="overflow-hidden rounded-sm shadow-[var(--shadow-soft)]">
              <img
                src={story1}
                alt="The couple laughing together at a cafe table"
                loading="lazy"
                width={1008}
                height={1200}
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">Our story</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              A coffee that ran four hours long
            </h2>
            <p className="mt-5 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              We met on a grey Tuesday and closed the cafe without noticing. Six years, three cities
              and countless small mornings later, we are asking the people we love most to stand
              with us for one more beginning.
            </p>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto mt-20 grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal direction="left" className="md:order-2">
            <div className="overflow-hidden rounded-sm shadow-[var(--shadow-soft)]">
              <img
                src={story2}
                alt="Two hands resting together, one wearing an engagement ring"
                loading="lazy"
                width={1008}
                height={1200}
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </Reveal>
          <Reveal direction="right" delay={150} className="md:order-1">
            <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">The question</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              Asked quietly, answered instantly
            </h2>
            <p className="mt-5 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              No crowd, no fireworks — just a kitchen table, a ring that had waited two months in a
              sock drawer, and a yes before the sentence was finished.
            </p>
          </Reveal>
        </div>
      </SectionFade>

      {/* Bride & Groom */}
      <CoupleSection />

      {/* Photo Dump Section (Directly Below Bride & Groom) */}
      <PhotoDump />

      {/* Order of the day */}
      <SectionFade className="relative overflow-hidden px-6 py-20 md:py-32 border-t border-border/50">
        <FloralCorner corner="top-left" className="-left-4 -top-3 sm:-left-14 sm:-top-10" />
        <FloralCorner corner="bottom-right" className="-bottom-5 -right-5 sm:-bottom-16 sm:-right-16" />
        <Reveal className="relative z-10 mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">The day itself</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">Order of events</h2>
        </Reveal>
        <Reveal className="relative z-10" delay={120}>
          <EventCarousel />
        </Reveal>
      </SectionFade>

      {/* Venue & details */}
      <SectionFade className="relative overflow-hidden border-t border-border px-6 py-20 md:py-32">
        <FloralCorner corner="top-right" className="-right-4 -top-3 sm:-right-12 sm:-top-8" />
        <FloralCorner corner="bottom-left" className="-bottom-5 -left-5 sm:-bottom-14 sm:-left-14" />
        <div className="relative z-10 mx-auto grid max-w-4xl gap-10 text-center sm:gap-12 md:grid-cols-3 md:text-left">
          {[
            { label: "Where", lines: ["Villa Serena", "18 Olive Grove Road", "Lisbon, Portugal"] },
            { label: "When", lines: ["Saturday, 12 December 2026", "Ceremony at 16:00", "Carriages at midnight"] },
            { label: "Dress", lines: ["Formal, in soft neutrals", "Garden ground — mind the heels", "Evenings are cool"] },
          ].map((block, i) => (
            <Reveal key={block.label} delay={i * 140}>
              <h3 className="font-sans text-xs tracking-[0.4em] text-gold uppercase">{block.label}</h3>
              <div className="mt-4 space-y-1.5 font-display text-2xl leading-snug text-ink sm:mt-5">
                {block.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative z-10 mt-14 sm:mt-16" delay={120}>
          <VenueMap />
        </Reveal>
      </SectionFade>

      {/* RSVP */}
      <SectionFade className="relative overflow-hidden border-t border-border px-6 py-20 md:py-32">
        <FloralCorner corner="top-left" className="-left-4 -top-3 sm:-left-14 sm:-top-10" />
        <FloralCorner corner="bottom-right" className="-bottom-5 -right-5 sm:-bottom-16 sm:-right-16" />
        <Reveal className="relative z-10 mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">Kindly reply</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">Will you join us?</h2>
          <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
            Please let us know who is coming and share any details that will help us welcome you.
          </p>
        </Reveal>
        <Reveal className="relative z-10" delay={120}>
          <RSVPForm />
        </Reveal>
      </SectionFade>

      {/* Closing */}
      <footer className="relative overflow-hidden border-t border-border px-6 py-20 sm:py-24 text-center">
        <FloralCorner corner="bottom-left" prominent className="-bottom-6 -left-4 sm:-bottom-20 sm:-left-16" />
        <FloralCorner corner="bottom-right" prominent className="-bottom-6 -right-4 sm:-bottom-20 sm:-right-16" />
        <Reveal className="relative z-10">
          <Divider />
          <p className="mt-8 sm:mt-10 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl md:text-4xl">
            We would love nothing more
            <br />
            than to have you there.
          </p>
          <p className="mt-8 sm:mt-10 font-sans text-xs tracking-[0.45em] text-muted-foreground uppercase">
            Aisha &amp; Rayan — 12 December 2026
          </p>
        </Reveal>
      </footer>

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* 3D Envelope Intro Gate */}
      <IntroGate />
    </main>
  );
}

export default App;
