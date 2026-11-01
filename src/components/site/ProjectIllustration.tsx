import brushImg from "@/assets/brushvault-concept.jpg";
import thermalShot from "@/assets/shaderoute-map.png.asset.json";
import type { ProjectVisual } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Abstract illustrations for projects without real screenshots.
 * Always labelled "Illustration" so they are never mistaken for the product.
 */
export function ProjectIllustration({
  visual,
  className,
}: {
  visual: Exclude<ProjectVisual, "habit">;
  className?: string;
}) {
  if (visual === "brush" || visual === "thermal") {
    const img = visual === "brush"
      ? { src: brushImg, label: "Concept render", alt: "Concept render of the BrushVault smart toothbrush dock with a lime UV ring" }
      : { src: thermalShot.url, label: "Screenshot", alt: "ShadeRoute thermal navigator showing a shaded walking route through Hong Kong" };
    return (
      <div className={cn("relative overflow-hidden rounded-3xl bg-surface", className)}>
        <span className="glass eyebrow absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[0.6rem]">{img.label}</span>
        <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-surface bg-grid", className)}>
      <div className="absolute inset-0 bg-radial-lime opacity-60" aria-hidden />
      <span className="glass eyebrow absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[0.6rem]">
        Illustration
      </span>
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label={labels[visual]}
        className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      >
        {visual === "fatigue" && <Fatigue />}
        {visual === "brush" && <Brush />}
        {visual === "thermal" && <Thermal />}
      </svg>
    </div>
  );
}

const labels = {
  fatigue: "Abstract illustration of typing signals feeding a fatigue gauge",
  brush: "Abstract illustration of a smart toothbrush dock with its sensors",
  thermal: "Abstract illustration of a city grid with a cooler route through shade",
} as const;

const P = "var(--color-primary)";
const G = "var(--color-primary-glow)";
const M = "var(--color-muted-foreground)";
const B = "var(--color-border)";
const S = "var(--color-surface-raised)";

function Fatigue() {
  const bars = [30, 52, 40, 68, 44, 76, 58, 84, 62, 90, 70, 96];
  return (
    <g>
      <rect x="40" y="60" width="200" height="180" rx="16" fill={S} />
      <text x="58" y="88" fill={M} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">KEYSTROKE RHYTHM</text>
      <path
        d="M58 150 C75 120, 85 175, 100 140 S125 110, 140 150 S165 185, 180 130 S205 110, 222 145"
        fill="none"
        stroke={P}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {bars.map((h, i) => (
        <rect key={i} x={58 + i * 14} y={228 - h * 0.5} width="8" height={h * 0.5} rx="2" fill={P} opacity={0.25 + i * 0.06} />
      ))}
      <rect x="256" y="60" width="104" height="180" rx="16" fill={S} />
      <path d="M276 170 A32 32 0 0 1 340 170" fill="none" stroke={B} strokeWidth="8" strokeLinecap="round" />
      <path d="M276 170 A32 32 0 0 1 326 145" fill="none" stroke={G} strokeWidth="8" strokeLinecap="round" />
      <text x="308" y="200" textAnchor="middle" fill={M} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">FATIGUE</text>
      <circle cx="308" cy="98" r="14" fill="none" stroke={P} strokeWidth="1.5" />
      <circle cx="303" cy="96" r="1.8" fill={P} />
      <circle cx="313" cy="96" r="1.8" fill={P} />
      <path d="M302 103 Q308 106 314 103" stroke={P} strokeWidth="1.5" fill="none" />
    </g>
  );
}

function Brush() {
  const nodes = [
    { x: 80, y: 80, t: "ESP32-C3" },
    { x: 320, y: 80, t: "MPU6050" },
    { x: 80, y: 220, t: "FSR402" },
    { x: 320, y: 220, t: "DS3231" },
  ];
  return (
    <g>
      {nodes.map((n) => (
        <line key={n.t} x1="200" y1="150" x2={n.x} y2={n.y} stroke={B} strokeWidth="1.2" strokeDasharray="3 5" />
      ))}
      <rect x="160" y="170" width="80" height="80" rx="18" fill={S} stroke={B} />
      <circle cx="200" cy="200" r="10" fill="none" stroke={G} strokeWidth="2" />
      <rect x="188" y="40" width="24" height="150" rx="12" fill="none" stroke={P} strokeWidth="2.5" />
      <rect x="192" y="48" width="16" height="30" rx="6" fill={P} opacity="0.35" />
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x - 40} y={n.y - 14} width="80" height="28" rx="14" fill={S} stroke={B} />
          <circle cx={n.x - 26} cy={n.y} r="3.5" fill={P} />
          <text x={n.x - 16} y={n.y + 3.5} fill={M} fontSize="9.5" fontFamily="var(--font-mono)">{n.t}</text>
        </g>
      ))}
    </g>
  );
}

function Thermal() {
  const cells = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      const heat = Math.round(((Math.sin(r * 1.3 + c * 0.7) + 1) / 2) * 100) / 100;
      cells.push(
        <rect key={`${r}-${c}`} x={40 + c * 42} y={30 + r * 42} width="36" height="36" rx="6" fill={heat > 0.55 ? M : P} opacity={(heat > 0.55 ? 10 + heat * 15 : 12 + (1 - heat) * 30).toFixed(0) + "%"} />,
      );
    }
  }
  return (
    <g>
      {cells}
      <path d="M58 260 L58 132 L310 132 L310 48" fill="none" stroke={M} strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
      <path d="M58 260 L142 260 L142 174 L226 174 L226 90 L310 90 L310 48" fill="none" stroke={G} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="58" cy="260" r="7" fill={P} />
      <circle cx="310" cy="48" r="7" fill="none" stroke={G} strokeWidth="3" />
    </g>
  );
}
