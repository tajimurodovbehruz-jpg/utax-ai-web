"use client";

import { Globe2 } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, toneForLevel } from "@/components/ui";
import { internationalData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

const maxClients = Math.max(...internationalData.countryExposure.map((c) => c.clients));

export default function InternationalPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("international_title", lang)} subtitle={t("international_subtitle", lang)} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label={t("international_stat_active", lang)} value={String(internationalData.stats.activeCases)} />
        <StatCard label={t("international_stat_countries", lang)} value={String(internationalData.stats.countriesCovered)} />
        <StatCard label={t("international_stat_treaties", lang)} value={String(internationalData.stats.treatiesApplied)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title={t("international_cases_title", lang)} subtitle={t("international_cases_subtitle", lang)} className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="pb-2 font-medium">{t("col_client", lang)}</th>
                  <th className="pb-2 font-medium">{t("col_countries", lang)}</th>
                  <th className="pb-2 font-medium">{t("col_treaty", lang)}</th>
                  <th className="pb-2 font-medium">{t("col_risk", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {internationalData.cases.map((c) => (
                  <tr key={c.client} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium text-foreground">{c.client}</td>
                    <td className="py-2.5 text-muted">
                      <span className="flex items-center gap-1.5">
                        <Globe2 size={13} className="text-brand" /> {c.countries}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted">
                      {c.treaty}
                      <div className="mt-0.5">
                        <Badge tone={toneForLevel(c.status)}>{c.status}</Badge>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <Badge tone={toneForLevel(c.risk)}>{c.risk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={t("international_exposure_title", lang)} subtitle={t("international_exposure_subtitle", lang)}>
          <div className="space-y-3">
            {internationalData.countryExposure.map((c) => (
              <div key={c.country}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{c.country}</span>
                  <span className="text-muted">{c.clients}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt">
                  <div className="h-2 rounded-full bg-brand" style={{ width: `${(c.clients / maxClients) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
