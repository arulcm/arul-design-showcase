import { Link } from "@tanstack/react-router";
import { Award, Briefcase, GraduationCap, Layers, Medal, Presentation } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const pending = [
  { icon: Award, title: "Certifications", note: "Space reserved for certifications." },
  { icon: Presentation, title: "Workshops", note: "Space reserved for workshops attended." },
  { icon: Briefcase, title: "Internships", note: "Space reserved for internships." },
  { icon: Medal, title: "Achievements", note: "Space reserved for awards & achievements." },
];

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 bg-surface px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="06" label="Education & experience" title="The journey so far." />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <ol className="relative space-y-6 border-l border-border pl-8 lg:col-span-7">
            <Reveal>
              <li className="relative">
                <span className="absolute -left-[2.55rem] top-1 grid size-5 place-items-center rounded-full bg-primary">
                  <span className="pulse-dot size-2 rounded-full bg-primary-foreground" />
                </span>
                <div className="rounded-3xl bg-background p-8 ring-1 ring-border">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="size-5 text-primary" />
                    <p className="eyebrow">Education · Currently pursuing</p>
                  </div>
                  <h3 className="mt-5 text-3xl font-bold">{site.degree}</h3>
                  <p className="mt-2 text-lg text-muted-foreground">{site.college}</p>
                  <p className="mt-6 leading-relaxed text-muted-foreground">
                    Studying the foundations of computing while applying them to design-led projects across
                    mobile, machine learning, IoT and geospatial systems.
                  </p>
                </div>
              </li>
            </Reveal>

            <Reveal delay={0.1}>
              <li className="relative">
                <span className="absolute -left-[2.45rem] top-1 size-3.5 rounded-full border-2 border-primary bg-surface" />
                <div className="rounded-3xl bg-background p-8 ring-1 ring-border">
                  <div className="flex items-center gap-3">
                    <Layers className="size-5 text-primary" />
                    <p className="eyebrow">Projects</p>
                  </div>
                  <ul className="mt-5 divide-y divide-border">
                    {projects.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/work/$slug"
                          params={{ slug: p.slug }}
                          className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary"
                        >
                          <span className="font-display font-semibold">{p.title}</span>
                          <span className="font-mono text-xs text-muted-foreground">{p.index}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          </ol>

          <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-5">
            {pending.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-3xl border border-dashed border-border p-6">
                  <p.icon className="size-5 text-muted-foreground" />
                  <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
                  <span className="eyebrow mt-6 text-[0.6rem]">To be added</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
