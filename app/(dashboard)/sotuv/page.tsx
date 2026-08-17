"use client";

import { Sparkles, Clock } from "lucide-react";
import { PageHeader, Card, Badge } from "@/components/ui";
import { sotuvData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

const maxCount = Math.max(...sotuvData.pipeline.map((p) => p.count));

export default function SotuvPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("sotuv_title", lang)} subtitle={t("sotuv_subtitle", lang)} />

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card title={t("sotuv_pipeline_title", lang)} subtitle={t("sotuv_pipeline_subtitle", lang)} className="lg:col-span-2">
          <div className="space-y-3">
            {sotuvData.pipeline.map((p) => (
              <div key={p.stage}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{p.stage}</span>
                  <span className="text-muted">
                    {p.count} · {p.value}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-surface-alt">
                  <div
                    className="h-2.5 rounded-full bg-brand"
                    style={{ width: `${(p.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t("sotuv_followup_title", lang)} subtitle={t("sotuv_followup_subtitle", lang)}>
          <ul className="space-y-3">
            {sotuvData.followUps.map((f) => (
              <li key={f.client} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium text-foreground">{f.client}</p>
                <p className="mt-0.5 text-xs text-muted">{f.action}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-brand">
                  <Clock size={12} />
                  {f.due}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title={t("sotuv_brief_title", lang)} subtitle={t("sotuv_brief_prepared", lang)}>
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-brand" />
          <div>
            <p className="text-sm font-semibold text-foreground">{sotuvData.meetingBrief.client}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-foreground">
              {sotuvData.meetingBrief.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <div className="mt-3">
              <Badge tone="brand">{t("sotuv_voice_ai_badge", lang)}</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
