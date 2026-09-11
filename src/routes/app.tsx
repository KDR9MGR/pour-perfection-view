import { createFileRoute } from "@tanstack/react-router";
import { QrCode, Crown, MapPin, Star, Users } from "lucide-react";
import { PageHero, SectionHeading } from "../components/site/Bits";
import { PhoneFrame } from "../components/site/PhoneFrame";
import { events, tables } from "../lib/site-data";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "App Preview — Inside the BottlesUp App" },
      {
        name: "description",
        content:
          "A look inside BottlesUp: event feed, event details, VIP table booking, digital tickets and your profile.",
      },
      { property: "og:title", content: "App Preview — BottlesUp" },
      {
        property: "og:description",
        content: "See the BottlesUp app screens before launch.",
      },
    ],
  }),
  component: AppPreview,
});

function AppPreview() {
  return (
    <>
      <PageHero
        eyebrow="See Preview"
        title="Your night out,"
        highlight="screen by screen"
        sub="Discover, book, pay and walk in. Here's how the BottlesUp app works from first tap to QR entry."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            <PhoneFrame label="Discover — tonight's feed" activeTab="Home">
              <FeedScreen />
            </PhoneFrame>
            <PhoneFrame label="Event details" activeTab="Events">
              <EventScreen />
            </PhoneFrame>
            <PhoneFrame label="VIP table booking" activeTab="Tables">
              <TableScreen />
            </PhoneFrame>
            <PhoneFrame label="Digital ticket" activeTab="Tickets">
              <TicketScreen />
            </PhoneFrame>
            <PhoneFrame label="Group split" activeTab="Tables">
              <SplitScreen />
            </PhoneFrame>
            <PhoneFrame label="Profile & perks" activeTab="Profile">
              <ProfileScreen />
            </PhoneFrame>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Real-Time Updates"
            title="Live capacity,"
            highlight="live decisions"
            sub="Live venue capacity, wait times, and event updates. Make informed decisions about where to go next."
          />
        </div>
      </section>
    </>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-surface p-3">{children}</div>;
}

function FeedScreen() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" /> Toronto · Tonight
      </div>
      {events.slice(0, 4).map((e) => (
        <Row key={e.name}>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-[image:var(--gradient-primary)] opacity-80" />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">{e.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {e.venue} · {e.day} {e.time}
              </p>
            </div>
            <span className="ml-auto text-[11px] font-bold text-primary">{e.price}</span>
          </div>
        </Row>
      ))}
    </div>
  );
}

function EventScreen() {
  return (
    <div className="space-y-3">
      <div className="h-28 rounded-2xl bg-[image:var(--gradient-primary)] opacity-75" />
      <h4 className="text-sm font-bold">Saturday Nights at Rebel</h4>
      <p className="text-[11px] text-muted-foreground">Polson Pier · Sat 10:00 PM · 19+</p>
      <div className="flex gap-2">
        <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold text-primary">
          Trending
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
          Selling fast
        </span>
      </div>
      <Row>
        <p className="text-[11px] font-bold">Live capacity</p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
          <div className="h-1.5 w-3/4 rounded-full bg-[image:var(--gradient-primary)]" />
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">75% full · ~10 min wait</p>
      </Row>
      <button className="btn-primary w-full rounded-lg py-2.5 text-xs font-bold">
        Get Tickets · $40
      </button>
    </div>
  );
}

function TableScreen() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Choose your table
      </p>
      {tables.map((t, i) => (
        <Row key={t.tier}>
          <div className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold">
                {i === 2 && <Crown className="h-3 w-3 text-primary" />}
                {t.tier}
              </p>
              <p className="text-[11px] text-muted-foreground">{t.guests}</p>
            </div>
            <span className="text-[11px] font-bold text-primary">{t.min}</span>
          </div>
        </Row>
      ))}
      <button className="btn-primary w-full rounded-lg py-2.5 text-xs font-bold">
        Request Table
      </button>
      <p className="text-center text-[10px] text-muted-foreground">
        Instant confirmation · Pay deposit or at venue
      </p>
    </div>
  );
}

function TicketScreen() {
  return (
    <div className="space-y-3">
      <Row>
        <div className="flex flex-col items-center py-2">
          <QrCode className="h-24 w-24 text-foreground" />
          <p className="mt-3 text-xs font-bold">Rooftop Sessions</p>
          <p className="text-[11px] text-muted-foreground">Lavelle · Sun 8:00 PM</p>
        </div>
      </Row>
      <Row>
        <div className="flex justify-between text-[11px]">
          <span className="text-muted-foreground">Order</span>
          <span className="font-semibold">#BU-40219</span>
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-muted-foreground">Guests</span>
          <span className="font-semibold">2</span>
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-muted-foreground">Status</span>
          <span className="font-semibold text-primary">Confirmed</span>
        </div>
      </Row>
    </div>
  );
}

function SplitScreen() {
  const people = ["Amara", "Jay", "Nina", "Deep"];
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Split the table
      </p>
      <Row>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Premium Table · Cube</p>
          <span className="text-[11px] font-bold text-primary">$1,200</span>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">Sat 10:00 PM · 8 guests</p>
      </Row>
      {people.map((p) => (
        <Row key={p}>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/12 text-[10px] font-bold text-primary">
              {p[0]}
            </div>
            <p className="text-xs font-semibold">{p}</p>
            <span className="ml-auto text-[11px] text-muted-foreground">$300 · paid</span>
          </div>
        </Row>
      ))}
      <button className="btn-primary w-full rounded-lg py-2.5 text-xs font-bold">
        Send Reminder
      </button>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 font-bold text-primary">
          A
        </div>
        <div>
          <p className="text-sm font-bold">Amara K.</p>
          <p className="flex items-center gap-1 text-[11px] text-primary">
            <Star className="h-3 w-3 fill-current" /> VIP member
          </p>
        </div>
      </div>
      <Row>
        <p className="text-[11px] font-bold">Your perks</p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Priority access · Table discounts · Exclusive events
        </p>
      </Row>
      <Row>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <p className="text-[11px]">Your crew · 6 friends</p>
        </div>
      </Row>
      <Row>
        <p className="text-[11px] font-bold">Upcoming</p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Rooftop Sessions · Sun 8:00 PM · Lavelle
        </p>
      </Row>
    </div>
  );
}
