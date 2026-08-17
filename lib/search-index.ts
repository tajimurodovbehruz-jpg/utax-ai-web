import { clientsData, itData, auditData, calendarData, hrData, marketingData, sotuvData, internationalData, adminData } from "./mock-data";
import { AGENTS, zoneByKey } from "./campus-data";

export type SearchType =
  | "client"
  | "ticket"
  | "audit"
  | "deadline"
  | "agent"
  | "vacancy"
  | "campaign"
  | "lead"
  | "international"
  | "user";

export interface SearchItem {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
}

const allDeadlines = [...calendarData.overdue, ...calendarData.today, ...calendarData.thisWeek, ...calendarData.upcoming];

export const SEARCH_INDEX: SearchItem[] = [
  ...clientsData.list.map((c) => ({
    id: `client-${c.name}`,
    type: "client" as const,
    title: c.name,
    subtitle: `${c.segment} · ${c.risk}`,
    href: "/clients",
  })),
  ...itData.tickets.map((tk) => ({
    id: `ticket-${tk.id}`,
    type: "ticket" as const,
    title: `${tk.id}: ${tk.title}`,
    subtitle: tk.status,
    href: "/it",
  })),
  ...auditData.engagements.map((e) => ({
    id: `audit-${e.client}`,
    type: "audit" as const,
    title: e.client,
    subtitle: `Audit · ${e.auditor}`,
    href: "/audit",
  })),
  ...allDeadlines.map((d, i) => ({
    id: `deadline-${d.client}-${i}`,
    type: "deadline" as const,
    title: d.client,
    subtitle: `${d.taxType} — ${d.dueDate}`,
    href: "/calendar",
  })),
  ...AGENTS.map((a) => ({
    id: `agent-${a.id}`,
    type: "agent" as const,
    title: a.name,
    subtitle: zoneByKey(a.zoneKey).label,
    href: "/campus",
  })),
  ...hrData.vacancies.map((v) => ({
    id: `vacancy-${v.title}`,
    type: "vacancy" as const,
    title: v.title,
    subtitle: v.department,
    href: "/hr",
  })),
  ...marketingData.campaigns.map((c) => ({
    id: `campaign-${c.name}`,
    type: "campaign" as const,
    title: c.name,
    subtitle: c.channel,
    href: "/marketing",
  })),
  ...sotuvData.followUps.map((f) => ({
    id: `lead-${f.client}`,
    type: "lead" as const,
    title: f.client,
    subtitle: f.action,
    href: "/sotuv",
  })),
  ...internationalData.cases.map((c) => ({
    id: `international-${c.client}`,
    type: "international" as const,
    title: c.client,
    subtitle: c.treaty,
    href: "/international",
  })),
  ...adminData.users.map((u) => ({
    id: `user-${u.name}`,
    type: "user" as const,
    title: u.name,
    subtitle: u.role,
    href: "/admin",
  })),
];

export function searchItems(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)).slice(
    0,
    limit
  );
}
