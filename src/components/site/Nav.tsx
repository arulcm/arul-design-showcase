import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-500 md:grid-cols-[auto_1fr_auto] md:px-5",
            scrolled ? "glass shadow-device" : "bg-transparent",
          )}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${site.name} — home`}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              {site.initials}
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight">
              {site.shortName}
              <span className="text-primary">.</span>
            </span>
          </Link>

          <ul className="hidden justify-center md:flex" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((l) => (
              <li key={l.hash}>
                <Link
                  to="/"
                  hash={l.hash}
                  onMouseEnter={() => setHovered(l.hash)}
                  onFocus={() => setHovered(l.hash)}
                  className="relative block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {hovered === l.hash && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-raised"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              hash="contact"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow sm:inline-flex"
            >
              Let's talk <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full bg-surface-raised md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-surface px-6 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full bg-surface-raised"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.hash}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/"
                    hash={l.hash}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-5xl font-bold tracking-tight transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${site.email}`} className="eyebrow text-foreground">
              {site.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
