import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { Screenshot } from "@/lib/projects";

export function Lightbox({
  shots,
  index,
  onChange,
}: {
  shots: Screenshot[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const open = index !== null;
  const shot = index !== null ? shots[index] : null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + shots.length) % shots.length);
    },
    [index, onChange, shots.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 p-4 outline-none sm:p-10">
          <Dialog.Title className="sr-only">{shot?.category ?? "Screenshot"}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Use the arrow keys to move between screenshots.
          </Dialog.Description>

          <AnimatePresence mode="wait">
            {shot && (
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-0 flex-1 items-center justify-center"
              >
                {shot.scroll ? (
                  <div className="h-[78vh] w-[min(420px,88vw)] overflow-y-auto rounded-2xl ring-1 ring-border">
                    <img src={shot.src} alt={shot.alt} className="block h-auto w-full" />
                  </div>
                ) : (
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain ring-1 ring-border"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {shot && index !== null && (
            <div className="flex w-full max-w-xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
                className="glass grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:text-primary"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="min-w-0 text-center">
                <p className="eyebrow text-primary">
                  {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                </p>
                <p className="mt-1 truncate font-display text-lg font-semibold">{shot.category}</p>
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screenshot"
                className="glass grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:text-primary"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}

          <Dialog.Close
            aria-label="Close"
            className="glass absolute right-4 top-4 grid size-11 place-items-center rounded-full transition-colors hover:text-primary sm:right-8 sm:top-8"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
