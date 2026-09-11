import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card, PageHero } from "../components/site/Bits";

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
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Put your venue in front of"
        highlight="Toronto's night crowd"
        sub="Bank-level security for all transactions. Partner verification ensures guests are booking with legitimate venues."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">Why partner with us</h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <h2 className="text-xl font-bold">Become a partner</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your venue and we'll be in touch.
            </p>
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              {["Venue name", "Contact name", "Email", "Neighbourhood"].map((p) => (
                <input
                  key={p}
                  placeholder={p}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              ))}
              <button type="submit" className="btn-primary w-full rounded-xl py-3 text-sm font-bold">
                Be Partner
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              Already a promoter?{" "}
              <Link to="/signin" className="font-semibold text-primary hover:underline">
                Promoter login
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
