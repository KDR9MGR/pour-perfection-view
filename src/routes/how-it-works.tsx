import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, PageHero } from "../components/site/Bits";
import { steps } from "../lib/site-data";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Book a Night Out in 4 Steps | BottlesUp" },
      {
        name: "description",
        content:
          "Discover, select, book and enjoy. Getting started with BottlesUp takes four easy steps.",
      },
      { property: "og:title", content: "How It Works — BottlesUp" },
      {
        property: "og:description",
        content: "Discover, select, book and enjoy — a better night out in four steps.",
      },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="A Better Night Out,"
        highlight="In 4 Steps"
        sub="Getting started with BottlesUp is simple. Follow these four easy steps to book your next unforgettable night out."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-5">
          {steps.map((s) => (
            <Card key={s.n} className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/12 font-display text-2xl font-extrabold text-primary">
                {s.n}
              </div>
              <div>
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Card>
          ))}
          <div className="pt-6 text-center">
            <Link
              to="/signin"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold"
            >
              Join Early Access <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
