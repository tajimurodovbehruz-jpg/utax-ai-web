export type RoleId =
  | "ceo"
  | "director"
  | "dept_head"
  | "employee"
  | "client"
  | "admin"
  | "auditor";

export type ModuleKey =
  | "ceo"
  | "moliya"
  | "it"
  | "marketing"
  | "sotuv"
  | "telegram"
  | "hr"
  | "campus"
  | "admin"
  | "calendar"
  | "clients"
  | "audit"
  | "international"
  | "structure";

export interface RoleDef {
  id: RoleId;
  label: string;
  description: string;
  modules: ModuleKey[];
}

export const ROLES: RoleDef[] = [
  {
    id: "ceo",
    label: "CEO",
    description: "Barcha agregat KPI, risk, qarorlar",
    modules: [
      "ceo",
      "moliya",
      "it",
      "marketing",
      "sotuv",
      "telegram",
      "hr",
      "campus",
      "admin",
      "calendar",
      "clients",
      "audit",
      "international",
      "structure",
    ],
  },
  {
    id: "director",
    label: "Direktor",
    description: "Barcha bo'limlar operatsiyasi",
    modules: [
      "ceo",
      "moliya",
      "it",
      "marketing",
      "sotuv",
      "telegram",
      "hr",
      "campus",
      "calendar",
      "clients",
      "audit",
      "international",
      "structure",
    ],
  },
  {
    id: "dept_head",
    label: "Bo'lim boshlig'i",
    description: "O'z bo'limi, xodim va agentlari",
    modules: ["moliya", "sotuv", "campus", "calendar", "clients", "audit", "structure"],
  },
  {
    id: "employee",
    label: "Xodim",
    description: "Ruxsatli chat, vazifa, bilim",
    modules: ["telegram", "campus"],
  },
  {
    id: "client",
    label: "Mijoz",
    description: "Faqat o'z ma'lumoti",
    modules: [],
  },
  {
    id: "admin",
    label: "Administrator",
    description: "Konfiguratsiya va monitoring",
    modules: ["admin", "campus", "structure"],
  },
  {
    id: "auditor",
    label: "Auditor",
    description: "Audit va hisobot — faqat o'qish",
    modules: ["admin", "ceo", "moliya", "audit", "clients"],
  },
];

export function roleById(id: RoleId): RoleDef {
  return ROLES.find((r) => r.id === id) ?? ROLES[0];
}
