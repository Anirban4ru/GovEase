"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "../context/I18nContext";

export function DesktopNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/explore", label: t("nav.explore") },
    { href: "/saved", label: t("nav.saved") },
    { href: "/help", label: t("nav.help") },
  ];

  return (
    <nav aria-label="Desktop Primary Navigation" style={{ display: "flex", gap: "1.5rem" }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            style={{
              color: isActive ? "var(--color-brand-primary)" : "var(--color-content-secondary)",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.9375rem",
              textDecoration: "none",
              borderBottom: isActive
                ? "2px solid var(--color-brand-primary)"
                : "2px solid transparent",
              paddingBottom: "0.25rem",
              transition: "color var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    {
      href: "/",
      label: t("nav.home"),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/explore",
      label: t("nav.explore"),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      href: "/saved",
      label: t("nav.saved"),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      ),
    },
    {
      href: "/help",
      label: t("nav.help"),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "var(--color-surface-page)",
        borderTop: "1px solid var(--color-border-default)",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0.5rem 0",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
      }}
      className="md:hidden"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "var(--min-touch-target)",
              minHeight: "var(--min-touch-target)",
              padding: "0.25rem 0.75rem",
              textDecoration: "none",
              color: isActive ? "var(--color-brand-primary)" : "var(--color-content-secondary)",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.75rem",
            }}
          >
            {item.icon}
            <span style={{ marginTop: "0.25rem" }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
