import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { habitScreens, projects } from "@/lib/projects";

describe("projects", () => {
  it("has a case study page for every project", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const p of projects) {
      expect(router.matchRoutes(`/work/${p.slug}`).at(-1)?.routeId).toBe("/work/$slug");
    }
  });

  it("features the habit tracker first", () => {
    expect(projects[0].slug).toBe("adaptive-habit-analytics-tracker");
    expect(projects[0].featured).toBe(true);
  });

  it("offers 25, 45, 60 and 90 minute focus sessions", () => {
    const focus = projects[0].features?.find((f) => f.title.startsWith("Focus"));
    for (const m of ["25", "45", "60", "90"]) expect(focus?.body).toContain(m);
  });

  it("keeps every real screenshot's own size so it is never stretched", () => {
    for (const s of habitScreens) expect(s.w / s.h).toBeLessThan(1);
  });
});
