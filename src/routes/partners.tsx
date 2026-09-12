import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { Card, PageHero } from "../components/site/Bits";
import { Reveal } from "../components/site/Motion";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — List Your Venue on BottlesUp Toronto" },
      {
        name: "description",
        content:
          "Partner with BottlesUp to fill tables, sell digital tickets and reach Toronto's nightlife crowd.",
      },
      { property: "og:title", content: "Partners — BottlesUp" },
      {
        property: "og:description",
        content: "Venue and promoter partnerships for Toronto nightlife.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const benefits = [
  "Fill tables on slow nights with verified bookings",
  "Sell digital tickets with QR code entry",
  "Live capacity and wait time controls",
  "Partner verification badge on your listing",
  "Instant payouts and digital receipts",
  "Promoter tools for guest lists and comps",
];

function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Put your venue in front of"
        highlight="Toronto's night crowd"
        sub="Bank-level security for all transactions. Partner verification ensures guests are booking with legitimate venues."
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:gap-10">
          <Reveal>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Why partner with us</h2>
            <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-1">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          <Reveal delay={100}>
          <Card className="p-5 sm:p-6">
            <h2 className="text-xl font-bold">Become a partner</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your venue and we'll be in touch.
            </p>
            {submitted ? (
              <div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-5 text-center" role="status">
                <CheckCircle2 className="mx-auto h-9 w-9 text-success" />
                <p className="mt-3 font-bold">Thanks for reaching out</p>
                <p className="mt-1 text-sm text-muted-foreground">Your partner interest has been received.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold text-primary">
                  Send another enquiry
                </button>
              </div>
            ) : (
            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              {["Venue name", "Contact name", "Email", "Neighbourhood"].map((p) => (
                <input
                  key={p}
                  placeholder={p}
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none placeholder:text-muted-foreground focus:border-primary sm:text-sm"
                />
              ))}
              <button type="submit" className="btn-primary w-full rounded-xl py-3 text-sm font-bold">
                Be Partner
              </button>
            </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Already a promoter?{" "}
              <Link to="/signin" className="font-semibold text-primary hover:underline">
                Promoter login
              </Link>
            </p>
          </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
