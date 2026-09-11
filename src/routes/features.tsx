import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, FeatureIcon, PageHero } from "../components/site/Bits";
import { features } from "../lib/site-data";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — BottlesUp Toronto Nightlife App" },
      {
        name: "description",
        content:
          "VIP table bookings, digital tickets, event discovery, group coordination and real-time venue updates.",
      },
      { property: "og:title", content: "Features — BottlesUp" },
      {
        property: "og:description",
        content: "Everything BottlesUp gives you for a better night out in Toronto.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Why BottlesUp"
        title="Everything you need for"
        highlight="a better night out"
        sub="From Entertainment District to King Street West, BottlesUp connects you to the city's most exclusive venues and events."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <FeatureIcon name={f.icon} />
              </div>
              <h2 className="mt-5 text-lg font-bold">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-5">
          <div className="surface-card flex flex-col items-center justify-between gap-5 p-8 md:flex-row">
            <p className="text-lg font-bold">Ready to elevate your Toronto nightlife experience?</p>
            <Link
              to="/signin"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold"
            >
              Join the Revolution <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
