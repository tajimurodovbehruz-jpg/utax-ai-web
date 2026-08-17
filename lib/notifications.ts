import { calendarData, itData, auditData } from "./mock-data";

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  tone: "danger" | "warning";
}

export const NOTIFICATIONS: NotificationItem[] = [
  ...calendarData.overdue.map((d) => ({
    id: `notif-deadline-${d.client}`,
    title: `${d.client}: ${d.taxType}`,
    subtitle: `${d.daysLate} kun kechikdi`,
    href: "/calendar",
    tone: "danger" as const,
  })),
  ...itData.tickets
    .filter((tk) => tk.priority === "Kritik")
    .map((tk) => ({
      id: `notif-ticket-${tk.id}`,
      title: `${tk.id}: ${tk.title}`,
      subtitle: "Kritik ustuvorlik",
      href: "/it",
      tone: "danger" as const,
    })),
  ...auditData.engagements
    .filter((e) => e.findings > 0)
    .map((e) => ({
      id: `notif-audit-${e.client}`,
      title: `${e.client} auditi`,
      subtitle: `${e.findings} ta topilma aniqlangan`,
      href: "/audit",
      tone: "warning" as const,
    })),
];
