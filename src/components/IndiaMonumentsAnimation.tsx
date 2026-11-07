"use client";

import React, { useState } from "react";

export function IndiaMonumentsAnimation({ className = "" }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div
      className={`india-monuments-stage ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "260px",
        overflow: "hidden",
        borderRadius: "var(--radius-lg, 12px)",
        background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 50%, #f0fdf4 100%)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.02)",
      }}
      aria-label="Wonders of India: Animated Sovereign Heritage Stage"
      role="region"
    >
      <style>{`
        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes flameFlicker {
          0% { transform: scale(0.95, 0.95); opacity: 0.85; filter: drop-shadow(0 0 4px #f59e0b); }
          50% { transform: scale(1.12, 1.25); opacity: 1; filter: drop-shadow(0 0 10px #f97316); }
          100% { transform: scale(0.9, 1.05); opacity: 0.9; filter: drop-shadow(0 0 6px #ea580c); }
        }
        @keyframes breezeFloat {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(10px); opacity: 0.8; }
          100% { transform: translateY(-30px) translateX(-5px); opacity: 0; }
        }
        @keyframes flagDrift {
          0% { transform: skewY(0deg); }
          50% { transform: skewY(1.5deg); }
          100% { transform: skewY(0deg); }
        }
        @keyframes sunPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        .chakra-rotating {
          transform-origin: 500px 140px;
          animation: chakraSpin 45s linear infinite;
        }
        .flame-animated {
          transform-origin: 500px 225px;
          animation: flameFlicker 1.4s ease-in-out infinite alternate;
        }
        .particle-1 { animation: breezeFloat 4s ease-in-out infinite 0.2s; }
        .particle-2 { animation: breezeFloat 5s ease-in-out infinite 1.2s; }
        .particle-3 { animation: breezeFloat 4.5s ease-in-out infinite 2.1s; }
        .particle-4 { animation: breezeFloat 6s ease-in-out infinite 0.8s; }
        .paused-motion * {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* SVG Canvas for Indian Monuments & Motion */}
      <svg
        viewBox="0 0 1000 320"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        style={{ display: "block" }}
        className={!isPlaying ? "paused-motion" : ""}
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyAtmosphere" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3e0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e8f5e9" stopOpacity="0.8" />
          </linearGradient>

          {/* Golden Sun / Sovereign Aura */}
          <radialGradient id="morningAura" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* India Gate Stone Gradient */}
          <linearGradient id="indiaGateStone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c2410c" />
            <stop offset="40%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Taj Mahal Pearlescent White Gradient */}
          <linearGradient id="tajMarble" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.65" />
          </linearGradient>

          {/* Distant Monument Silhouette Gradient */}
          <linearGradient id="distantMonuments" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d3570" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0d3570" stopOpacity="0.1" />
          </linearGradient>

          {/* Tricolor Ribbon Glow */}
          <linearGradient id="tricolorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9933" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>
        </defs>

        {/* Sky Backdrop */}
        <rect width="1000" height="320" fill="url(#skyAtmosphere)" />

        {/* Sun Aura Behind Chakra */}
        <circle cx="500" cy="140" r="140" fill="url(#morningAura)" />

        {/* =================================================================
            1. DISTANT WONDERS SKYLINE (Taj Mahal, Qutub Minar, Gateway of India)
            ================================================================= */}
        <g id="distant-skyline">
          {/* Left: Taj Mahal Silhouette (Agra) */}
          <g transform="translate(80, 110) scale(0.65)" fill="url(#tajMarble)">
            {/* Central Main Dome */}
            <path d="M 120 180 L 120 120 C 120 70 145 30 160 10 C 175 30 200 70 200 120 L 200 180 Z" />
            {/* Lotus Finial */}
            <path d="M 160 10 L 160 -10 M 157 -5 L 163 -5" stroke="#94a3b8" strokeWidth="2" />
            {/* Side Small Domes / Chattris */}
            <path d="M 85 180 L 85 130 C 85 105 100 85 110 75 C 120 85 135 105 135 130 L 135 180 Z" />
            <path d="M 185 180 L 185 130 C 185 105 200 85 210 75 C 220 85 235 105 235 130 L 235 180 Z" />
            {/* Main Arch Portal */}
            <path
              d="M 135 180 L 135 135 C 135 115 160 100 160 100 C 160 100 185 115 185 135 L 185 180 Z"
              fill="#ffffff"
              opacity="0.7"
            />
            {/* Left Minaret */}
            <polygon points="30,180 34,40 42,40 46,180" />
            <rect x="28" y="32" width="20" height="8" rx="2" />
            <polygon points="35,32 38,15 41,32" />
            {/* Right Minaret */}
            <polygon points="274,180 278,40 286,40 290,180" />
            <rect x="272" y="32" width="20" height="8" rx="2" />
            <polygon points="279,32 282,15 285,32" />
          </g>

          {/* Right: Qutub Minar & Gateway of India Arches */}
          <g transform="translate(740, 100) scale(0.6)" fill="url(#distantMonuments)">
            {/* Qutub Minar fluted minaret */}
            <polygon points="50,200 62,10 78,10 90,200" />
            {/* Balconies */}
            <rect x="58" y="45" width="24" height="6" rx="1" fill="#0d3570" opacity="0.4" />
            <rect x="55" y="90" width="30" height="6" rx="1" fill="#0d3570" opacity="0.4" />
            <rect x="52" y="140" width="36" height="7" rx="1" fill="#0d3570" opacity="0.4" />
            {/* Top Cupola */}
            <polygon points="66,10 70,-8 74,10" />

            {/* Gateway of India / Red Fort Arches */}
            <g transform="translate(130, 40)">
              <rect x="0" y="50" width="160" height="110" rx="4" />
              <path
                d="M 50 160 L 50 90 C 50 60 80 45 80 45 C 80 45 110 60 110 90 L 110 160 Z"
                fill="#ffffff"
                opacity="0.8"
              />
              {/* Corner Turrets */}
              <rect x="-8" y="30" width="24" height="130" rx="3" />
              <path d="M -8 30 C -8 15 4 10 4 10 C 4 10 16 15 16 30 Z" />
              <rect x="144" y="30" width="24" height="130" rx="3" />
              <path d="M 144 30 C 144 15 156 10 156 10 C 156 10 168 15 168 30 Z" />
            </g>
          </g>
        </g>

        {/* =================================================================
            2. ROTATING ASHOKA CHAKRA (National Emblem Wheel — 24 Spokes)
            ================================================================= */}
        <g className="chakra-rotating" opacity="0.75">
          <circle
            cx="500"
            cy="140"
            r="80"
            fill="none"
            stroke="#000080"
            strokeWidth="3"
            opacity="0.85"
          />
          <circle
            cx="500"
            cy="140"
            r="74"
            fill="none"
            stroke="#000080"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <circle cx="500" cy="140" r="14" fill="#000080" opacity="0.9" />
          <circle cx="500" cy="140" r="6" fill="#ffffff" />

          {/* 24 Precise Spokes */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = 500 + 74 * Math.cos(rad);
            const y2 = 140 + 74 * Math.sin(rad);
            return (
              <line
                key={i}
                x1="500"
                y1="140"
                x2={x2}
                y2={y2}
                stroke="#000080"
                strokeWidth="1.8"
                opacity="0.8"
              />
            );
          })}
        </g>

        {/* =================================================================
            3. PROMINENT CENTRAL INDIA GATE (New Delhi)
            ================================================================= */}
        <g id="india-gate" transform="translate(370, 75) scale(0.85)">
          {/* Top Attica / Cornice Pediment */}
          <rect x="40" y="30" width="220" height="14" rx="2" fill="url(#indiaGateStone)" />
          <rect x="45" y="44" width="210" height="8" fill="#9a3412" />
          {/* Inscription Panel: "INDIA" */}
          <rect x="55" y="52" width="190" height="26" fill="#c2410c" />
          <text
            x="150"
            y="70"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="14"
            fontWeight="900"
            letterSpacing="6"
            fontFamily="Arial, sans-serif"
          >
            INDIA
          </text>
          <rect x="48" y="78" width="204" height="10" fill="#9a3412" />

          {/* Main Body Columns */}
          <rect x="52" y="88" width="196" height="140" fill="url(#indiaGateStone)" />

          {/* Grand Central Archway Opening */}
          <path
            d="M 102 228 L 102 145 C 102 110 150 95 150 95 C 150 95 198 110 198 145 L 198 228 Z"
            fill="#ffffff"
            opacity="0.95"
          />

          {/* Arch Keystone & Mouldings */}
          <path
            d="M 98 228 L 98 145 C 98 105 150 90 150 90 C 150 90 202 105 202 145 L 202 228"
            fill="none"
            stroke="#78350f"
            strokeWidth="3"
          />
          <polygon points="145,90 155,90 158,100 142,100" fill="#fef08a" />

          {/* Side Arches */}
          <path
            d="M 64 190 L 64 140 C 64 125 78 120 78 120 C 78 120 92 125 92 140 L 92 190 Z"
            fill="#78350f"
            opacity="0.3"
          />
          <path
            d="M 208 190 L 208 140 C 208 125 222 120 222 120 C 222 120 236 125 236 140 L 236 190 Z"
            fill="#78350f"
            opacity="0.3"
          />

          {/* Base Stepped Plinth */}
          <rect x="30" y="228" width="240" height="10" rx="1" fill="#78350f" />
          <rect x="15" y="238" width="270" height="12" rx="2" fill="#451a03" />

          {/* ===============================================================
              4. AMAR JAWAN JYOTI (Eternal Flame & Memorial Cenotaph)
              =============================================================== */}
          <g id="amar-jawan-jyoti" transform="translate(150, 226)">
            {/* Cenotaph Plinth */}
            <rect x="-16" y="-12" width="32" height="12" fill="#1e293b" rx="2" />
            {/* Inverted Rifle & Helmet Silhouette */}
            <line x1="0" y1="-12" x2="0" y2="-36" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M -8 -36 C -8 -44 8 -44 8 -36 Z" fill="#334155" />

            {/* Eternal Flickering Flame */}
            <g className="flame-animated">
              {/* Outer Golden Aura */}
              <ellipse cx="0" cy="-48" rx="8" ry="14" fill="#f59e0b" opacity="0.8" />
              {/* Core Orange Flame */}
              <ellipse cx="0" cy="-46" rx="5" ry="10" fill="#ea580c" />
              {/* Inner Luminous White-Yellow Spark */}
              <ellipse cx="0" cy="-44" rx="2.5" ry="5" fill="#fef08a" />
            </g>
          </g>
        </g>

        {/* =================================================================
            5. FLOATING TRICOLOR PETALS & AMBIENT GLOW PARTICLES
            ================================================================= */}
        <g id="ambient-particles" opacity="0.85">
          <circle cx="220" cy="180" r="4" fill="#ff9933" className="particle-1" />
          <circle cx="340" cy="130" r="3" fill="#138808" className="particle-2" />
          <circle cx="680" cy="140" r="4.5" fill="#f59e0b" className="particle-3" />
          <circle cx="820" cy="170" r="3" fill="#138808" className="particle-4" />
          <circle cx="520" cy="90" r="2.5" fill="#000080" className="particle-1" />
          <circle cx="450" cy="160" r="3.5" fill="#ff9933" className="particle-2" />
        </g>

        {/* =================================================================
            6. GROUND BASELINE & PROUD TRICOLOR SOVEREIGN EMBLEM
            ================================================================= */}
        {/* Base Ground */}
        <rect x="0" y="280" width="1000" height="40" fill="#ffffff" />
        {/* Saffron Ribbon Line */}
        <rect x="0" y="280" width="1000" height="3" fill="#ff9933" />
        {/* White Center Line */}
        <rect x="0" y="283" width="1000" height="2" fill="#ffffff" />
        {/* India Green Ribbon Line */}
        <rect x="0" y="285" width="1000" height="3" fill="#138808" />

        {/* Foreground Title Badge */}
        <g transform="translate(500, 305)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#0d3570"
            fontSize="10"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="Arial, sans-serif"
          >
            SOVEREIGN CIVIC ARCHITECTURE • INDIA GATE • TAJ MAHAL • AMAR JAWAN JYOTI
          </text>
        </g>
      </svg>

      {/* Floating Status / Motion Control Bar */}
      <div
        style={{
          position: "absolute",
          top: "0.625rem",
          right: "0.625rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.25rem 0.65rem",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(203, 213, 225, 0.8)",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "#0d3570",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isPlaying ? "#10b981" : "#94a3b8",
              display: "inline-block",
            }}
          />
          {isPlaying ? "Live Motion (60 FPS)" : "Motion Paused"}
        </span>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause background animation" : "Resume background animation"}
          style={{
            padding: "0.25rem 0.55rem",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(203, 213, 225, 0.8)",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--color-content-secondary, #475569)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Offline Guarantee Stamp */}
      <div
        style={{
          position: "absolute",
          bottom: "0.625rem",
          left: "0.75rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.2rem 0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
          borderRadius: "var(--radius-xs, 4px)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "#047857",
          border: "1px solid rgba(209, 250, 229, 0.8)",
        }}
      >
        <span aria-hidden="true">⚡</span>
        <span>100% Offline Vector Motion (0 KB Network Stream)</span>
      </div>
    </div>
  );
}
