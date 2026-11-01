import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/site/Lightbox";
import { PageTransition } from "@/components/site/PageTransition";
import { PhoneMockup } from "@/components/site/PhoneMockup";
import { ProjectIllustration } from "@/components/site/ProjectIllustration";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { getProject, projects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    if (!getProject(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${p.title} — Case Study · ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const project = getProject(slug)!;
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length]!;

  return (
    <PageTransition key={slug}>
      <article>
        <Header project={project} />
        {project.visual === "habit" ? <HabitBody project={project} /> : <GenericBody project={project} />}
        <NextProject project={next} />
      </article>
    </PageTransition>
  );
}

function Header({ project }: { project: Project }) {
  return (
    <header className="px-6 pb-16 pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All work
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-primary">{project.index}</span>
          {project.featured && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Featured Project
            </span>
          )}
          <span className="eyebrow">Case study</span>
        </div>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[0.92] sm:text-7xl lg:text-8xl">
          <RevealWords text={project.title} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-3">
            <Meta label="Category" value={project.category} />
            <Meta label="Stack" value={project.tech.slice(0, 3).join(", ") + (project.tech.length > 3 ? " +" + (project.tech.length - 3) : "")} />
            <Meta label="Focus" value={project.highlights.slice(0, 2).join(" · ")} />
          </dl>
        </Reveal>
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-6">
      <dt className="eyebrow text-[0.62rem]">{label}</dt>
      <dd className="mt-2 font-display font-medium">{value}</dd>
    </div>
  );
}

function OverviewBlock({ project }: { project: Project }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-primary">Overview</p>
          <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{project.overview}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow text-primary">The challenge</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{project.challenge}</p>
          <p className="eyebrow mt-12 text-primary">Approach</p>
          <ol className="mt-5 space-y-4">
            {project.approach.map((a, i) => (
              <li key={a} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function TechBlock({ project }: { project: Project }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-surface p-8 ring-1 ring-border sm:p-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-primary">Key features</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-primary">Technology</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-border px-4 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Habit tracker — full case study ---------------- */

function HabitBody({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const [lb, setLb] = useState<number | null>(null);
  const features = project.features ?? [];
  const withShot = features.filter((f) => f.shot !== undefined);
  const withoutShot = features.filter((f) => f.shot === undefined);

  return (
    <>
      {/* hero mockup stage */}
      <section className="px-6">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-surface ring-1 ring-border">
            <div className="absolute inset-0 bg-radial-lime" aria-hidden />
            <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
            <div className="relative flex items-end justify-center gap-4 px-6 pt-16 sm:gap-8 sm:pt-24">
              <PhoneMockup shot={shots[2]!} onOpen={() => setLb(2)} className="hidden w-[24%] max-w-[260px] translate-y-16 sm:block" />
              <PhoneMockup shot={shots[0]!} onOpen={() => setLb(0)} eager className="w-[62%] max-w-[330px] translate-y-6 sm:w-[30%]" />
              <PhoneMockup shot={shots[3]!} onOpen={() => setLb(3)} className="hidden w-[24%] max-w-[260px] translate-y-16 sm:block" />
            </div>
          </div>
        </Reveal>
      </section>

      <OverviewBlock project={project} />

      {/* gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-4xl font-bold sm:text-5xl">Screen gallery</h2>
              <p className="eyebrow hidden sm:block">Real screenshots · tap to enlarge</p>
            </div>
          </Reveal>
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 xl:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setLb(i)}
              className="group w-[220px] shrink-0 snap-start text-left sm:w-[260px]"
              aria-label={`Enlarge screenshot: ${s.category}`}
            >
              <PhoneMockup
                shot={s.scroll ? { ...s, scroll: false, w: 710, h: 1601 } : s}
                offset={s.scroll ? 40 : 0}
                className="transition-transform duration-500 group-hover:-translate-y-2"
              />
              <p className="mt-4 font-mono text-[0.65rem] text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-medium">{s.category}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.caption}</p>
            </button>
          ))}
        </div>
      </section>

      {/* feature breakdown */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-primary">Feature breakdown</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-6xl">Every screen earns its place.</h2>
          </Reveal>

          <div className="mt-20 space-y-28">
            {withShot.map((f, idx) => {
              const s = shots[f.shot!]!;
              return (
                <div key={f.title} className="grid items-center gap-12 md:grid-cols-12">
                  <Reveal className={cn("md:col-span-5", idx % 2 ? "md:order-2 md:col-start-8" : "")}>
                    <div className="relative mx-auto w-[70%] max-w-[300px]">
                      <div className="absolute -inset-10 rounded-full bg-radial-lime" aria-hidden />
                      <PhoneMockup shot={s} onOpen={() => setLb(f.shot!)} className="relative" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={cn("md:col-span-6", idx % 2 ? "md:order-1" : "md:col-start-7")}>
                    <span className="font-mono text-sm text-primary">{String(idx + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-3xl font-bold sm:text-5xl">{f.title}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{f.body}</p>
                    <p className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted-foreground">{s.caption}</p>
                  </Reveal>
                </div>
              );
            })}
          </div>

          {withoutShot.length > 0 && (
            <div className="mt-28">
              <Reveal>
                <p className="eyebrow">Also in the app</p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {withoutShot.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.05}>
                    <div className="h-full rounded-3xl bg-surface p-7 ring-1 ring-border transition-all duration-500 hover:ring-primary/40">
                      <h3 className="text-xl font-semibold">{f.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* design decisions */}
      {project.decisions && (
        <section className="bg-surface px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="eyebrow text-primary">Design decisions & UX</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-6xl">Why it looks and feels this way.</h2>
            </Reveal>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-2 lg:grid-cols-3">
              {project.decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05} className="bg-background">
                  <div className="group h-full p-8 transition-colors duration-500 hover:bg-surface-raised">
                    <span className="font-mono text-xs text-primary">D{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 text-2xl font-bold">{d.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{d.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <TechBlock project={project} />
      <Lightbox shots={shots} index={lb} onChange={setLb} />
    </>
  );
}

/* ---------------- Other projects ---------------- */

function GenericBody({ project }: { project: Project }) {
  if (project.visual === "habit") return null;
  return (
    <>
      <section className="px-6">
        <Reveal>
          <ProjectIllustration visual={project.visual} className="mx-auto aspect-[16/10] max-w-7xl rounded-[2.5rem] ring-1 ring-border sm:aspect-[16/8]" />
        </Reveal>
        <p className="mx-auto mt-4 max-w-7xl text-sm text-muted-foreground">
          Illustrative visual — not a product screenshot.
        </p>
      </section>
      <OverviewBlock project={project} />
      <TechBlock project={project} />
    </>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl border-t border-border pt-16">
        <p className="eyebrow">Next project</p>
        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          className="group mt-6 flex items-end justify-between gap-6"
        >
          <span className="text-4xl font-bold leading-none transition-colors group-hover:text-primary sm:text-7xl">
            {project.title}
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 sm:size-20">
            <ArrowUpRight className="size-7" />
          </span>
        </Link>
      </div>
    </section>
  );
}
