import type { ReactNode } from "react";
import { Bell, Calendar, Crown, Home, Ticket, User, Wifi } from "lucide-react";
import { BottleMark } from "./Logo";

export function PhoneFrame({
  children,
  label,
  activeTab = "Home",
}: {
  children: ReactNode;
  label?: string;
  activeTab?: "Home" | "Events" | "Tables" | "Tickets" | "Profile";
}) {
  const tabs = [
    { name: "Home", icon: Home },
    { name: "Events", icon: Calendar },
    { name: "Tables", icon: Crown },
    { name: "Tickets", icon: Ticket },
    { name: "Profile", icon: User },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="relative rounded-[2.5rem] border border-border bg-surface-2 p-2.5 shadow-[var(--shadow-card)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-surface-2" />
          <div className="flex items-center justify-between px-5 pb-2 pt-3 text-[11px] font-semibold text-muted-foreground">
            <span>9:41</span>
            <Wifi className="h-3.5 w-3.5" />
          </div>

          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-1.5">
              <BottleMark className="h-4 w-4 text-primary" />
              <span className="text-sm font-extrabold text-primary">BottlesUp</span>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="h-[430px] overflow-hidden px-4">{children}</div>

          <div className="mt-2 flex items-center justify-between border-t border-border px-4 py-3">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = t.name === activeTab;
              return (
                <div
                  key={t.name}
                  className={`flex flex-col items-center gap-1 ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[9px] font-medium">{t.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {label && (
        <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">{label}</p>
      )}
    </div>
  );
}
