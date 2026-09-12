import type { ReactNode } from "react";
import {
  Activity,
  Compass,
  Crown,
  Map,
  Shield,
  Ticket,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Aurora } from "./Ambience";

const icons: Record<string, typeof Crown> = {
  crown: Crown,
  ticket: Ticket,
  compass: Compass,
  map: Map,
  users: Users,
  activity: Activity,
  shield: Shield,
  zap: Zap,
  wallet: Wallet,
};

export function FeatureIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Crown;
  return <Icon className={className} />;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`surface-card p-6 transition-colors hover:border-primary/40 ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  sub,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
}) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border">
      <Aurora />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[2.2rem] font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
          {title} <span className="text-gradient">{highlight}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}
