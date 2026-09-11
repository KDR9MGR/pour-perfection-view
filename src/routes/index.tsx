import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, MapPin, Play, Star, Users, CalendarDays } from "lucide-react";
import { Card, FeatureIcon, Pill, SectionHeading } from "../components/site/Bits";
import { PhoneFrame } from "../components/site/PhoneFrame";
import { Counter, Marquee, Reveal, Tilt } from "../components/site/Motion";
import { BookingDialog } from "../components/site/BookingFlow";
import { Aurora, Magnetic, WeekendCountdown, WordReveal } from "../components/site/Ambience";
import { events, features, perks, steps } from "../lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BottlesUp — Toronto's Premier Nightlife App" },
      {
        name: "description",
        content:
          "Skip the lines, secure your table, and experience Toronto's hottest venues with BottlesUp.",
      },
      { property: "og:title", content: "BottlesUp — Toronto's Premier Nightlife App" },
      {
        property: "og:description",
        content:
          "Skip the lines, secure your table, and experience Toronto's hottest venues with BottlesUp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="hero-glow relative overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:py-10 sm:py-16 md:py-24 lg:grid-cols-2">
          <div>
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-border bg-surface px-4 py-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <MapPin className="h-3.5 w-3.5" /> Toronto
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </div>

            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">
              <WordReveal text="Toronto's Premier" />
              <br />
              <WordReveal text="Nightlife App" wordClassName="text-gradient" delay={220} />
            </h1>

            <p className="mt-4 text-lg font-bold text-primary sm:text-xl">
              VIP Bookings • Digital Tickets • Exclusive Access
            </p>


            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              Skip the lines, secure your table, and experience Toronto's hottest venues with
              BottlesUp. From King Street to Entertainment District - your night out, elevated.
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <Magnetic className="w-full sm:w-auto">
                <Link
                  to="/signin"
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold sm:inline-flex sm:w-auto"
                >
                  Join Early Access <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <Link
                  to="/app"
                  className="btn-ghost flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold sm:inline-flex sm:w-auto"
                >
                  <Play className="h-4 w-4" /> See Preview
                </Link>
              </Magnetic>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Next big night starts in
              </p>
              <WeekendCountdown />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>
                <Users className="h-3.5 w-3.5 text-primary" />
                <Counter to={500} suffix="+" /> Early Users
              </Pill>
              <Pill>
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                <Counter to={50} suffix="+" /> Partner Venues
              </Pill>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-2 -top-2 z-10 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold">
              <span className="live-dot mr-2 inline-block h-2 w-2 rounded-full bg-primary" /> Live
            </div>
            <div className="absolute -bottom-2 -left-2 z-10 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold">
              <span className="live-dot mr-2 inline-block h-2 w-2 rounded-full bg-success" />{" "}
              Available
            </div>
            <div className="float-slow">
              <PhoneFrame>
                <HomeScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Rebel · Polson Pier",
          "Lost & Found · King West",
          "Lavelle Rooftop",
          "Coda · Annex",
          "Cube · Entertainment District",
          "The Everleigh · Queen West",
        ]}
      />


      {/* WHY */}
      <section className="border-t border-border py-14 sm:py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Why BottlesUp"
            title="Revolutionizing"
            highlight="Toronto Nightlife"
            sub="From Entertainment District to King Street West, BottlesUp connects you to the city's most exclusive venues and events. Experience Toronto nightlife like never before."
          />

          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90}>
                <Card className="group h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                    <FeatureIcon name={f.icon} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="surface-card mt-12 flex flex-col items-center justify-between gap-5 p-8 md:flex-row">
            <p className="text-lg font-bold">
              Ready to elevate your Toronto nightlife experience?
            </p>
            <Link
              to="/signin"
              className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold"
            >
              Join the Revolution <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="border-t border-border bg-surface py-14 sm:py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Trending Events"
            title="What's"
            highlight="Hot Right Now"
            sub="Don't miss out on the hottest events in your city. Book now before they sell out!"
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe to browse →
          </p>
          <div className="rail mt-4 sm:mt-6 md:mt-14 md:gap-5">
            {events.slice(0, 6).map((e, i) => (
              <Reveal key={e.name} delay={(i % 3) * 90}>
                <EventCard {...e} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/events"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              See all events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border py-14 sm:py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="How It Works"
            title="A Better Night Out,"
            highlight="In 4 Steps"
            sub="Getting started with BottlesUp is simple. Follow these four easy steps to book your next unforgettable night out."
          />
          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <Card className="group h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 font-display text-lg font-extrabold text-primary transition-transform duration-300 group-hover:scale-110">
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIP LIST */}
      <section className="hero-glow border-t border-border py-14 sm:py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Join the VIP List for <span className="text-gradient">Toronto's Hottest App</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Be among the first to experience exclusive VIP table bookings, digital event tickets,
            and insider access to Toronto's premier nightlife venues.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Pill>Early access</Pill>
            <Pill>No spam</Pill>
            <Pill>VIP perks</Pill>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {perks.map((p) => (
              <div key={p.label} className="surface-card p-5">
                <div className="text-2xl">{p.emoji}</div>
                <p className="mt-2 text-sm font-semibold">{p.label}</p>
              </div>
            ))}
          </div>

          <VipForm />
        </div>
      </section>
    </>
  );
}

export function EventCard(event: (typeof events)[number]) {
  const { name, venue, area, day, time, tag, price } = event;
  const [open, setOpen] = useState(false);
  const spotsLeft = 6 + (name.length % 9);

  return (
    <>
      <Tilt>
        <Card className="group flex flex-col">
          <div className="relative h-36 overflow-hidden rounded-xl bg-[image:var(--gradient-primary)] opacity-90">
            <div className="absolute inset-0 bg-background/55 transition-colors duration-500 group-hover:bg-background/35" />
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-bold text-primary">
              {tag}
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
              {spotsLeft} spots left
            </span>
            <span className="absolute bottom-3 left-3 font-display text-2xl font-extrabold transition-transform duration-500 group-hover:translate-x-1">
              {day} · {time}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {venue} — {area}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-700 group-hover:brightness-110"
              style={{ width: `${100 - spotsLeft * 5}%` }}
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-bold text-primary">From {price}</span>
            <button
              onClick={() => setOpen(true)}
              className="btn-primary rounded-full px-4 py-2 text-xs font-bold"
            >
              Book Now
            </button>
          </div>
        </Card>
      </Tilt>
      <BookingDialog event={event} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function HomeScreen() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Upcoming Event
      </p>
      <div className="rounded-2xl border border-border bg-surface p-3">
        <div className="h-20 rounded-xl bg-[image:var(--gradient-primary)] opacity-70" />
        <h4 className="mt-3 text-sm font-bold">Trending This Week</h4>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Toronto's hottest venues, every night.
        </p>
        <button className="btn-primary mt-3 w-full rounded-lg py-2 text-xs font-bold">
          Book Now
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface py-3 text-center">
          <p className="text-sm font-bold text-primary">VIP</p>
          <p className="text-[11px] text-muted-foreground">Tables</p>
        </div>
        <div className="rounded-xl border border-border bg-surface py-3 text-center">
          <p className="text-sm font-bold text-primary">Digital</p>
          <p className="text-[11px] text-muted-foreground">Tickets</p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-surface p-3">
        <p className="text-[11px] font-bold">Tonight near you</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          6 venues live · King West · Entertainment District
        </p>
      </div>
    </div>
  );
}

function VipForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [email, setEmail] = useState("");

  if (state === "done") {
    return (
      <div className="surface-card pop-in mt-10 flex flex-col items-center gap-3 p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="h-6 w-6" />
        </div>
        <p className="text-lg font-bold">You're on the VIP list</p>
        <p className="text-sm text-muted-foreground">
          We'll email {email} the moment early access opens in Toronto.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setEmail("");
          }}
          className="btn-ghost mt-2 rounded-full px-5 py-2.5 text-xs font-semibold"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <>
      <form
        className="surface-card mt-10 flex flex-col gap-3 p-4 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setState("sending");
          setTimeout(() => setState("done"), 1100);
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-full border border-input bg-background px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary shrink-0 rounded-full px-7 py-3.5 text-sm font-bold disabled:opacity-70"
        >
          {state === "sending" ? "Adding you…" : "Join VIP List"}
        </button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground">
        🔒 Your email is secure and will never be shared. Toronto locals only.
      </p>
    </>
  );
}
