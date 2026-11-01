import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/site/Lightbox";
import { PhoneMockup } from "@/components/site/PhoneMockup";
import { ProjectIllustration } from "@/components/site/ProjectIllustration";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="scroll-mt-24 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Projects with a point of view."
          aside={
            <p className="max-w-xs text-muted-foreground">
              Four builds across mobile, machine learning, IoT and geospatial — each designed around a real problem.
            </p>
          }
        />
        <div className="mt-20">
          {featured && <FeaturedProject project={featured} />}
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} wide={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const [lb, setLb] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <Reveal>
      <article
        ref={ref}
        className="group relative overflow-hidden rounded-[2.5rem] bg-surface ring-1 ring-border"
      >
        <div className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-radial-lime opacity-80" aria-hidden />

        <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm text-primary">{project.index}</span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Featured Project
              </span>
              <span className="eyebrow">{project.category}</span>
            </div>
            <h3 className="mt-8 text-4xl font-bold leading-[0.95] sm:text-6xl">{project.title}</h3>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">{project.description}</p>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {project.highlights.slice(0, 8).map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <Button asChild variant="hero" size="xl" className="mt-10">
              <Link to="/work/$slug" params={{ slug: project.slug }}>
                View Case Study <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="relative flex min-h-[460px] items-center justify-center lg:col-span-6">
            <motion.div style={{ y: y2 }} className="absolute left-[2%] top-[14%] w-[38%] -rotate-6 opacity-90 transition-transform duration-700 group-hover:-translate-x-3 group-hover:-rotate-[9deg]">
              {shots[0] && <PhoneMockup shot={shots[0]} onOpen={() => setLb(0)} />}
            </motion.div>
            <motion.div style={{ y: y1 }} className="relative z-10 w-[44%]">
              {shots[1] && <PhoneMockup shot={shots[1]} onOpen={() => setLb(1)} />}
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute right-[2%] top-[14%] w-[38%] rotate-6 opacity-90 transition-transform duration-700 group-hover:translate-x-3 group-hover:rotate-[9deg]">
              {shots[3] && <PhoneMockup shot={shots[3]} onOpen={() => setLb(3)} />}
            </motion.div>
          </div>
        </div>

        {/* horizontal gallery */}
        <div className="relative border-t border-border py-10">
          <div className="mb-6 flex items-center justify-between px-7 sm:px-12 lg:px-16">
            <p className="eyebrow">Real app screens · tap to enlarge</p>
            <p className="eyebrow hidden sm:block">Scroll →</p>
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-7 pb-2 sm:px-12 lg:px-16">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setLb(i)}
                className="group/shot w-[200px] shrink-0 snap-start text-left sm:w-[230px]"
                aria-label={`Enlarge screenshot: ${s.category}`}
              >
                <PhoneMockup shot={s.scroll ? { ...s, scroll: false, w: 710, h: 1601 } : s}
                offset={s.scroll ? 40 : 0} className="transition-transform duration-500 group-hover/shot:-translate-y-2" />
                <p className="mt-4 font-mono text-[0.65rem] text-primary">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-sm font-medium">{s.category}</p>
              </button>
            ))}
          </div>
        </div>
        <Lightbox shots={shots} index={lb} onChange={setLb} />
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <Reveal className={cn(wide && "md:col-span-2")}>
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className={cn(
          "group grid h-full gap-8 rounded-[2rem] bg-surface p-6 ring-1 ring-border transition-all duration-500 hover:ring-primary/40 sm:p-8",
          wide && "md:grid-cols-2 md:items-center",
        )}
      >
        {project.visual !== "habit" && (
          <ProjectIllustration visual={project.visual} className={cn("aspect-[4/3]", wide && "md:order-2")} />
        )}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-sm text-primary">{project.index}</span>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
          <p className="eyebrow mt-6">{project.category}</p>
          <h3 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View Case Study <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
