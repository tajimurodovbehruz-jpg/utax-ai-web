"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, UserCog, ShieldCheck, Eye, User, X, ArrowRight, LayoutGrid, List as ListIcon } from "lucide-react";
import { orgStructure } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-context";
import { t } from "@/lib/i18n";
import { StatCard, Badge } from "@/components/ui";

const deptEmployeeSum = orgStructure.departments.reduce((sum, d) => sum + d.employees, 0);
const TOTAL_STAFF = deptEmployeeSum + 2; // + CEO + Direktor
const LEADERS = orgStructure.departments.length + 2; // dept heads + CEO + Direktor
const AVG_SPAN = Math.round((deptEmployeeSum / orgStructure.departments.length) * 10) / 10;

function NodeCard({
  title,
  subtitle,
  meta,
  icon,
  dashed,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: React.ReactNode;
  dashed?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-center gap-0.5 rounded-lg border bg-surface px-3 py-2.5 text-center shadow-sm ${
        dashed ? "border-dashed border-border" : "border-border"
      }`}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </div>
      {subtitle && <span className="text-[11px] text-muted">{subtitle}</span>}
      {meta && <span className="text-[10px] font-medium text-brand">{meta}</span>}
    </div>
  );
}

function DeptCard({
  dept,
  label,
  selected,
  onSelect,
  lang,
}: {
  dept: (typeof orgStructure.departments)[number];
  label: string;
  selected: boolean;
  onSelect: () => void;
  lang: Parameters<typeof t>[1];
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full flex-col items-center gap-0.5 rounded-lg border bg-surface px-3 py-3 text-center shadow-sm transition-colors ${
        selected ? "border-brand ring-1 ring-brand" : "border-border hover:border-brand/40"
      }`}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ background: dept.color }}
      >
        {label.charAt(0).toUpperCase()}
      </div>
      <span className="mt-1.5 text-xs font-semibold text-foreground">{label}</span>
      <span className="text-[11px] text-muted">{dept.head}</span>
      <span className="text-[10px] text-muted">
        {dept.employees} {t("orgchart_employees", lang)}
      </span>
      {"isExtra" in dept && dept.isExtra && (
        <span className="mt-1">
          <Badge tone="warning">{t("orgchart_extra_badge", lang)}</Badge>
        </span>
      )}
      <span className="mt-1 flex items-center gap-0.5 text-[10px] font-medium text-brand">
        {t("orgchart_view_details", lang)} <ArrowRight size={10} />
      </span>
    </button>
  );
}

function Drop() {
  return <div className="mx-auto h-4 w-px bg-border" />;
}

function DetailPanel({ deptKey, lang, onClose }: { deptKey: string; lang: Parameters<typeof t>[1]; onClose: () => void }) {
  const dept = orgStructure.departments.find((d) => d.key === deptKey);
  if (!dept) return null;
  const label = t(`nav_${dept.key}`, lang);

  return (
    <div className="relative mt-6 w-full max-w-xl rounded-xl border border-brand/30 bg-brand-light p-4">
      <button onClick={onClose} className="absolute right-3 top-3 text-muted hover:text-foreground" aria-label="Yopish">
        <X size={16} />
      </button>
      <div className="mb-2 flex items-center justify-between gap-2 pr-6">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{t("orgchart_detail_title", lang)}</p>
        {"isExtra" in dept && dept.isExtra && <Badge tone="warning">{t("orgchart_extra_badge", lang)}</Badge>}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
          style={{ background: dept.color }}
        >
          {label.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted">
            {t("orgchart_detail_head", lang)}: {dept.head} · {dept.employees} {t("orgchart_employees", lang)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground">{t(`${dept.key}_subtitle`, lang)}</p>
      {"isExtra" in dept && dept.isExtra && (
        <p className="mt-2 text-xs text-warning">{t("orgchart_extra_note", lang)}</p>
      )}
      <Link
        href={`/${dept.key}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
      >
        {t("orgchart_detail_open_page", lang)} <ArrowRight size={12} />
      </Link>
    </div>
  );
}

export function OrgChart() {
  const { lang } = useAppState();
  const [view, setView] = useState<"diagram" | "list">("diagram");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  function toggleSelect(key: string) {
    setSelectedKey((prev) => (prev === key ? null : key));
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:flex-1 lg:grid-cols-4">
          <StatCard label={t("orgchart_stat_total", lang)} value={String(TOTAL_STAFF)} />
          <StatCard label={t("orgchart_stat_leaders", lang)} value={String(LEADERS)} />
          <StatCard label={t("orgchart_stat_span", lang)} value={String(AVG_SPAN)} />
          <StatCard label={t("orgchart_stat_vacancies", lang)} value={String(orgStructure.vacancies)} />
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 self-start rounded-lg border border-border p-1">
          <button
            onClick={() => setView("diagram")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              view === "diagram" ? "bg-brand text-brand-contrast" : "text-foreground hover:bg-surface-alt"
            }`}
          >
            <LayoutGrid size={13} /> {t("orgchart_view_diagram", lang)}
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              view === "list" ? "bg-brand text-brand-contrast" : "text-foreground hover:bg-surface-alt"
            }`}
          >
            <ListIcon size={13} /> {t("orgchart_view_list", lang)}
          </button>
        </div>
      </div>

      {view === "diagram" ? (
        // Diagramma kompyuterdagi bilan bir xil o'lchamda chiziladi (kartalar
        // torraytirilmaydi/kichraytirilmaydi) — tor ekranlarda butun daraxt
        // gorizontal skroll orqali to'liq ko'rinadi.
        <div className="overflow-x-auto py-2">
          <div className="mx-auto flex w-fit flex-col items-center">
            <div className="w-56">
              <NodeCard
                title={orgStructure.ceo.name}
                subtitle={t("role_label_ceo", lang)}
                meta={`${TOTAL_STAFF} ${t("orgchart_ceo_meta", lang)}`}
                icon={<Crown size={13} className="text-brand" />}
              />
            </div>
            <Drop />
            <div className="w-56">
              <NodeCard
                title={orgStructure.director.name}
                subtitle={t("role_label_director", lang)}
                meta={`${orgStructure.departments.length} ${t("orgchart_director_meta", lang)}`}
                icon={<UserCog size={13} className="text-brand" />}
              />
            </div>
            <Drop />

            <div className="w-fit border-t border-border pt-0">
              <div className="flex flex-nowrap justify-center gap-3 px-2 pt-4">
                {orgStructure.departments.map((d) => (
                  <div key={d.key} className="flex w-36 flex-shrink-0 flex-col items-center">
                    <Drop />
                    <DeptCard
                      dept={d}
                      label={t(`nav_${d.key}`, lang)}
                      selected={selectedKey === d.key}
                      onSelect={() => toggleSelect(d.key)}
                      lang={lang}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 font-medium">{t("orgchart_col_department", lang)}</th>
                <th className="pb-2 font-medium">{t("orgchart_col_head", lang)}</th>
                <th className="pb-2 font-medium">{t("orgchart_col_employees", lang)}</th>
                <th className="pb-2 font-medium">{t("orgchart_col_action", lang)}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2.5 font-medium text-foreground">{orgStructure.ceo.name}</td>
                <td className="py-2.5 text-muted">{t("role_label_ceo", lang)}</td>
                <td className="py-2.5 text-muted">{TOTAL_STAFF}</td>
                <td className="py-2.5 text-muted">—</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2.5 font-medium text-foreground">{orgStructure.director.name}</td>
                <td className="py-2.5 text-muted">{t("role_label_director", lang)}</td>
                <td className="py-2.5 text-muted">{orgStructure.departments.length} {t("orgchart_director_meta", lang)}</td>
                <td className="py-2.5 text-muted">—</td>
              </tr>
              {orgStructure.departments.map((d) => (
                <tr key={d.key} className="border-b border-border last:border-0">
                  <td className="max-w-[140px] py-2.5 sm:max-w-none">
                    <span className="flex items-center gap-2 whitespace-nowrap font-medium text-foreground">
                      <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: d.color }} />
                      {t(`nav_${d.key}`, lang)}
                    </span>
                    {"isExtra" in d && d.isExtra && (
                      <span className="mt-1 block w-fit">
                        <Badge tone="warning">{t("orgchart_extra_badge", lang)}</Badge>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-muted">{d.head}</td>
                  <td className="py-2.5 text-muted">{d.employees}</td>
                  <td className="py-2.5">
                    <button onClick={() => toggleSelect(d.key)} className="text-xs font-medium text-brand hover:underline">
                      {t("orgchart_view_details", lang)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedKey && <DetailPanel deptKey={selectedKey} lang={lang} onClose={() => setSelectedKey(null)} />}

      {/* Support & external roles */}
      <div className="mt-8 w-full">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted">
          {t("orgchart_support_title", lang)}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {orgStructure.support.map((s) => (
            <div key={s.key} className="w-44">
              <NodeCard
                title={t(`role_label_${s.key}`, lang)}
                subtitle={t(`role_desc_${s.key}`, lang)}
                icon={s.key === "admin" ? <ShieldCheck size={13} className="text-muted" /> : <Eye size={13} className="text-muted" />}
                dashed
              />
            </div>
          ))}
          <div className="w-44">
            <NodeCard
              title={t("role_label_client", lang)}
              subtitle={t("role_desc_client", lang)}
              icon={<User size={13} className="text-muted" />}
              dashed
            />
          </div>
        </div>
      </div>
    </div>
  );
}
