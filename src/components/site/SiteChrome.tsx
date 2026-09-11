import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, BottleMark } from "./Logo";

const navLinks = [
  { to: "/features", label: "Features" },
  { to: "/events", label: "Events" },
  { to: "/vip-tables", label: "VIP Tables" },
  { to: "/venues", label: "Venues" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/partners", label: "Partners" },
  { to: "/app", label: "App Preview" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/signin"
            search={{ role: "promoter" }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Promoter Login
          </Link>
          <Link
            to="/partners"
            className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Be Partner
          </Link>
          <Link to="/signin" className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold">
            Sign In
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 rounded-full px-5 py-3 text-center text-sm font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <BottleMark className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-extrabold text-primary">BottlesUp</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Toronto's premier nightlife app. VIP bookings, digital tickets and exclusive access.
          </p>
        </div>

        <FooterCol
          title="Product"
          links={[
            { to: "/features", label: "Features" },
            { to: "/events", label: "Events" },
            { to: "/vip-tables", label: "VIP Tables" },
            { to: "/app", label: "App Preview" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/venues", label: "Venues" },
            { to: "/partners", label: "Partners" },
            { to: "/how-it-works", label: "How It Works" },
          ]}
        />
        <FooterCol
          title="Access"
          links={[
            { to: "/signin", label: "Sign In" },
            { to: "/partners", label: "Be Partner" },
          ]}
        />
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BottlesUp. Toronto, Canada. Coming soon.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
