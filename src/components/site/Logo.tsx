import { Link } from "@tanstack/react-router";

export function BottleMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g transform="rotate(-24 16 16)">
        <rect x="14" y="3" width="4" height="6" rx="1" fill="currentColor" opacity="0.9" />
        <path
          d="M13 9c0 2-2.5 3.5-2.5 6.5V26a3 3 0 0 0 3 3h5a3 3 0 0 0 3-3V15.5c0-3-2.5-4.5-2.5-6.5z"
          fill="currentColor"
        />
        <path d="M12 19h8v7a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" fill="currentColor" opacity="0.55" />
      </g>
      <circle cx="26" cy="7" r="1.4" fill="currentColor" opacity="0.7" />
      <circle cx="6" cy="10" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <BottleMark className="h-7 w-7 text-primary" />
      <span
        className={`font-display font-extrabold tracking-tight text-primary ${
          compact ? "text-base" : "text-xl"
        }`}
      >
        BottlesUp
      </span>
    </Link>
  );
}
