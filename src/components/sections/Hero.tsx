import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/site/HeroVisual";
import { RevealWords } from "@/components/site/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              {site.available && (
                <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm">
                  <span className="pulse-dot size-2 rounded-full bg-primary" />
                  Available for opportunities
                </span>
              )}
              <span className="eyebrow">{site.role}</span>
            </motion.div>

            <h1 className="mt-10 text-[2.7rem] font-bold leading-[0.95] sm:text-6xl lg:text-[4.6rem]">
              <RevealWords text="DESIGNING DIGITAL EXPERIENCES." delay={0.3} />
              <br />
              <RevealWords text="BUILDING WHAT MATTERS." delay={0.55} wordClassName="text-gradient-lime" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              I'm <span className="text-foreground">{site.shortName}</span> — a Computer Science student
              passionate about creating intuitive interfaces and meaningful digital products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/" hash="work">
                  View My Work <ArrowDownRight />
                </Link>
              </Button>
              <Button asChild variant="pill" size="xl">
                <a href={site.resumeUrl} download={site.resumeFileName}>
                  Download Resume <Download />
                </a>
              </Button>
              <Button asChild variant="quiet" size="xl">
                <Link to="/" hash="contact">
                  Contact Me <ArrowUpRight />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>

        {/* oversized name */}
        <div className="relative mt-16 border-t border-border pt-8">
          <div className="flex items-end justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl min-w-0 whitespace-nowrap text-[9.6vw] xl:text-[7.9rem]"
            >
              ARULPRAKASAM <span className="text-outline">C M</span>
            </motion.p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="eyebrow">{site.college}</p>
            <Link to="/" hash="about" className="group flex items-center gap-3" aria-label="Scroll to about">
              <span className="eyebrow hidden sm:inline">Scroll</span>
              <span className="relative h-12 w-[2px] overflow-hidden rounded-full bg-border">
                <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 rounded-full bg-primary" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
