<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Content lives in `src/lib/site.ts` (profile, links, skills, process) and `src/lib/projects.ts` (projects, screenshots); sections/pages render from these so copy changes stay in one place.
- Project screenshots are Lovable Assets pointers under `src/assets/habit/`; render them only through `PhoneMockup`, which sizes the screen from the image's own width/height so screenshots are never distorted.
- Home is one scrolling page of sections (`src/components/sections/*`) linked by hash; each project has its own page at `/work/$slug`.
- Animations use framer-motion and must respect reduced motion (Reveal, Cursor and CSS keyframes already do).
