import floralCorner from "@/assets/floral-corner.png";
import { cn } from "@/lib/utils";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const cornerTransforms: Record<Corner, string> = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0 -scale-x-100",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 scale-[-1]",
};

export function FloralCorner({
  corner,
  className,
  prominent = false,
}: {
  corner: Corner;
  className?: string;
  prominent?: boolean;
}) {
  return (
    <img
      src={floralCorner}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={1536}
      height={1536}
      className={cn(
        "pointer-events-none absolute z-0 select-none object-contain opacity-70 drop-shadow-[var(--shadow-botanical)]",
        prominent
          ? "w-[min(44vw,34rem)] max-sm:w-[13rem] max-sm:opacity-55"
          : "w-[min(30vw,24rem)] max-sm:w-[9.5rem] max-sm:opacity-40",
        cornerTransforms[corner],
        className,
      )}
    />
  );
}
