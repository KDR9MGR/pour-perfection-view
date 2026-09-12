import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Card, PageHero, SectionHeading } from "../components/site/Bits";
import { Reveal } from "../components/site/Motion";
import { tables } from "../lib/site-data";

export const Route = createFileRoute("/vip-tables")({
  head: () => ({
    meta: [
      { title: "VIP Tables — Bottle Service in Toronto | BottlesUp" },
      {
        name: "description",
        content:
          "Reserve premium tables at Toronto's hottest clubs and lounges. Skip the line and enjoy VIP treatment all night long.",
      },
      { property: "og:title", content: "VIP Tables — BottlesUp" },
      {
        property: "og:description",
        content: "Premium table bookings at Toronto's hottest clubs and lounges.",
      },
    ],
  }),
  component: TablesPage,
});

function TablesPage() {
  return (
    <>
      <PageHero
        eyebrow="VIP Tables"
        title="Skip the line,"
        highlight="own the room"
        sub="Reserve premium tables at Toronto's hottest clubs and lounges. Skip the line and enjoy VIP treatment all night long."
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe to compare →
          </p>
          <div className="rail md:grid-cols-3 md:gap-5">
            {tables.map((t, i) => (
              <Reveal key={t.tier} delay={i * 90} className="h-full">
              <Card className="flex h-full flex-col p-5 sm:p-6">
                <h2 className="text-xl font-bold">{t.tier}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.guests}</p>
                <p className="mt-6 font-display text-3xl font-extrabold text-gradient">{t.min}</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {[t.perk, "Instant confirmation", "Group cost splitting"].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signin"
                  className="btn-primary mt-6 rounded-full py-3 text-center text-sm font-bold"
                >
                  Request Table
                </Link>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Flexible Payment"
            title="Split it,"
            highlight="deposit it, or pay at venue"
            sub="Multiple payment options including group splitting, deposits, and pay-at-venue arrangements for maximum convenience."
          />
          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="btn-ghost inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:w-auto"
            >
              See how it works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
