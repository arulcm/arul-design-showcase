import { Reveal, RevealWords } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-primary">{index}</span>
            <span className="h-px w-10 bg-border" />
            {label}
          </p>
        </Reveal>
        <h2 className="mt-6 text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
          <RevealWords text={title} />
        </h2>
      </div>
      {aside && (
        <Reveal delay={0.15} className="md:col-span-4 md:justify-self-end">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
