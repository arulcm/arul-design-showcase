import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Flame, Timer, Zap } from "lucide-react";
import { useRef } from "react";
import { habitScreens } from "@/lib/projects";
import { PhoneMockup } from "./PhoneMockup";

/** Abstract orb + real Focus Mode screenshot + floating UI fragments, with pointer parallax. */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const orbX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const orbY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const chipX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const chipY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const focus = habitScreens[1];

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[520px] [perspective:1200px]"
    >
      {/* abstract orb */}
      <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-[8%]" aria-hidden>
        <div className="absolute inset-0 rounded-full bg-radial-lime blur-2xl" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
          <defs>
            <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="var(--color-primary-glow)" />
              <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ring)" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--color-border)" strokeDasharray="2 8" />
          <circle cx="200" cy="10" r="5" fill="var(--color-primary)" />
        </svg>
      </motion.div>

      {/* phone */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, y: 60, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
      >
        <PhoneMockup shot={focus} eager />
      </motion.div>

      {/* floating fragments (decorative, not screenshots) */}
      <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="glass float-slow absolute left-0 top-[16%] flex items-center gap-3 rounded-2xl px-4 py-3"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold">+30 XP</p>
            <p className="text-xs text-muted-foreground">Session complete</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="glass float-slow absolute right-0 top-[42%] rounded-2xl p-4 [animation-delay:-3s]"
        >
          <p className="eyebrow mb-2 text-[0.6rem]">Consistency</p>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }).map((_, i) => (
              <span
                key={i}
                className="size-3 rounded-[3px] bg-primary"
                style={{ opacity: [0.15, 0.35, 0.6, 1][(i * 7 + (i % 3)) % 4] }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="glass float-slow absolute bottom-[10%] left-[6%] flex items-center gap-4 rounded-2xl px-4 py-3 [animation-delay:-5s]"
        >
          <span className="flex items-center gap-1.5 text-sm">
            <Timer className="size-4 text-primary" /> 45 min
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5 text-sm">
            <Flame className="size-4 text-primary" /> Streak
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
