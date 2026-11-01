import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Designed & built by me.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a className="transition-colors hover:text-foreground" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-foreground" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="transition-colors hover:text-foreground" href={site.behance} target="_blank" rel="noreferrer">
            Behance
          </a>
          <Link
            to="/"
            hash="top"
            className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            Back to top <ArrowUp className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
