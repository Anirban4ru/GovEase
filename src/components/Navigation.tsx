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
    { href: "/journeys", label: t("nav.journeys") || "Life Journeys" },
    { href: "/prep-studio", label: t("nav.prepStudio") || "Doc Studio" },
    { href: "/guide", label: t("nav.guide") },
    { href: "/saved", label: t("nav.saved") },
    { href: "/help", label: t("nav.help") },
  ];

  return (
    <nav
      aria-label="Desktop Primary Navigation"
      style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            style={{
              color: isActive
                ? "var(--color-govease-navy, #0d3570)"
                : "var(--color-content-secondary)",
              fontWeight: isActive ? 700 : 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              borderBottom: isActive
                ? "2.5px solid var(--color-govease-saffron, #fc7d1b)"
                : "2.5px solid transparent",
              padding: "0.35rem 0.15rem",
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
          width="20"
          height="20"
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
          width="20"
          height="20"
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
      href: "/journeys",
      label: t("nav.journeys") || "Journeys",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      href: "/prep-studio",
      label: t("nav.prepStudio") || "Studio",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      href: "/help",
      label: t("nav.help"),
      icon: (
        <svg
          width="20"
          height="20"
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
        padding: "0.375rem 0",
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
              padding: "0.25rem 0.5rem",
              textDecoration: "none",
              color: isActive ? "var(--color-brand-primary)" : "var(--color-content-secondary)",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.6875rem",
            }}
          >
            {item.icon}
            <span style={{ marginTop: "0.2rem" }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
