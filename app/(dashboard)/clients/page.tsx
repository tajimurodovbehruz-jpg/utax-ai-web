"use client";

import { PageHeader, Card, StatCard, Badge, toneForLevel } from "@/components/ui";
import { clientsData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

export default function ClientsPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("clients_title", lang)} subtitle={t("clients_subtitle", lang)} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label={t("clients_stat_total", lang)} value={String(clientsData.stats.total)} />
        <StatCard label={t("clients_stat_high_risk", lang)} value={String(clientsData.stats.highRisk)} />
        <StatCard label={t("clients_stat_active", lang)} value={String(clientsData.stats.activeContracts)} />
      </div>

      <Card title={t("clients_table_title", lang)} subtitle={t("clients_table_subtitle", lang)}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 font-medium">{t("col_client", lang)}</th>
                <th className="pb-2 font-medium">{t("col_segment", lang)}</th>
                <th className="pb-2 font-medium">{t("col_risk", lang)}</th>
                <th className="pb-2 font-medium">{t("col_services", lang)}</th>
                <th className="pb-2 font-medium">{t("col_next_deadline", lang)}</th>
                <th className="pb-2 font-medium">{t("col_status", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.list.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                  <td className="py-2.5 text-muted">{c.segment}</td>
                  <td className="py-2.5">
                    <Badge tone={toneForLevel(c.risk)}>{c.risk}</Badge>
                  </td>
                  <td className="py-2.5 text-muted">{c.services}</td>
                  <td className={`py-2.5 ${c.nextDeadline.includes("kechikkan") ? "text-danger" : "text-muted"}`}>
                    {c.nextDeadline}
                  </td>
                  <td className="py-2.5">
                    <Badge tone={toneForLevel(c.status)}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
