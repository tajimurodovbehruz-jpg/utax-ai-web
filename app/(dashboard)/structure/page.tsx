"use client";

import { PageHeader, Card } from "@/components/ui";
import { OrgChart } from "@/components/OrgChart";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";

export default function StructurePage() {
  const { lang } = useAppState();

  return (
    <div>
      <PageHeader title={t("structure_title", lang)} subtitle={t("structure_subtitle", lang)} />
      <Card>
        <OrgChart />
      </Card>
    </div>
  );
}
