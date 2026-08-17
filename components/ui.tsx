import { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={clsx("rounded-xl border border-border bg-surface p-5 shadow-sm", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <p className="text-xs font-medium text-muted">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {delta && (
          <span
            className={clsx(
              "text-xs font-semibold",
              trend === "up" && "text-success",
              trend === "down" && "text-danger",
              trend === "flat" && "text-muted"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

const badgeTones: Record<string, string> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  neutral: "bg-surface-alt text-muted border border-border",
  brand: "bg-brand-light text-brand",
};

export type BadgeTone = keyof typeof badgeTones;

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", badgeTones[tone])}>
      {children}
    </span>
  );
}

export function toneForLevel(level: string): keyof typeof badgeTones {
  const l = level.toLowerCase();
  if (["yuqori", "kritik", "high", "critical", "bloklangan", "ogohlantirish", "warning"].some((s) => l.includes(s)))
    return "danger";
  if (["o'rta", "orta", "medium", "jarayonda", "navbatda"].some((s) => l.includes(s))) return "warning";
  if (["past", "low", "sog'lom", "faol", "yopilgan", "bajarildi", "tayyor"].some((s) => l.includes(s))) return "success";
  return "neutral";
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
