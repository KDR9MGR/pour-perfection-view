import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

/** Thin gradient loading bar that runs while a route is resolving. */
export function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(false), 420);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (!visible) return null;
  return (
    <div className="route-progress" data-done={!isLoading}>
      <div className="route-progress-bar" />
    </div>
  );
}

/** Re-mounts on every navigation so pages animate in. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

/** Floating "back to top" button that appears after scrolling. */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6 rounded-full border border-border bg-surface px-4 py-3 text-xs font-bold text-primary shadow-lg transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑ Top
    </button>
  );
}
