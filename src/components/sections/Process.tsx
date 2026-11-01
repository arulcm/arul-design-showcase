import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { processSteps } from "@/lib/site";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="scroll-mt-24 bg-surface px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          label="UI/UX design process"
          title="From a question to a crafted interface."
          aside={<p className="max-w-xs text-muted-foreground">Six steps I repeat on every project — looping back whenever users teach me something new.</p>}
        />

        <div ref={ref} className="relative mt-20">
          {/* track */}
          <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-border lg:hidden" aria-hidden>
            <motion.div style={{ scaleY: scale }} className="h-full w-full origin-top bg-primary" />
          </div>
          <div className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-border lg:block" aria-hidden>
            <motion.div style={{ scaleX: scale }} className="h-full w-full origin-left bg-primary" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="group relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-5 lg:block">
                  <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full border border-border bg-background font-mono text-[0.7rem] text-primary transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    {s.n}
                  </span>
                  <div className="lg:mt-8 lg:pr-2">
                    <h3 className={`text-2xl font-bold ${i % 2 ? "lg:mt-16" : ""}`}>{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
