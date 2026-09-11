import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, BottleMark } from "./Logo";
import { Magnetic } from "./Ambience";

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
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-colors ${
        scrolled ? "border-border shadow-[var(--shadow-card)]" : "border-border/40"
      }`}
    >
      <div
        className={`header-shrink mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
            className="nav-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Promoter Login
          </Link>
          <Link
            to="/partners"
            className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Be Partner
          </Link>
          <Magnetic>
            <Link to="/signin" className="btn-primary block rounded-full px-5 py-2.5 text-sm font-bold">
              Sign In
            </Link>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <span className="scroll-bar" style={{ width: `${progress}%` }} aria-hidden />

      {open && (
        <div className="sheet max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="sheet-item flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-muted-foreground transition-colors active:bg-secondary active:text-foreground"
                activeProps={{ className: "text-primary bg-secondary/60" }}
              >
                {l.label}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/partners"
                onClick={() => setOpen(false)}
                className="btn-ghost rounded-full px-5 py-3.5 text-center text-sm font-semibold"
              >
                Be Partner
              </Link>
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="btn-primary rounded-full px-5 py-3.5 text-center text-sm font-bold"
              >
                Sign In
              </Link>
            </div>
            <Link
              to="/signin"
              search={{ role: "promoter" }}
              onClick={() => setOpen(false)}
              className="mt-3 pb-1 text-center text-sm text-muted-foreground"
            >
              Promoter Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/** Sticky bottom action bar for phones. */
export function MobileActionBar() {
  return (
    <div className="mobile-bar safe-b px-4 pt-3 lg:hidden">
      <div className="flex items-center gap-2">
        <Link
          to="/app"
          className="btn-ghost flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold"
        >
          See Preview
        </Link>
        <Link
          to="/signin"
          className="btn-primary flex-[1.3] rounded-full px-4 py-3 text-center text-sm font-bold"
        >
          Join Early Access
        </Link>
      </div>
    </div>
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
