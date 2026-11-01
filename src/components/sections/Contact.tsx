import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { site } from "@/lib/site";

function BehanceMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`${className ?? ""} inline-grid place-items-center font-display text-sm font-bold leading-none`}>
      Bē
    </span>
  );
}

const socials = [
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
  { label: "Behance", href: site.behance, icon: BehanceMark },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-radial-lime opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-primary">07</span>
            <span className="h-px w-10 bg-border" />
            Contact
          </p>
        </Reveal>
        <h2 className="mt-8 text-[2.6rem] font-bold leading-[0.92] sm:text-7xl lg:text-[7.5rem]">
          <RevealWords text="HAVE AN IDEA?" />
          <br />
          <RevealWords text="LET'S BUILD SOMETHING MEANINGFUL." delay={0.25} wordClassName="text-gradient-lime" />
        </h2>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col gap-4 border-y border-border py-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="group flex min-w-0 items-center gap-4 font-display text-2xl font-semibold transition-colors hover:text-primary sm:text-4xl"
            >
              <Mail className="size-7 shrink-0 text-primary" />
              <span className="truncate">{site.email}</span>
              <ArrowUpRight className="size-7 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <Button variant="pill" size="xl" onClick={copy} aria-live="polite">
              {copied ? (
                <>
                  Copied <Check />
                </>
              ) : (
                <>
                  Copy email <Copy />
                </>
              )}
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center justify-between rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="flex items-center gap-3 font-display text-lg font-semibold">
                  <s.icon className="size-5 text-primary" /> {s.label}
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a
              href={site.resumeUrl}
              download={site.resumeFileName}
              className="group flex items-center justify-between rounded-2xl bg-primary p-6 text-primary-foreground transition-all duration-500 hover:-translate-y-1 hover:bg-primary-glow"
            >
              <span className="font-display text-lg font-semibold">Resume</span>
              <Download className="size-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
