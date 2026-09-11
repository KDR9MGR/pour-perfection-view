import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Pill } from "../components/site/Bits";
import { perks } from "../lib/site-data";

type SignInSearch = { role?: "promoter" };

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): SignInSearch =>
    search["role"] === "promoter" ? { role: "promoter" } : {},

  head: () => ({
    meta: [
      { title: "Sign In & Early Access — BottlesUp Toronto" },
      {
        name: "description",
        content:
          "Join the VIP list for Toronto's hottest nightlife app, or log in as a promoter partner.",
      },
      { property: "og:title", content: "Sign In — BottlesUp" },
      {
        property: "og:description",
        content: "Early access, VIP perks and promoter login for BottlesUp Toronto.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const { role } = Route.useSearch();
  const promoter = role === "promoter";

  return (
    <section className="hero-glow py-14 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{promoter ? "Promoter Login" : "Early Access"}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-5xl">
            {promoter ? "Welcome back," : "Join the VIP List for"}{" "}
            <span className="text-gradient">
              {promoter ? "promoter" : "Toronto's Hottest App"}
            </span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            {promoter
              ? "Manage guest lists, tables and digital ticket sales for your Toronto events."
              : "Be among the first to experience exclusive VIP table bookings, digital event tickets, and insider access to Toronto's premier nightlife venues."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Pill>Early access</Pill>
            <Pill>No spam</Pill>
            <Pill>VIP perks</Pill>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {perks.map((p) => (
              <div key={p.label} className="surface-card p-4">
                <div className="text-xl">{p.emoji}</div>
                <p className="mt-2 text-xs font-semibold">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            {promoter && (
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            )}
            <button type="submit" className="btn-primary w-full rounded-xl py-3.5 text-sm font-bold">
              {promoter ? "Log In" : "Join VIP List"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            🔒 Your email is secure and will never be shared. Toronto locals only.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {promoter ? (
              <Link to="/signin" className="font-semibold text-primary hover:underline">
                Back to early access
              </Link>
            ) : (
              <Link
                to="/signin"
                search={{ role: "promoter" }}
                className="font-semibold text-primary hover:underline"
              >
                Promoter login
              </Link>
            )}
          </p>
        </Card>
      </div>
    </section>
  );
}
