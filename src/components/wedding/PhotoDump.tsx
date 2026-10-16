import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Reveal } from "@/components/wedding/Reveal";
import { FloralCorner } from "@/components/wedding/FloralAccents";

import photo1 from "@/assets/story-1.jpg";
import photo2 from "@/assets/story-2.jpg";
import photo3 from "@/assets/hero.jpg";
import photo4 from "@/assets/event-cocktail.jpg";
import photo5 from "@/assets/event-dance.jpg";
import photo6 from "@/assets/event-welcome.jpg";

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  rotation: string;
}

const photos: PhotoItem[] = [
  {
    id: 1,
    src: photo1,
    title: "The First Coffee",
    caption: "The grey Tuesday cafe where we talked until the staff started putting chairs on tables.",
    date: "October 2020",
    location: "Porto, Portugal",
    rotation: "-rotate-1 sm:-rotate-2",
  },
  {
    id: 2,
    src: photo2,
    title: "Quiet Sunday Morning",
    caption: "Two months of hiding a velvet box in a sock drawer, answered before the question was finished.",
    date: "May 2025",
    location: "Our Kitchen Table",
    rotation: "rotate-1 sm:rotate-2",
  },
  {
    id: 3,
    src: photo3,
    title: "Finding Villa Serena",
    caption: "The afternoon we walked through the olive grove and knew immediately this was where we wanted everyone to gather.",
    date: "September 2025",
    location: "Sintra / Lisbon",
    rotation: "-rotate-2 sm:-rotate-1",
  },
  {
    id: 4,
    src: photo4,
    title: "Sunset Wine & Canapés",
    caption: "Testing menus with our parents, laughing until our faces hurt.",
    date: "January 2026",
    location: "Lisbon Terrace",
    rotation: "rotate-2 sm:rotate-1",
  },
  {
    id: 5,
    src: photo5,
    title: "First Dance Practice",
    caption: "Stepping on each other's toes in the living room at midnight.",
    date: "August 2026",
    location: "Living Room Floor",
    rotation: "-rotate-1 sm:-rotate-2",
  },
  {
    id: 6,
    src: photo6,
    title: "Summer in the Garden",
    caption: "Sunlight through the leaves, talking about what the future might look like.",
    date: "July 2024",
    location: "Algarve Coast",
    rotation: "rotate-1 sm:rotate-2",
  },
];

export function PhotoDump() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const openLightbox = (photo: PhotoItem) => {
    setActivePhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActivePhoto(null);
    document.body.style.overflow = "";
  };

  const nextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setActivePhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setActivePhoto(photos[prevIndex]);
  };

  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-20 md:py-32 bg-[#faf9f6]">
      <FloralCorner corner="top-left" className="-left-14 -top-10" />
      <FloralCorner corner="bottom-right" className="-bottom-16 -right-16" />

      {/* Section Header */}
      <Reveal className="relative z-10 mx-auto mb-14 max-w-2xl text-center">
        <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase">Memories &amp; Moments</p>
        <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">The Photo Dump</h2>
        <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
          Unfiltered smiles, rainy afternoons, and six years of little adventures leading to this day.
        </p>
      </Reveal>

      {/* Photo Grid */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {photos.map((item, i) => (
            <Reveal key={item.id} delay={i * 100}>
              <div
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(item);
                }}
                className={`group relative cursor-pointer rounded-sm bg-white p-3.5 pb-6 shadow-[0_12px_30px_-10px_rgba(80,60,40,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(80,60,40,0.3)] hover:rotate-0 ${item.rotation}`}
              >
                {/* Photo container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-muted">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md">
                      <ZoomIn className="h-5 w-5" />
                    </span>
                  </div>
                </div>

                {/* Polaroid caption & handwritten info */}
                <div className="mt-4 px-1 text-center">
                  <h3 className="font-display text-xl text-ink font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-muted-foreground line-clamp-2">
                    {item.caption}
                  </p>
                  <div className="mt-2.5 flex items-center justify-center gap-2 font-sans text-[0.65rem] tracking-wider text-gold uppercase">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close photo preview"
            className="cursor-pointer absolute top-5 right-5 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Previous photo"
            className="cursor-pointer absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Navigation Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Next photo"
            className="cursor-pointer absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Active Card in Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-sm bg-white p-4 sm:p-6 shadow-2xl animate-fade-in"
          >
            <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden rounded-xs bg-muted">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-5 text-center px-2">
              <h3 className="font-display text-2xl sm:text-3xl text-ink">
                {activePhoto.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-muted-foreground max-w-lg mx-auto">
                {activePhoto.caption}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 font-sans text-xs tracking-widest text-gold uppercase">
                <span>{activePhoto.location}</span>
                <span>•</span>
                <span>{activePhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
