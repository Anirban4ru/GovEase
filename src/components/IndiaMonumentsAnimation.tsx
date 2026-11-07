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
          0% { transform: scale(0.94, 0.96); opacity: 0.88; filter: drop-shadow(0 0 6px #f59e0b); }
          50% { transform: scale(1.12, 1.24); opacity: 1; filter: drop-shadow(0 0 16px #ea580c); }
          100% { transform: scale(0.92, 1.04); opacity: 0.92; filter: drop-shadow(0 0 10px #f97316); }
        }
        @keyframes particleBreeze {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.25; }
          50% { transform: translateY(-24px) translateX(12px); opacity: 0.85; }
          100% { transform: translateY(-48px) translateX(-6px); opacity: 0; }
        }
        @keyframes sunRadiance {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.06); }
        }
        .chakra-spin-cinema {
          transform-origin: 1200px 205px;
          animation: chakraSpin 45s linear infinite;
        }
        .flame-pulse-cinema {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flameFlicker 1.35s ease-in-out infinite alternate;
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
            <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.95" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ecfdf5" stopOpacity="0.95" />
          </linearGradient>

          {/* Golden Sun & Sacred Radiance Centered at X=1200 */}
          <radialGradient id="sacredSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* India Gate Dark Rich Terracotta / Sandstone Gradient */}
          <linearGradient id="gateSandstone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="20%" stopColor="#b91c1c" />
            <stop offset="60%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>

          {/* Polished Brass Diya Gradient */}
          <linearGradient id="diyaBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="80%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Taj Mahal Pearlescent Marble */}
          <linearGradient id="tajSilhouette" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.55" />
          </linearGradient>

          {/* Distant Monument Skyline Gradient */}
          <linearGradient id="monumentSkyline" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d3570" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#0d3570" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        {/* Ambient Sky Fill */}
        <rect width="1600" height="650" fill="url(#cinemaSky)" />

        {/* Golden Sun Aura Behind Chakra (Symmetrical at X=1200) */}
        <circle cx="1200" cy="205" r="230" fill="url(#sacredSun)" />

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
          <line x1="220" y1="60" x2="220" y2="25" stroke="#475569" strokeWidth="3" />
          <polygon points="216,40 224,40 220,20" fill="#475569" />
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
          <rect x="44" y="110" width="30" height="8" rx="2" fill="#0d3570" opacity="0.45" />
          <rect x="40" y="180" width="38" height="9" rx="2" fill="#0d3570" opacity="0.45" />
          <rect x="36" y="250" width="46" height="10" rx="2" fill="#0d3570" opacity="0.45" />
          <polygon points="56,60 59,35 62,60" />

          {/* Red Fort Bastions */}
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
            3. ROTATING ASHOKA CHAKRA (Deep Royal Navy • 24 Spokes • Symmetrical Axis X=1200)
            ================================================================= */}
        <g className="chakra-spin-cinema" opacity="0.95">
          <circle
            cx="1200"
            cy="205"
            r="135"
            fill="none"
            stroke="#000080"
            strokeWidth="4.2"
            opacity="0.95"
          />
          <circle
            cx="1200"
            cy="205"
            r="127"
            fill="none"
            stroke="#000080"
            strokeWidth="2.2"
            strokeDasharray="5 5"
            opacity="0.75"
          />
          <circle cx="1200" cy="205" r="24" fill="#000080" opacity="0.95" />
          <circle cx="1200" cy="205" r="10" fill="#ffffff" />

          {/* 24 Exact Symmetrical Spokes Centered at (1200, 205) */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = 1200 + 127 * Math.cos(rad);
            const y2 = 205 + 127 * Math.sin(rad);
            return (
              <line
                key={i}
                x1="1200"
                y1="205"
                x2={x2}
                y2={y2}
                stroke="#000080"
                strokeWidth="3.2"
                opacity="0.9"
              />
            );
          })}
        </g>

        {/* =================================================================
            4. MAJESTIC INDIA GATE (NEW DELHI • 100% Symmetrical on Axis X=1200)
            ================================================================= */}
        <g id="grand-india-gate">
          {/* Top Cornice Pediments */}
          <rect x="1050" y="148" width="300" height="18" rx="2" fill="url(#gateSandstone)" />
          <rect x="1060" y="166" width="280" height="10" fill="#450a0a" />

          {/* Inscription Panel: INDIA */}
          <rect x="1070" y="176" width="260" height="34" fill="#991b1b" />
          <text
            x="1200"
            y="200"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="17"
            fontWeight="900"
            letterSpacing="8"
            fontFamily="Arial, sans-serif"
          >
            INDIA
          </text>
          <rect x="1060" y="210" width="280" height="12" fill="#450a0a" />

          {/* Main Column Mass */}
          <rect x="1065" y="222" width="270" height="238" fill="url(#gateSandstone)" />

          {/* Grand Central Symmetrical Archway (Backdrop Portal) */}
          <path
            d="M 1135 460 L 1135 320 C 1135 255 1200 230 1200 230 C 1200 230 1265 255 1265 320 L 1265 460 Z"
            fill="#ffffff"
            opacity="0.96"
          />

          {/* Arch Rim Moulding & Symmetrical Keystone */}
          <path
            d="M 1130 460 L 1130 320 C 1130 248 1200 222 1200 222 C 1200 222 1270 248 1270 320 L 1270 460"
            fill="none"
            stroke="#450a0a"
            strokeWidth="4"
          />
          <polygon points="1192,222 1208,222 1214,236 1186,236" fill="#fef08a" />

          {/* Flanking Relief Arches */}
          <path
            d="M 1078 380 L 1078 290 C 1078 265 1098 255 1098 255 C 1098 255 1118 265 1118 290 L 1118 380 Z"
            fill="#450a0a"
            opacity="0.4"
          />
          <path
            d="M 1282 380 L 1282 290 C 1282 265 1302 255 1302 255 C 1302 255 1322 265 1322 290 L 1322 380 Z"
            fill="#450a0a"
            opacity="0.4"
          />

          {/* Stepped Pedestal Base */}
          <rect x="1040" y="460" width="320" height="16" rx="2" fill="#7f1d1d" />
          <rect x="1015" y="476" width="370" height="20" rx="3" fill="#450a0a" />
          <rect x="990" y="496" width="420" height="24" rx="4" fill="#260505" />

          {/* ===============================================================
              5. AMAR JAWAN JYOTI: CEREMONIAL BRASS DIYA & ETERNAL FLAME
              Centered exactly on X=1200 inside the archway
              =============================================================== */}
          <g id="amar-jawan-jyoti-memorial">
            {/* Black Granite Cenotaph */}
            <rect x="1170" y="442" width="60" height="18" rx="2" fill="#0f172a" />
            <rect x="1178" y="451" width="44" height="2" fill="#d97706" />

            {/* Inverted Memorial L1A1 Rifle & Soldier Helmet */}
            <line x1="1200" y1="442" x2="1200" y2="398" stroke="#1e293b" strokeWidth="3.5" />
            <path d="M 1190 398 C 1190 386 1210 386 1210 398 Z" fill="#334155" />

            {/* Ceremonial Brass Diya Bowl (Centered at X=1200) */}
            <g id="ceremonial-diya">
              {/* Diya Base Stand */}
              <polygon points="1192,442 1208,442 1205,436 1195,436" fill="#b45309" />
              {/* Diya Bowl Curve */}
              <path
                d="M 1182 436 C 1182 446 1218 446 1218 436 C 1222 434 1225 431 1225 429 C 1218 431 1200 433 1182 436 Z"
                fill="url(#diyaBrass)"
              />
              {/* Golden Rim */}
              <ellipse cx="1200" cy="433" rx="16" ry="3.5" fill="#fde047" opacity="0.8" />
            </g>

            {/* Sacred Flickering Jyoti / Flame (Centered at X=1200, Y=428) */}
            <g className="flame-pulse-cinema">
              {/* Outer Golden Flame */}
              <path
                d="M 1200 378 C 1184 405 1188 424 1200 428 C 1212 424 1216 405 1200 378 Z"
                fill="#f59e0b"
                opacity="0.9"
              />
              {/* Vibrant Saffron Core Flame */}
              <path
                d="M 1200 390 C 1190 410 1193 425 1200 427 C 1207 425 1210 410 1200 390 Z"
                fill="#ea580c"
              />
              {/* Inner Radiant Light */}
              <path
                d="M 1200 404 C 1196 418 1197 425 1200 426 C 1203 425 1204 418 1200 404 Z"
                fill="#fef08a"
              />
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

      {/* Cinematic Vignette / Readability Scrim (Frosted Left to Vibrant Dark Right) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 36%, rgba(255, 255, 255, 0.32) 68%, rgba(255, 255, 255, 0.05) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
