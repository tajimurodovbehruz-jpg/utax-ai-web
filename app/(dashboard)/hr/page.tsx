"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { PageHeader, Card, Badge, toneForLevel } from "@/components/ui";
import { hrData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

function ProgressRow({ label, sub, progress }: { label: string; sub: string; progress: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted">{sub}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-alt">
        <div className="h-2 rounded-full bg-brand" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default function HrPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("hr_title", lang)} subtitle={t("hr_subtitle", lang)} />

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card title={t("hr_vacancies_title", lang)} subtitle={t("hr_vacancies_subtitle", lang)}>
          <ul className="space-y-3">
            {hrData.vacancies.map((v) => (
              <li key={v.title} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                <div className="flex items-start gap-2">
                  <Briefcase size={15} className="mt-0.5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.title}</p>
                    <p className="text-xs text-muted">
                      {v.department} · {v.candidates} nomzod
                    </p>
                  </div>
                </div>
                <Badge tone={toneForLevel(v.stage)}>{v.stage}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t("hr_onboarding_title", lang)} subtitle={t("hr_onboarding_subtitle", lang)}>
          <div className="space-y-4">
            {hrData.onboarding.map((o) => (
              <ProgressRow key={o.name} label={o.name} sub={`${o.role} · ${o.progress}%`} progress={o.progress} />
            ))}
          </div>
        </Card>
      </div>

      <Card title={t("hr_training_title", lang)} subtitle={t("hr_training_subtitle", lang)}>
        <div className="space-y-4">
          {hrData.training.map((tr) => (
            <div key={tr.title} className="flex items-center gap-3">
              <GraduationCap size={16} className="shrink-0 text-brand" />
              <div className="flex-1">
                <ProgressRow label={tr.title} sub={`${tr.completion}%`} progress={tr.completion} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
