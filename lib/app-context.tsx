"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { RoleId, roleById } from "./roles";
import { Lang } from "./i18n";

interface AppState {
  roleId: RoleId;
  setRoleId: (r: RoleId) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleId] = useState<RoleId>("ceo");
  const [lang, setLang] = useState<Lang>("uz");

  const value = useMemo(() => ({ roleId, setRoleId, lang, setLang }), [roleId, lang]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}

export function useCurrentRole() {
  const { roleId } = useAppState();
  return roleById(roleId);
}
