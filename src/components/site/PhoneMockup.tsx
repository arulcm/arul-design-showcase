import { Maximize2 } from "lucide-react";
import type { Screenshot } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Real screenshot inside a phone frame. The screen takes the screenshot's own
 * aspect ratio so images are never stretched or cropped. Very tall captures
 * scroll inside a standard screen instead of being squashed.
 */
export function PhoneMockup({
  shot,
  className,
  onOpen,
  eager,
}: {
  shot: Screenshot;
  className?: string;
  onOpen?: () => void;
  eager?: boolean;
}) {
  const ratio = shot.scroll ? "710 / 1601" : `${shot.w} / ${shot.h}`;
  return (
    <figure
      className={cn(
        "group relative rounded-[2.4rem] bg-device p-[0.5rem] shadow-device ring-1 ring-border",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[1.95rem] bg-background"
        style={{ aspectRatio: ratio }}
      >
        {shot.scroll ? (
          <div
            className="absolute inset-0 overflow-y-auto no-scrollbar"
            tabIndex={0}
            aria-label={`${shot.category} — scrollable screenshot`}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        ) : (
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.w}
            height={shot.h}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        )}
      </div>
      {onOpen && (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Enlarge screenshot: ${shot.category}`}
          className="glass absolute right-4 top-4 grid size-10 place-items-center rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </button>
      )}
    </figure>
  );
}
