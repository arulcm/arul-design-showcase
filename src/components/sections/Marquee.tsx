import { Asterisk } from "lucide-react";

const items = ["UI/UX Design", "Frontend Development", "Figma", "React", "Design Systems", "Prototyping", "Tailwind CSS", "User Research"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-6" aria-hidden>
      <div className="marquee flex w-max items-center gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className={i % 2 ? "text-outline" : ""}>{t}</span>
            <Asterisk className="size-7 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
