import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Minus, Plus, QrCode, Ticket, X } from "lucide-react";

type EventLike = {
  name: string;
  venue: string;
  area: string;
  day: string;
  time: string;
  price: string;
};

type Step = "select" | "processing" | "confirmed";

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 9) * 70}ms`,
        duration: `${1200 + ((i * 137) % 700)}ms`,
        rotate: `${(i * 53) % 360}deg`,
      })),
    [],
  );
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--rot" as string]: p.rotate,
          }}
        />
      ))}
    </div>
  );
}

function FakeQr() {
  const cells = useMemo(
    () => Array.from({ length: 144 }).map((_, i) => (i * 2654435761) % 7 > 3),
    [],
  );
  return (
    <div className="qr-grid">
      {cells.map((on, i) => (
        <span key={i} data-on={on} style={{ animationDelay: `${i * 3}ms` }} />
      ))}
    </div>
  );
}

export function BookingDialog({
  event,
  open,
  onClose,
}: {
  event: EventLike;
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("select");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    if (open) {
      setStep("select");
      setGuests(2);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (step !== "processing") return;
    const t = setTimeout(() => setStep("confirmed"), 1600);
    return () => clearTimeout(t);
  }, [step]);

  if (!open) return null;

  const unit = Number(event.price.replace(/[^0-9.]/g, "")) || 0;
  const total = unit * guests;
  const code = `BU-${event.venue.slice(0, 3).toUpperCase()}-${(unit * 7 + guests * 13 + event.name.length)
    .toString()
    .padStart(4, "0")}`;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-panel surface-card" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex items-center gap-2">
          {(["select", "processing", "confirmed"] as Step[]).map((s, i) => {
            const order = { select: 0, processing: 1, confirmed: 2 };
            const active = order[step] >= i;
            return (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  active ? "bg-[image:var(--gradient-primary)]" : "bg-secondary"
                }`}
              />
            );
          })}
        </div>

        {step === "select" && (
          <div className="page-enter">
            <p className="eyebrow">Booking</p>
            <h3 className="mt-2 text-2xl font-extrabold">{event.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.venue} — {event.area} · {event.day} {event.time}
            </p>

            <div className="mt-7 flex items-center justify-between rounded-2xl border border-border bg-surface-2 p-4">
              <div>
                <p className="text-sm font-bold">Guests</p>
                <p className="text-xs text-muted-foreground">{event.price} per guest</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="rounded-full border border-border p-2 transition-transform hover:scale-110"
                  aria-label="Fewer guests"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-xl font-extrabold">{guests}</span>
                <button
                  onClick={() => setGuests((g) => Math.min(15, g + 1))}
                  className="rounded-full border border-border p-2 transition-transform hover:scale-110"
                  aria-label="More guests"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-1 text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-extrabold text-primary">${total}</span>
            </div>

            <button
              onClick={() => setStep("processing")}
              className="btn-primary mt-6 w-full rounded-full py-4 text-sm font-bold"
            >
              Confirm booking
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Instant confirmation · Digital ticket with QR entry
            </p>
          </div>
        )}

        {step === "processing" && (
          <div className="page-enter py-12 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="mt-5 text-lg font-bold">Securing your spot…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Holding {guests} {guests === 1 ? "spot" : "spots"} at {event.venue}
            </p>
          </div>
        )}

        {step === "confirmed" && (
          <div className="page-enter relative">
            <Confetti />
            <div className="text-center">
              <div className="pop-in mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-2xl font-extrabold">You're on the list</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Confirmation sent. Show this at the door.
              </p>
            </div>

            <div className="ticket mt-6">
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Ticket className="h-3.5 w-3.5" /> Digital Ticket
                  </p>
                  <p className="mt-2 font-display text-lg font-extrabold leading-tight">
                    {event.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.venue} · {event.day} {event.time}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {guests} guests · ${total} · {code}
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-foreground p-2">
                  <FakeQr />
                </div>
              </div>
              <div className="ticket-perf" />
              <div className="flex items-center justify-between px-5 py-3 text-[11px] font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <QrCode className="h-3.5 w-3.5 text-primary" /> Scan at entry
                </span>
                <span>Skip the line</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-ghost mt-6 w-full rounded-full py-3.5 text-sm font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
