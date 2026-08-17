"use client";

import { AlertCircle, Clock, CalendarDays, CalendarRange } from "lucide-react";
import { PageHeader, Card, StatCard } from "@/components/ui";
import { calendarData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

function DeadlineRow({ client, taxType, dueDate, note }: { client: string; taxType: string; dueDate: string; note?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{client}</p>
        <p className="text-xs text-muted">{taxType}</p>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm font-medium text-foreground">{dueDate}</span>
        {note && <span className="text-[11px] text-danger">{note}</span>}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("calendar_title", lang)} subtitle={t("calendar_subtitle", lang)} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t("calendar_stat_total", lang)} value={String(calendarData.stats.total)} />
        <StatCard label={t("calendar_stat_overdue", lang)} value={String(calendarData.stats.overdue)} />
        <StatCard label={t("calendar_stat_today", lang)} value={String(calendarData.stats.dueToday)} />
        <StatCard label={t("calendar_stat_week", lang)} value={String(calendarData.stats.dueThisWeek)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title={
            <span className="flex items-center gap-1.5 text-danger">
              <AlertCircle size={14} /> {t("calendar_group_overdue", lang)}
            </span>
          }
        >
          {calendarData.overdue.length === 0 ? (
            <p className="text-sm text-muted">—</p>
          ) : (
            calendarData.overdue.map((d) => (
              <DeadlineRow
                key={d.client + d.taxType}
                client={d.client}
                taxType={d.taxType}
                dueDate={d.dueDate}
                note={`${d.daysLate} ${t("calendar_days_late", lang)}`}
              />
            ))
          )}
        </Card>

        <Card
          title={
            <span className="flex items-center gap-1.5 text-warning">
              <Clock size={14} /> {t("calendar_group_today", lang)}
            </span>
          }
        >
          {calendarData.today.map((d) => (
            <DeadlineRow key={d.client + d.taxType} client={d.client} taxType={d.taxType} dueDate={d.dueDate} />
          ))}
        </Card>

        <Card
          title={
            <span className="flex items-center gap-1.5 text-brand">
              <CalendarDays size={14} /> {t("calendar_group_week", lang)}
            </span>
          }
        >
          {calendarData.thisWeek.map((d) => (
            <DeadlineRow key={d.client + d.taxType} client={d.client} taxType={d.taxType} dueDate={d.dueDate} />
          ))}
        </Card>

        <Card
          title={
            <span className="flex items-center gap-1.5 text-muted">
              <CalendarRange size={14} /> {t("calendar_group_upcoming", lang)}
            </span>
          }
        >
          {calendarData.upcoming.map((d) => (
            <DeadlineRow key={d.client + d.taxType} client={d.client} taxType={d.taxType} dueDate={d.dueDate} />
          ))}
        </Card>
      </div>
    </div>
  );
}
