"use client";

import React from "react";

export function IndiaMonumentsAnimation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`india-monuments-cinema-stage ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes flameFlicker {
          0% { transform: scale(0.92, 0.95); opacity: 0.85; filter: drop-shadow(0 0 6px #f59e0b); }
          50% { transform: scale(1.15, 1.3); opacity: 1; filter: drop-shadow(0 0 14px #f97316); }
          100% { transform: scale(0.9, 1.05); opacity: 0.9; filter: drop-shadow(0 0 8px #ea580c); }
        }
        @keyframes particleBreeze {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(15px); opacity: 0.75; }
          100% { transform: translateY(-50px) translateX(-8px); opacity: 0; }
        }
        @keyframes sunRadiance {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
        }
        .chakra-spin-cinema {
          transform-origin: 1220px 240px;
          animation: chakraSpin 45s linear infinite;
        }
        .flame-pulse-cinema {
          transform-origin: 1220px 455px;
          animation: flameFlicker 1.4s ease-in-out infinite alternate;
        }
        .cinema-p1 { animation: particleBreeze 4s ease-in-out infinite 0.2s; }
        .cinema-p2 { animation: particleBreeze 5.5s ease-in-out infinite 1.2s; }
        .cinema-p3 { animation: particleBreeze 4.8s ease-in-out infinite 2.5s; }
        .cinema-p4 { animation: particleBreeze 6.2s ease-in-out infinite 0.7s; }
      `}</style>

      {/* Full-Bleed Panoramic Widescreen SVG (1600 x 650) */}
      <svg
        viewBox="0 0 1600 650"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {/* Panoramic Dawn Sky */}
          <linearGradient id="cinemaSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8f0" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.95" />
          </linearGradient>

          {/* Golden Sun & Sacred Radiance */}
          <radialGradient id="sacredSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* India Gate Sandstone Gradient */}
          <linearGradient id="gateSandstone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="35%" stopColor="#c2410c" />
            <stop offset="70%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Taj Mahal Pearlescent Marble */}
          <linearGradient id="tajSilhouette" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
          </linearGradient>

          {/* Distant Monument Gradient */}
          <linearGradient id="monumentSkyline" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d3570" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0d3570" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Ambient Sky Fill */}
        <rect width="1600" height="650" fill="url(#cinemaSky)" />

        {/* Golden Sun Aura Behind Chakra */}
        <circle cx="1220" cy="240" r="220" fill="url(#sacredSun)" />

        {/* =================================================================
            1. DISTANT WONDERS: TAJ MAHAL (LEFT HORIZON)
            ================================================================= */}
        <g
          id="taj-mahal-vista"
          transform="translate(680, 240) scale(0.9)"
          fill="url(#tajSilhouette)"
        >
          {/* Main Central Onion Dome */}
          <path d="M 160 300 L 160 210 C 160 145 195 90 220 60 C 245 90 280 145 280 210 L 280 300 Z" />
          {/* Lotus Finial */}
          <line x1="220" y1="60" x2="220" y2="25" stroke="#94a3b8" strokeWidth="3" />
          <polygon points="216,40 224,40 220,20" fill="#94a3b8" />
          {/* Flanking Chattris */}
          <path d="M 115 300 L 115 220 C 115 185 135 155 150 145 C 165 155 185 185 185 220 L 185 300 Z" />
          <path d="M 255 300 L 255 220 C 255 185 275 155 290 145 C 305 155 325 185 325 220 L 325 300 Z" />
          {/* Grand Arch Portal */}
          <path
            d="M 185 300 L 185 230 C 185 200 220 185 220 185 C 220 185 255 200 255 230 L 255 300 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          {/* Left Minaret */}
          <polygon points="40,300 46,100 58,100 64,300" />
          <rect x="42" y="90" width="20" height="10" rx="2" />
          <polygon points="50,90 52,70 54,90" />
          {/* Right Minaret */}
          <polygon points="376,300 382,100 394,100 400,300" />
          <rect x="378" y="90" width="20" height="10" rx="2" />
          <polygon points="386,90 388,70 390,90" />
        </g>

        {/* =================================================================
            2. DISTANT WONDERS: QUTUB MINAR & RED FORT ARCHES (FAR RIGHT)
            ================================================================= */}
        <g
          id="delhi-skyline"
          transform="translate(1410, 200) scale(0.85)"
          fill="url(#monumentSkyline)"
        >
          {/* Qutub Minar Tapered Sandstone Tower */}
          <polygon points="30,350 48,60 70,60 88,350" />
          <rect x="44" y="110" width="30" height="8" rx="2" fill="#0d3570" opacity="0.3" />
          <rect x="40" y="180" width="38" height="9" rx="2" fill="#0d3570" opacity="0.3" />
          <rect x="36" y="250" width="46" height="10" rx="2" fill="#0d3570" opacity="0.3" />
          <polygon points="56,60 59,35 62,60" />

          {/* Gateway of India / Red Fort Bastions */}
          <g transform="translate(110, 80)">
            <rect x="0" y="80" width="160" height="190" rx="6" />
            <path
              d="M 45 270 L 45 170 C 45 125 80 110 80 110 C 80 110 115 125 115 170 L 115 270 Z"
              fill="#ffffff"
              opacity="0.8"
            />
            <rect x="-10" y="50" width="28" height="220" rx="4" />
            <polygon points="-10,50 4,20 18,50" />
            <rect x="142" y="50" width="28" height="220" rx="4" />
            <polygon points="142,50 156,20 170,50" />
          </g>
        </g>

        {/* =================================================================
            3. ROTATING ASHOKA CHAKRA (Deep Sovereign Navy • 24 Spokes)
            ================================================================= */}
        <g className="chakra-spin-cinema" opacity="0.85">
          <circle
            cx="1220"
            cy="240"
            r="130"
            fill="none"
            stroke="#000080"
            strokeWidth="4"
            opacity="0.9"
          />
          <circle
            cx="1220"
            cy="240"
            r="122"
            fill="none"
            stroke="#000080"
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.6"
          />
          <circle cx="1220" cy="240" r="22" fill="#000080" opacity="0.95" />
          <circle cx="1220" cy="240" r="9" fill="#ffffff" />

          {/* 24 Exact Spokes */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = 1220 + 122 * Math.cos(rad);
            const y2 = 240 + 122 * Math.sin(rad);
            return (
              <line
                key={i}
                x1="1220"
                y1="240"
                x2={x2}
                y2={y2}
                stroke="#000080"
                strokeWidth="2.8"
                opacity="0.85"
              />
            );
          })}
        </g>

        {/* =================================================================
            4. MAJESTIC PROMINENT INDIA GATE (NEW DELHI)
            ================================================================= */}
        <g id="grand-india-gate" transform="translate(1030, 110) scale(1.25)">
          {/* Top Cornice Pediment */}
          <rect x="35" y="40" width="230" height="16" rx="2" fill="url(#gateSandstone)" />
          <rect x="42" y="56" width="216" height="8" fill="#7c2d12" />

          {/* Inscription Panel: INDIA */}
          <rect x="52" y="64" width="196" height="28" fill="#c2410c" />
          <text
            x="150"
            y="84"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="15"
            fontWeight="900"
            letterSpacing="7"
            fontFamily="Arial, sans-serif"
          >
            INDIA
          </text>
          <rect x="44" y="92" width="212" height="10" fill="#7c2d12" />

          {/* Main Column Mass */}
          <rect x="48" y="102" width="204" height="180" fill="url(#gateSandstone)" />

          {/* Grand Central Archway */}
          <path
            d="M 98 282 L 98 175 C 98 130 150 110 150 110 C 150 110 202 130 202 175 L 202 282 Z"
            fill="#ffffff"
            opacity="0.95"
          />

          {/* Arch Rim & Keystone */}
          <path
            d="M 94 282 L 94 175 C 94 122 150 104 150 104 C 150 104 206 122 206 175 L 206 282"
            fill="none"
            stroke="#451a03"
            strokeWidth="3.5"
          />
          <polygon points="144,104 156,104 160,116 140,116" fill="#fef08a" />

          {/* Flanking Relief Arches */}
          <path
            d="M 58 230 L 58 165 C 58 145 74 138 74 138 C 74 138 90 145 90 165 L 90 230 Z"
            fill="#7c2d12"
            opacity="0.35"
          />
          <path
            d="M 210 230 L 210 165 C 210 145 226 138 226 138 C 226 138 242 145 242 165 L 242 230 Z"
            fill="#7c2d12"
            opacity="0.35"
          />

          {/* Stepped Base Pedestals */}
          <rect x="25" y="282" width="250" height="12" rx="2" fill="#78350f" />
          <rect x="10" y="294" width="280" height="16" rx="3" fill="#451a03" />

          {/* ===============================================================
              5. AMAR JAWAN JYOTI: ETERNAL FLICKERING FLAME MEMORIAL
              =============================================================== */}
          <g id="cinema-amar-jawan-jyoti" transform="translate(150, 280)">
            {/* Black Marble Cenotaph */}
            <rect x="-18" y="-14" width="36" height="14" fill="#0f172a" rx="2" />
            {/* Inverted Bayonet & Helmet */}
            <line x1="0" y1="-14" x2="0" y2="-44" stroke="#1e293b" strokeWidth="3" />
            <path d="M -9 -44 C -9 -54 9 -54 9 -44 Z" fill="#334155" />

            {/* Flickering Sacred Flame */}
            <g className="flame-pulse-cinema">
              <ellipse cx="0" cy="-58" rx="10" ry="18" fill="#f59e0b" opacity="0.85" />
              <ellipse cx="0" cy="-55" rx="6" ry="12" fill="#ea580c" />
              <ellipse cx="0" cy="-52" rx="3" ry="6" fill="#fef08a" />
            </g>
          </g>
        </g>

        {/* =================================================================
            6. FLOATING TRICOLOR AMBIENT BREEZE PARTICLES
            ================================================================= */}
        <g id="cinema-particles">
          <circle cx="850" cy="380" r="4.5" fill="#ff9933" className="cinema-p1" />
          <circle cx="1020" cy="280" r="3.5" fill="#138808" className="cinema-p2" />
          <circle cx="1380" cy="320" r="5" fill="#f59e0b" className="cinema-p3" />
          <circle cx="1520" cy="400" r="4" fill="#138808" className="cinema-p4" />
          <circle cx="1140" cy="180" r="3" fill="#000080" className="cinema-p1" />
          <circle cx="940" cy="320" r="4" fill="#ff9933" className="cinema-p2" />
        </g>

        {/* =================================================================
            7. SOVEREIGN TRICOLOR BOTTOM HORIZON RIBBON
            ================================================================= */}
        <rect x="0" y="638" width="1600" height="4" fill="#ff9933" />
        <rect x="0" y="642" width="1600" height="4" fill="#ffffff" />
        <rect x="0" y="646" width="1600" height="4" fill="#138808" />
      </svg>

      {/* Cinematic Vignette / Readability Scrim (Frosted Left to Vibrant Right) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(255, 255, 255, 0.65) 75%, rgba(255, 255, 255, 0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
