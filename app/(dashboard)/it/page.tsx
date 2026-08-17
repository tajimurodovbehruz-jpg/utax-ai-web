"use client";

import { Activity, BookOpen, Server } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, toneForLevel } from "@/components/ui";
import { itData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

export default function ItPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("it_title", lang)} subtitle={t("it_subtitle", lang)} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t("it_uptime", lang)} value={`${itData.uptime}%`} delta="30 kun" trend="up" />
        <StatCard label={t("it_open_tickets", lang)} value="3" delta="+1 bugun" trend="down" />
        <StatCard label={t("it_avg_resolution", lang)} value="4.2 soat" delta="-18%" trend="up" />
        <StatCard label={t("it_kb_coverage", lang)} value={`${itData.knowledgeBase.coverage}%`} delta={`${itData.knowledgeBase.articles} maqola`} trend="flat" />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card title={t("it_ticket_board_title", lang)} subtitle={t("it_ticket_board_subtitle", lang)} className="lg:col-span-2">
          <div className="space-y-3">
            {itData.tickets.map((tk) => (
              <div key={tk.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <p className="text-xs font-mono text-muted">{tk.id}</p>
                  <p className="text-sm font-medium text-foreground">{tk.title}</p>
                  <p className="text-xs text-muted">SLA: {tk.sla}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge tone={toneForLevel(tk.priority)}>{tk.priority}</Badge>
                  <Badge tone="neutral">{tk.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t("it_services_title", lang)} subtitle={t("it_services_subtitle", lang)}>
          <ul className="space-y-3">
            {itData.services.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <Server size={14} className="text-muted" />
                  <span className="text-sm text-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">{s.latency}</span>
                  <Badge tone={toneForLevel(s.status)}>{s.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={t("it_analysis_title", lang)} subtitle={t("it_analysis_subtitle", lang)}>
          <div className="flex items-start gap-3 rounded-lg bg-brand-light p-3 text-sm text-foreground">
            <Activity size={16} className="mt-0.5 shrink-0 text-brand" />
            <p>
              Oxirgi 7 kunda IT-2041 kabi 1C bilan bog&apos;liq xatolarning 62% API tайmaut sababli. Tavsiya: retry
              siyosati 3 martaga oshirilsin va timeout 15s dan 25s ga ko&apos;tarilsin.
            </p>
          </div>
        </Card>
        <Card title={t("it_kb_title", lang)} subtitle={t("it_kb_subtitle", lang)}>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <BookOpen size={18} className="text-brand" />
            <div>
              <p className="text-sm font-medium text-foreground">{itData.knowledgeBase.articles} tasdiqlangan maqola</p>
              <p className="text-xs text-muted">Qamrov {itData.knowledgeBase.coverage}% — 12 ta hujjat versiyasi eskirgan</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
