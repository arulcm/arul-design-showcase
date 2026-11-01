import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { site } from "@/lib/site";

const interests = [
  { t: "User-centered design", d: "Starting from real needs, not assumptions." },
  { t: "Interface design", d: "Clear hierarchy, honest feedback, calm visuals." },
  { t: "Frontend development", d: "Turning designs into fast, accessible React interfaces." },
  { t: "Problem-solving", d: "Breaking messy problems into simple flows." },
  { t: "Practical products", d: "Building things people can actually use every day." },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-primary">02</span>
              <span className="h-px w-10 bg-border" />
              About me
            </p>
          </Reveal>
          <p className="mt-8 font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-[2.6rem]">
            <RevealWords text="I design interfaces people understand at first glance —" />{" "}
            <span className="text-muted-foreground">
              <RevealWords text="then I build them, pixel to production." delay={0.3} />
            </span>
          </p>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
              I'm a Computer Science student who loves the space where design meets code. I sketch flows
              in Figma, shape them into clean visual systems, and ship them with React and Tailwind —
              always asking whether the experience feels simple for the person using it.
            </p>
          </Reveal>

          <ul className="mt-14 divide-y divide-border border-y border-border">
            {interests.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.05}>
                <li className="group grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 py-5 transition-colors sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)]">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <span className="font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-2">
                    {it.t}
                  </span>
                  <span className="col-start-2 text-sm text-muted-foreground sm:col-start-3">{it.d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5 lg:pt-20">
          <aside className="sticky top-28 overflow-hidden rounded-3xl bg-surface ring-1 ring-border">
            <div className="relative h-40 bg-radial-lime">
              <div className="absolute inset-0 bg-grid opacity-60" />
              <div className="absolute -bottom-10 left-8 grid size-24 place-items-center rounded-3xl bg-primary font-display text-3xl font-bold text-primary-foreground shadow-glow">
                {site.initials}
              </div>
            </div>
            <div className="p-8 pt-14">
              <h3 className="text-2xl font-bold">{site.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{site.tagline}</p>

              <dl className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="eyebrow text-[0.62rem]">Education</dt>
                    <dd className="mt-1">{site.degree}</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="eyebrow text-[0.62rem]">College</dt>
                    <dd className="mt-1">{site.college}</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="eyebrow text-[0.62rem]">Technical interests</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {["UI/UX", "React", "Design Systems", "Mobile Apps", "Machine Learning", "IoT"].map((t) => (
                        <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
