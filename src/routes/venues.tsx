import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Card, PageHero } from "../components/site/Bits";
import { Reveal } from "../components/site/Motion";
import { venueAreas } from "../lib/site-data";

export const Route = createFileRoute("/venues")({
  head: () => ({
    meta: [
      { title: "Venues — Toronto Nightlife Hotspots | BottlesUp" },
      {
        name: "description",
        content:
          "Entertainment District, King Street, Queen West — connections to Toronto's premier nightlife destinations.",
      },
      { property: "og:title", content: "Venues — BottlesUp Toronto" },
      {
        property: "og:description",
        content: "50+ partner venues across Toronto's best nightlife neighbourhoods.",
      },
    ],
  }),
  component: VenuesPage,
});

function VenuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Toronto Hotspots"
        title="50+ partner venues,"
        highlight="one app"
        sub="Entertainment District, King Street, Queen West - we've got connections to the city's premier nightlife destinations."
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2">
          {venueAreas.map((v, i) => (
            <Reveal key={v.area} delay={(i % 2) * 90} className="h-full">
            <Card className="group h-full p-5 sm:p-6">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Toronto</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold">{v.area}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.note}</p>
              <Link
                to="/events"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline"
              >
                See what's on →
              </Link>
            </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
