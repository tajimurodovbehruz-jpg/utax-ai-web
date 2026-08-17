"use client";

import { Bell, ChevronDown, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAppState, useCurrentRole } from "@/lib/app-context";
import { ROLES, RoleId } from "@/lib/roles";
import { Lang, LANG_LABEL, t } from "@/lib/i18n";
import { NOTIFICATIONS } from "@/lib/notifications";
import { GlobalSearch } from "./GlobalSearch";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { roleId, setRoleId, lang, setLang } = useAppState();
  const role = useCurrentRole();
  const router = useRouter();
  const roleLabel = t(`role_label_${role.id}`, lang);
  const [roleOpen, setRoleOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-border bg-surface px-4 md:gap-4 md:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Menyu"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-alt md:hidden"
      >
        <Menu size={18} />
      </button>
      <GlobalSearch />

      <div className="ml-auto flex items-center gap-2">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-surface-alt"
          >
            {lang.toUpperCase()}
            <ChevronDown size={14} />
          </button>
          {langOpen && (
            <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-border bg-surface py-1 shadow-lg">
              {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-surface-alt"
                >
                  {LANG_LABEL[l]}
                  {l === lang && <span className="text-brand">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            title={t("notifications", lang)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-alt"
          >
            <Bell size={16} />
            {NOTIFICATIONS.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                {NOTIFICATIONS.length}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 z-20 mt-1 w-80 rounded-lg border border-border bg-surface py-2 shadow-lg">
              <p className="px-3 pb-1.5 text-xs font-semibold text-foreground">{t("notifications_title", lang)}</p>
              {NOTIFICATIONS.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted">{t("notifications_empty", lang)}</p>
              ) : (
                NOTIFICATIONS.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      router.push(n.href);
                      setNotifOpen(false);
                    }}
                    className="flex w-full items-start gap-2.5 px-3 py-2 text-left hover:bg-surface-alt"
                  >
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.tone === "danger" ? "bg-danger" : "bg-warning"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">{n.title}</span>
                      <span className="block truncate text-xs text-muted">{n.subtitle}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Role switcher (demo RBAC) */}
        <div className="relative">
          <button
            onClick={() => setRoleOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-border py-1.5 pl-1.5 pr-3 hover:bg-surface-alt"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand">
              {roleLabel.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold leading-tight text-foreground">{roleLabel}</p>
              <p className="text-[10px] leading-tight text-muted">{t("role_demo", lang)}</p>
            </div>
            <ChevronDown size={14} className="text-muted" />
          </button>
          {roleOpen && (
            <div className="absolute right-0 z-20 mt-1 w-64 rounded-lg border border-border bg-surface py-1 shadow-lg">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRoleId(r.id as RoleId);
                    setRoleOpen(false);
                  }}
                  className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-surface-alt"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {t(`role_label_${r.id}`, lang)}
                    {r.id === roleId && <span className="text-brand">✓</span>}
                  </span>
                  <span className="text-[11px] text-muted">{t(`role_desc_${r.id}`, lang)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/login"
          title={t("logout", lang)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-alt"
        >
          <LogOut size={16} />
        </Link>
      </div>
    </header>
  );
}
