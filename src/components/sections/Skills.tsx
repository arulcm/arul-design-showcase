import { Code2, Database, PenTool, Server, Terminal, Wrench } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { skillGroups } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = [PenTool, Code2, Server, Terminal, Database, Wrench];
const spans = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          label="Skills & toolkit"
          title="Design thinking. Engineering hands."
          aside={<p className="max-w-xs text-muted-foreground">What I use day to day — no made-up percentages, just the tools.</p>}
        />

        <div className="mt-20 grid gap-4 md:grid-cols-8">
          {skillGroups.map((g, i) => {
            const Icon = icons[i];
            const big = i === 0;
            return (
              <Reveal key={g.title} delay={i * 0.06} className={spans[i]}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 ring-1 ring-border transition-all duration-500 hover:ring-primary/40",
                    big ? "bg-primary text-primary-foreground" : "bg-surface",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <Icon className={cn("size-6", big ? "" : "text-primary")} />
                    <span className={cn("font-mono text-xs", big ? "" : "text-muted-foreground")}>
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={cn("mt-8 font-bold", big ? "text-5xl sm:text-6xl" : "text-2xl")}>{g.title}</h3>
                  <ul className={cn("mt-6 flex flex-wrap gap-2", big && "mt-auto pt-10")}>
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className={cn(
                          "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                          big
                            ? "bg-primary-foreground/10 hover:bg-primary-foreground hover:text-primary"
                            : "border border-border text-muted-foreground hover:border-primary hover:text-foreground",
                        )}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
