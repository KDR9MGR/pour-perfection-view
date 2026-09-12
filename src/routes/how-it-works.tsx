import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, PageHero } from "../components/site/Bits";
import { Reveal } from "../components/site/Motion";
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
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
            <Card className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 p-5 sm:p-6 md:flex md:items-center md:gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 font-display text-xl font-extrabold text-primary md:h-14 md:w-14 md:text-2xl">
                {s.n}
              </div>
              <div>
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Card>
            </Reveal>
          ))}
          <div className="pt-6 text-center">
            <Link
              to="/signin"
              className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold sm:w-auto"
            >
              Join Early Access <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
