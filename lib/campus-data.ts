import {
  ceoData,
  moliyaData,
  itData,
  marketingData,
  sotuvData,
  telegramData,
  hrData,
  calendarData,
  clientsData,
  auditData,
  internationalData,
} from "./mock-data";

export type AgentState = "IDLE" | "WALK" | "SIT" | "WORK" | "MEETING" | "TALK" | "ERROR";

export interface ZoneDef {
  key: string;
  label: string;
  color: string;
  x: number; // corridor position (world X)
}

export interface AgentDef {
  id: string;
  name: string;
  zoneKey: string;
  color: string;
  role: string;
  taskPool: string[];
}

// Zonalar korridor bo'ylab joylashadi (X o'qi). Har birining stol klasteri +Z tomonda.
// Audit — Moliyaga, Xalqaro soliq — Sotuvga yaqin joylashtirilgan (mazmunan bog'liq bo'limlar).
export const ZONES: ZoneDef[] = [
  { key: "ceo", label: "CEO", color: "#f59e0b", x: -24 },
  { key: "moliya", label: "Moliya", color: "#16a34a", x: -18 },
  { key: "audit", label: "Audit", color: "#0d9488", x: -12 },
  { key: "it", label: "IT", color: "#2563eb", x: -6 },
  { key: "marketing", label: "Marketing", color: "#db2777", x: 0 },
  { key: "sotuv", label: "Sotuv", color: "#ea580c", x: 6 },
  { key: "international", label: "Xalqaro", color: "#4338ca", x: 12 },
  { key: "telegram", label: "Ishchi bo'lim", color: "#0891b2", x: 18 },
  { key: "hr", label: "HR", color: "#9333ea", x: 24 },
];

const auditStageLabel: Record<string, string> = {
  started: "boshlandi",
  fieldwork: "dala ishida",
  findings: "topilmalar bosqichida",
  report: "hisobot tayyorlanmoqda",
  signoff: "mijoz tasdig'ini kutmoqda",
};

// Har agentning vazifa matni tegishli mock-data.ts manbasidan hosil qilinadi —
// shu bo'lim sahifasida ko'rsatilgan real yozuvlar bilan mos keladi.
const ceoTaskPool = [
  ...ceoData.decisions.map((d) => d.title),
  ...ceoData.risks.map((r) => r.title),
  `${clientsData.stats.highRisk} ta yuqori risk mijozni nazorat qilmoqda`,
  `${calendarData.stats.overdue} ta kechikkan soliq muddati bo'yicha eskalatsiya`,
];

const moliyaTaskPool = [
  ...moliyaData.anomalies.map((a) => a.title),
  ...moliyaData.receivables.filter((r) => r.risk === "Yuqori").map((r) => `${r.client} qarzdorligini kuzatmoqda (${r.amount})`),
  ...calendarData.overdue.map((d) => `${d.client}: ${d.taxType} — ${d.daysLate} kun kechikdi`),
];

const auditTaskPool = [
  ...auditData.engagements.map((e) => `${e.client} auditi ${auditStageLabel[e.stage]} (${e.progress}%)`),
  ...auditData.engagements.filter((e) => e.findings > 0).map((e) => `${e.client}: ${e.findings} ta topilma aniqlangan`),
];

const itTaskPool = itData.tickets.map((tk) => `${tk.id}: ${tk.title}`);

const marketingTaskPool = [
  ...marketingData.campaigns.map((c) => `${c.name} kampaniyasini kuzatmoqda`),
  ...marketingData.contentCalendar.map((c) => `"${c.title}" kontenti — ${c.stage}`),
];

const sotuvTaskPool = [
  ...sotuvData.followUps.map((f) => `${f.client}: ${f.action}`),
  ...clientsData.list.filter((c) => c.nextDeadline.includes("kechikkan")).map((c) => `${c.name}: muddat kechikkani bo'yicha ogohlantirish`),
];

const internationalTaskPool = [
  ...internationalData.cases.map((c) => `${c.client}: ${c.treaty} — ${c.status}`),
  ...internationalData.countryExposure.slice(0, 2).map((c) => `${c.country} bo'yicha ${c.clients} faol mijozni kuzatmoqda`),
];

const telegramTaskPool = telegramData.inbox.map((m) => `${m.from}: ${m.status}`);

const hrTaskPool = [
  ...hrData.vacancies.map((v) => `${v.title} — ${v.candidates} nomzod ko'rib chiqilmoqda`),
  ...hrData.onboarding.map((o) => `${o.name} onboarding jarayonida (${o.progress}%)`),
];

export const AGENTS: AgentDef[] = [
  { id: "agent-ceo", name: "CEO Agent", zoneKey: "ceo", color: "#f59e0b", role: "Strategik xulosa", taskPool: ceoTaskPool },
  { id: "agent-moliya", name: "Moliya Agent", zoneKey: "moliya", color: "#16a34a", role: "Moliya va soliq muddatlari", taskPool: moliyaTaskPool },
  { id: "agent-audit", name: "Audit Agent", zoneKey: "audit", color: "#0d9488", role: "Ekspress audit kuzatuvi", taskPool: auditTaskPool },
  { id: "agent-it", name: "IT Agent", zoneKey: "it", color: "#2563eb", role: "Servis monitoring", taskPool: itTaskPool },
  { id: "agent-marketing", name: "Marketing Agent", zoneKey: "marketing", color: "#db2777", role: "Kontent generatsiya", taskPool: marketingTaskPool },
  { id: "agent-sotuv", name: "Sotuv Agent", zoneKey: "sotuv", color: "#ea580c", role: "CRM va mijozlar reestri", taskPool: sotuvTaskPool },
  { id: "agent-international", name: "Xalqaro Agent", zoneKey: "international", color: "#4338ca", role: "Xalqaro soliqqa tortish", taskPool: internationalTaskPool },
  { id: "agent-telegram", name: "Ishchi bo'lim Agent", zoneKey: "telegram", color: "#0891b2", role: "Murojaat tasnifi", taskPool: telegramTaskPool },
  { id: "agent-hr", name: "HR Agent", zoneKey: "hr", color: "#9333ea", role: "Onboarding", taskPool: hrTaskPool },
];

export const CORRIDOR_Z = 0;
export const HUB_Z = 3.2;
export const DESK_CLUSTER_Z = 8.5;

// Yig'ilish maydonidagi aylana stol va uning atrofidagi aylana stolchalar.
export const MEETING_TABLE = { x: 0, z: -4, tableRadius: 1.3, seatRadius: 2.05, seatHeight: 0.42 };

export function meetingSeat(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2;
  return {
    x: MEETING_TABLE.x + Math.sin(angle) * MEETING_TABLE.seatRadius,
    z: MEETING_TABLE.z + Math.cos(angle) * MEETING_TABLE.seatRadius,
    angle,
  };
}

export function zoneByKey(key: string): ZoneDef {
  return ZONES.find((z) => z.key === key) ?? ZONES[0];
}

// Har zonada 4 ta stol (jami 36 >= talab qilingan 21)
export function desksForZone(zone: ZoneDef) {
  const offsets = [
    [-1.3, 0],
    [1.3, 0],
    [-1.3, 2.6],
    [1.3, 2.6],
  ];
  return offsets.map(([dx, dz], i) => ({
    id: `${zone.key}-desk-${i}`,
    x: zone.x + dx,
    z: DESK_CLUSTER_Z + dz,
  }));
}
