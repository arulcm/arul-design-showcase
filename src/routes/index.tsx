import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/site/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arulprakasam C M — UI/UX Designer & Frontend Developer" },
      {
        name: "description",
        content:
          "Designing digital experiences, building what matters. Selected work, design process and skills of Arulprakasam C M.",
      },
      { property: "og:title", content: "Arulprakasam C M — UI/UX Designer & Frontend Developer" },
      {
        property: "og:description",
        content: "Designing digital experiences, building what matters. Selected UI/UX and frontend work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Process />
      <Skills />
      <Journey />
      <Contact />
    </PageTransition>
  );
}
