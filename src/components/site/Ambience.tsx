import { useEffect, useRef, useState, type ReactNode } from "react";

/** Slow-moving colored blobs behind a section. */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <span />
      <span />
      <span />
      <i className="beam" />
    </div>
  );
}

/** Soft glow that follows the cursor across the whole page. */
export function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = document.createElement("div");
    el.className = "spotlight";
    el.style.opacity = "0";
    document.body.appendChild(el);
    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      el.style.setProperty("--sx", `${e.clientX}px`);
      el.style.setProperty("--sy", `${e.clientY}px`);
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      el.remove();
    };
  }, []);
  return null;
}

/** Headline that animates in word by word. */
export function WordReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={`word ${wordClassName}`}
          style={{ animationDelay: `${delay + i * 90}ms` }}
        >
          {w}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/** Button/link wrapper that leans towards the cursor. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  return (
    <span
      ref={ref}
      className={`magnetic inline-block ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
    >
      {children}
    </span>
  );
}

const ACTIVITY = [
  { who: "Maya", what: "booked a VIP table at", where: "Rebel · Polson Pier" },
  { who: "Devon", what: "grabbed 4 tickets for", where: "Lost & Found · King West" },
  { who: "Priya", what: "joined the guest list at", where: "Lavelle Rooftop" },
  { who: "Andre", what: "split the bill for", where: "Coda · Annex" },
  { who: "Sam", what: "checked in with a digital ticket at", where: "Cube · Ent. District" },
  { who: "Nina", what: "reserved a booth at", where: "The Everleigh · Queen West" },
];

/** Rotating "someone just booked" social-proof toast. */
export function LiveActivity() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let idx = 0;
    const cycle = () => {
      setShow(true);
      const hide = setTimeout(() => setShow(false), 4200);
      return hide;
    };
    let hide = setTimeout(() => {
      hide = cycle();
    }, 2500);
    const id = setInterval(() => {
      idx = (idx + 1) % ACTIVITY.length;
      setI(idx);
      clearTimeout(hide);
      hide = cycle();
    }, 7000);
    return () => {
      clearInterval(id);
      clearTimeout(hide);
    };
  }, []);

  if (!show) return null;
  const a = ACTIVITY[i]!;

  return (
    <div className="activity-toast pointer-events-none fixed bottom-24 left-4 right-4 z-40 flex items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl sm:bottom-6 sm:right-auto sm:max-w-xs lg:bottom-6">
      <span className="live-dot h-2.5 w-2.5 shrink-0 rounded-full bg-success" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="font-bold text-foreground">{a.who}</span> {a.what}{" "}
        <span className="font-semibold text-primary">{a.where}</span>
      </p>
    </div>
  );
}

/** Live countdown to the coming Friday night. */
export function WeekendCountdown() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const target = () => {
      const now = new Date();
      const t = new Date(now);
      t.setHours(22, 0, 0, 0);
      const diff = (5 - now.getDay() + 7) % 7;
      t.setDate(now.getDate() + diff);
      if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 7);
      return t.getTime();
    };
    const end = target();
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      setLeft({
        d: Math.floor(ms / 86400000),
        h: Math.floor(ms / 3600000) % 24,
        m: Math.floor(ms / 60000) % 60,
        s: Math.floor(ms / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!left) return null;

  const cells = [
    { v: left.d, l: "Days" },
    { v: left.h, l: "Hrs" },
    { v: left.m, l: "Min" },
    { v: left.s, l: "Sec" },
  ];

  return (
    <div className="inline-flex items-center gap-2">
      {cells.map((c) => (
        <div
          key={c.l}
          className="min-w-[3.4rem] rounded-xl border border-border bg-surface/80 px-2 py-2 text-center backdrop-blur-xl"
        >
          <div className="font-display text-lg font-extrabold tabular-nums text-primary">
            {String(c.v).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {c.l}
          </div>
        </div>
      ))}
    </div>
  );
}
