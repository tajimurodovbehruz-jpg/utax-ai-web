"use client";

import { MessageCircle, CheckCircle2, Send } from "lucide-react";
import { PageHeader, Card, Badge, toneForLevel } from "@/components/ui";
import { telegramData } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

export default function TelegramPage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("telegram_title", lang)} subtitle={t("telegram_subtitle", lang)} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title={t("telegram_groups_title", lang)} subtitle={t("telegram_groups_subtitle", lang)} className="lg:col-span-1">
          <ul className="space-y-3">
            {telegramData.groups.map((g) => (
              <li key={g.name} className="flex items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <MessageCircle size={15} className="text-brand" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{g.name}</p>
                    <p className="text-xs text-muted">SLA {g.sla}</p>
                  </div>
                </div>
                {g.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-contrast">
                    {g.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t("telegram_inbox_title", lang)} subtitle={t("telegram_inbox_subtitle", lang)} className="lg:col-span-2">
          <div className="space-y-3">
            {telegramData.inbox.map((m) => (
              <div key={m.from + m.time} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{m.from}</p>
                  <span className="text-xs text-muted">{m.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted">&ldquo;{m.preview}&rdquo;</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge tone={toneForLevel(m.status)}>{m.status}</Badge>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-brand-contrast hover:opacity-90">
                      <CheckCircle2 size={13} /> {t("approve", lang)}
                    </button>
                    <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-alt">
                      <Send size={13} /> {t("edit", lang)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
