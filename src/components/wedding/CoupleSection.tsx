import { Reveal } from "@/components/wedding/Reveal";
import { FloralCorner } from "@/components/wedding/FloralAccents";

import bride from "@/assets/bride.jpg";
import groom from "@/assets/groom.jpg";

const people = [
  {
    role: "The Bride",
    name: "Aisha Rahman",
    image: bride,
    alt: "Aisha, the bride, in an ivory silk dress by a window",
    bio: "Architect, early riser and keeper of every handwritten note. Aisha grew up in Porto, learned to bake from her grandmother, and still believes the best conversations happen in kitchens.",
    direction: "left" as const,
  },
  {
    role: "The Groom",
    name: "Rayan Haddad",
    image: groom,
    alt: "Rayan, the groom, in a charcoal suit with a boutonniere",
    bio: "Musician by night, stubborn cyclist by morning. Rayan collects vinyl he rarely plays, makes the same pasta every Sunday, and asked the question at that very kitchen table.",
    direction: "right" as const,
  },
];

export function CoupleSection() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-20 md:py-32">
      <FloralCorner corner="top-right" className="-right-10 -top-6" />
      <FloralCorner corner="bottom-left" className="-bottom-12 -left-10" />
      <Reveal className="relative z-10 mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">The two of us</p>
        <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">Bride &amp; Groom</h2>
      </Reveal>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-10 md:gap-16">
        {people.map((person, i) => (
          <Reveal key={person.name} direction={person.direction} delay={i * 150}>
            <figure className="flex flex-col items-center text-center">
              <div className="w-full max-w-sm overflow-hidden rounded-sm shadow-[var(--shadow-soft)] sm:max-w-none">
                <img
                  src={person.image}
                  alt={person.alt}
                  loading="lazy"
                  width={912}
                  height={1104}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-6 sm:mt-7">
                <p className="font-sans text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                  {person.role}
                </p>
                <h3 className="mt-2.5 font-display text-3xl text-ink md:text-4xl">{person.name}</h3>
                <p className="mx-auto mt-3.5 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground sm:mt-4">
                  {person.bio}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
