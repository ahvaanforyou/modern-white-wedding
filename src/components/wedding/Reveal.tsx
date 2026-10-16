import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  blur?: boolean;
};

const hiddenDirection: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
  none: "",
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true); // Default true so content is never accidentally lost

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "60px 0px 60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: "800ms",
      }}
      className={cn(
        "transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter]",
        shown
          ? "translate-x-0 translate-y-0 opacity-100 filter-none"
          : `opacity-0 ${hiddenDirection[direction]} ${blur ? "blur-md sm:blur-lg" : ""}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

// Section wrapper providing continuous smooth scroll entrance & exit fade
export function SectionFade({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true); // Default true so sections are always visible

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.02, rootMargin: "80px 0px 80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[opacity,transform]",
        inView ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2",
        className,
      )}
    >
      {children}
    </section>
  );
}
