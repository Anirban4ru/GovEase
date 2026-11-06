import React from "react";
import type { LifeEcosystem } from "../lib/catalogue";

interface EcosystemBadgeProps {
  ecosystem: LifeEcosystem;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function EcosystemBadge({
  ecosystem,
  size = 20,
  className = "",
  style,
}: EcosystemBadgeProps) {
  switch (ecosystem) {
    case "healthcare":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Health Shield & Life Lotus Petal */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="14" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      );

    case "education":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Knowledge Book & Vidya Torch */}
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 7h6" />
          <path d="M9 11h4" />
        </svg>
      );

    case "finance-and-welfare":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Indian Rupee Symbol & Growth Circle */}
          <circle cx="12" cy="12" r="10" />
          <path d="M8 7h8" />
          <path d="M8 10h6" />
          <path d="M8 7c2.5 0 4.5 1 4.5 3s-2 3-4.5 3" />
          <line x1="11.5" y1="13" x2="16" y2="18" />
        </svg>
      );

    case "government-and-citizen":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Ashoka Geometric Wheel Motif */}
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2.5" />
          <line x1="12" y1="2" x2="12" y2="9.5" />
          <line x1="12" y1="14.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="9.5" y2="12" />
          <line x1="14.5" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="10.23" y2="10.23" />
          <line x1="13.77" y1="13.77" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="10.23" y2="13.77" />
          <line x1="13.77" y1="10.23" x2="19.07" y2="4.93" />
        </svg>
      );

    case "mobility-and-transport":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Transport Navigation Compass & Roadway */}
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );

    case "utilities-and-local":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          aria-hidden="true"
        >
          {/* Scales of Consumer Justice & Civic Beacon */}
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l-2 6a3 3 0 0 0 6 0l-2-6" />
          <path d="M19 7l-2 6a3 3 0 0 0 6 0l-2-6" />
        </svg>
      );

    default:
      return null;
  }
}
