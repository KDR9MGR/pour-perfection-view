import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/Bits";
import { Reveal } from "../components/site/Motion";
import { EventCard } from "./index";
import { events } from "../lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — What's Hot Right Now in Toronto | BottlesUp" },
      {
        name: "description",
        content:
          "Discover curated Toronto events: rooftop parties, club nights and underground shows. Book before they sell out.",
      },
      { property: "og:title", content: "Events — BottlesUp Toronto" },
      {
        property: "og:description",
        content: "Curated Toronto events with digital tickets and QR code entry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trending Events"
        title="What's"
        highlight="Hot Right Now"
        sub="Don't miss out on the hottest events in your city. Book now before they sell out!"
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe to browse →
          </p>
          <div className="rail md:gap-5">
            {events.map((e, i) => (
              <Reveal key={e.name} delay={(i % 3) * 90}>
                <EventCard {...e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Digital Tickets"
            title="QR entry,"
            highlight="zero paper"
            sub="Secure digital tickets for exclusive events, concerts, and parties. QR code entry for seamless venue access."
          />
        </div>
      </section>
    </>
  );
}
