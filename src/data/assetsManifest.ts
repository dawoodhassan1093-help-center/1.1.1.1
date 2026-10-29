// Asset manifest linking real generated images and themed visual assets

export const REAL_ASSETS = {
  titleBanner: '/assets/images/title_banner_1793286790237.jpg',
  crimeSceneStudy: '/assets/images/crime_scene_study_1793286806633.jpg',
  crimeSceneWarehouse: '/assets/images/crime_scene_warehouse_1793286908668.jpg',
  corkboardBg: '/assets/images/corkboard_bg_1793286925196.jpg',
  suspectEvelyn: '/assets/images/suspect_evelyn_1793286820621.jpg',
  suspectHarrington: '/assets/images/suspect_harrington_1793286835635.jpg',
  suspectFinch: '/assets/images/suspect_finch_1793286854510.jpg',
  evidenceWatch: '/assets/images/evidence_watch_1793286873156.jpg',
  evidenceLetter: '/assets/images/evidence_letter_1793286889040.jpg',
};

/**
 * Returns a high-quality SVG data-URI for a noir suspect portrait if a photograph file isn't assigned,
 * with customizable styling, gender/archetype features, silhouette, lighting, and vintage mugshot badge.
 */
export function generateThemedPortrait(name: string, role: string, seed: number): string {
  // Generate deterministic variations based on seed
  const shades = ['#1a1921', '#211e2b', '#181e24', '#261c1c', '#1b221c'];
  const skinTones = ['#e0c3a8', '#caa384', '#a87e5b', '#f3d9c2', '#8d5b4c', '#d1b29a'];
  const hairColors = ['#1a1715', '#4a3b32', '#784d28', '#c0a080', '#9c9a96', '#2d251e'];
  
  const bg = shades[seed % shades.length];
  const skin = skinTones[(seed * 3) % skinTones.length];
  const hair = hairColors[(seed * 7) % hairColors.length];
  const hasGlasses = seed % 3 === 0;
  const hasMustache = seed % 4 === 1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="#07070a" />
      </linearGradient>
      <filter id="grain${seed}">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </defs>
    <!-- Background & Height Scale Lines -->
    <rect width="400" height="400" fill="url(#g${seed})" />
    <g stroke="rgba(255,255,255,0.07)" stroke-width="1.5">
      <line x1="40" y1="80" x2="360" y2="80" /><text x="48" y="76" fill="rgba(255,255,255,0.18)" font-family="monospace" font-size="11">6' 2"</text>
      <line x1="40" y1="130" x2="360" y2="130" /><text x="48" y="126" fill="rgba(255,255,255,0.18)" font-family="monospace" font-size="11">5' 10"</text>
      <line x1="40" y1="180" x2="360" y2="180" /><text x="48" y="176" fill="rgba(255,255,255,0.18)" font-family="monospace" font-size="11">5' 6"</text>
      <line x1="40" y1="230" x2="360" y2="230" /><text x="48" y="226" fill="rgba(255,255,255,0.18)" font-family="monospace" font-size="11">5' 2"</text>
    </g>
    <!-- Body & Shoulders Silhouette -->
    <path d="M 80 400 C 90 310, 140 270, 200 270 C 260 270, 310 310, 320 400 Z" fill="#121318" />
    <path d="M 170 270 L 200 320 L 230 270 Z" fill="#e2e0d8" />
    <path d="M 195 270 L 200 320 L 205 270 Z" fill="#881515" />
    <!-- Neck & Head -->
    <rect x="175" y="210" width="50" height="70" rx="6" fill="${skin}" />
    <!-- Head Oval -->
    <ellipse cx="200" cy="180" rx="55" ry="68" fill="${skin}" />
    <!-- Hair -->
    <path d="M 140 170 C 140 115, 170 105, 200 105 C 230 105, 260 115, 260 170 C 240 135, 215 130, 200 130 C 175 130, 155 140, 140 170 Z" fill="${hair}" />
    <!-- Facial Features: Eyes, Brows, Nose, Mouth -->
    <path d="M 165 160 Q 175 156 185 160" stroke="#222" stroke-width="3" fill="none" />
    <path d="M 215 160 Q 225 156 235 160" stroke="#222" stroke-width="3" fill="none" />
    <circle cx="175" cy="172" r="4.5" fill="#1b1c20" />
    <circle cx="225" cy="172" r="4.5" fill="#1b1c20" />
    <circle cx="176" cy="171" r="1.5" fill="#ffffff" />
    <circle cx="226" cy="171" r="1.5" fill="#ffffff" />
    <!-- Nose -->
    <path d="M 200 170 L 200 195 L 208 198" stroke="rgba(0,0,0,0.35)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Mouth -->
    <path d="M 185 220 Q 200 225 215 220" stroke="#773333" stroke-width="3" fill="none" stroke-linecap="round" />
    ${hasMustache ? '<path d="M 180 208 Q 200 213 220 208 Q 200 216 180 208 Z" fill="' + hair + '" />' : ''}
    ${hasGlasses ? '<circle cx="175" cy="172" r="15" stroke="#c4a45a" stroke-width="2.5" fill="none" /><circle cx="225" cy="172" r="15" stroke="#c4a45a" stroke-width="2.5" fill="none" /><line x1="190" y1="172" x2="210" y2="172" stroke="#c4a45a" stroke-width="2" />' : ''}
    <!-- Harsh noir lighting shadow over one side -->
    <path d="M 200 100 Q 255 105 255 240 Q 200 260 200 100 Z" fill="rgba(0,0,0,0.3)" />
    <!-- Booking placard -->
    <g transform="translate(70, 315)">
      <rect width="260" height="65" rx="4" fill="#0d0d10" stroke="#444" stroke-width="1.5" />
      <rect x="3" y="3" width="254" height="59" fill="#15151b" />
      <text x="130" y="24" text-anchor="middle" fill="#d4af37" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="1.5">${name.toUpperCase()}</text>
      <text x="130" y="42" text-anchor="middle" fill="#a0a0a8" font-family="monospace" font-size="10">${role.toUpperCase()}</text>
      <text x="130" y="55" text-anchor="middle" fill="#666" font-family="monospace" font-size="8">BOOKING FILE #${seed.toString().padStart(4, '0')}-SC</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns a high-quality SVG data-URI for evidence items if a custom photo isn't mapped.
 */
export function generateThemedEvidence(title: string, category: string, seed: number): string {
  const isDocument = category === 'document';
  const isWeapon = title.toLowerCase().includes('knife') || title.toLowerCase().includes('pistol') || title.toLowerCase().includes('blade') || title.toLowerCase().includes('revolver');
  const isToxic = title.toLowerCase().includes('poison') || title.toLowerCase().includes('vial') || title.toLowerCase().includes('toxin');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <rect width="400" height="400" fill="#121216" />
    <!-- Slate / dark background texture -->
    <pattern id="slate" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#16171d" />
      <path d="M0 20 L40 20 M20 0 L20 40" stroke="#1f2129" stroke-width="1" />
    </pattern>
    <rect width="400" height="400" fill="url(#slate)" opacity="0.4" />
    <!-- Evidence marker yellow tag -->
    <polygon points="40,50 90,50 110,95 20,95" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
    <text x="65" y="85" text-anchor="middle" font-family="monospace" font-size="28" font-weight="bold" fill="#000">#${(seed % 9) + 1}</text>
    
    <!-- Central Evidence Item Visual -->
    <g transform="translate(200, 200)">
      ${isDocument ? `
        <!-- Burnt or Typed Letter -->
        <rect x="-90" y="-110" width="180" height="220" rx="2" fill="#e8dec6" stroke="#b09f7a" stroke-width="2" />
        <line x1="-70" y1="-70" x2="60" y2="-70" stroke="#333" stroke-width="3" stroke-dasharray="10, 4" />
        <line x1="-70" y1="-45" x2="70" y2="-45" stroke="#333" stroke-width="3" stroke-dasharray="12, 5" />
        <line x1="-70" y1="-20" x2="50" y2="-20" stroke="#333" stroke-width="3" stroke-dasharray="8, 6" />
        <line x1="-70" y1="5" x2="65" y2="5" stroke="#333" stroke-width="3" stroke-dasharray="14, 4" />
        <circle cx="20" cy="-20" r="28" stroke="#dc2626" stroke-width="3" fill="none" opacity="0.8" />
        <path d="M 60 70 Q 90 90 90 110 L -40 110 Z" fill="#2d1b0d" opacity="0.7" />
      ` : isWeapon ? `
        <!-- Weapon / Dagger Silhouette -->
        <rect x="-10" y="-120" width="20" height="180" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
        <polygon points="-10,60 10,60 0,95" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
        <rect x="-40" y="-120" width="80" height="15" rx="3" fill="#d97706" />
        <rect x="-12" y="-160" width="24" height="40" rx="4" fill="#78350f" />
        <circle cx="0" cy="40" r="14" fill="#991b1b" opacity="0.7" />
      ` : isToxic ? `
        <!-- Chemical / Poison Flask -->
        <rect x="-15" y="-110" width="30" height="50" fill="#94a3b8" />
        <path d="M -15 -60 L -70 80 Q -70 100 0 100 Q 70 100 70 80 L 15 -60 Z" fill="#38bdf8" opacity="0.35" stroke="#0284c7" stroke-width="3" />
        <path d="M -60 75 Q 0 85 60 75 L 50 30 Q 0 40 -50 30 Z" fill="#22c55e" opacity="0.65" />
        <text x="0" y="65" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">POISON</text>
      ` : `
        <!-- Physical Object / Clue Emblem -->
        <circle cx="0" cy="0" r="85" fill="#1e2230" stroke="#d4af37" stroke-width="4" />
        <circle cx="0" cy="0" r="72" stroke="#d4af37" stroke-dasharray="6,4" fill="none" stroke-width="1.5" />
        <circle cx="0" cy="0" r="48" fill="#2b3145" />
        <path d="M -30 -10 L 0 -40 L 30 -10 L 15 35 L -15 35 Z" fill="#d4af37" opacity="0.85" />
      `}
    </g>

    <!-- Forensic Metric Ruler at bottom -->
    <g transform="translate(40, 350)">
      <rect width="320" height="28" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
      ${Array.from({ length: 17 }).map((_, i) => `<line x1="${i * 20}" y1="0" x2="${i * 20}" y2="${i % 5 === 0 ? 18 : 10}" stroke="#0f172a" stroke-width="1.5" />`).join('')}
      <text x="10" y="22" font-family="monospace" font-size="9" fill="#000">0cm</text>
      <text x="300" y="22" font-family="monospace" font-size="9" fill="#000">16cm</text>
    </g>
    <!-- Label -->
    <rect x="40" y="305" width="320" height="34" rx="2" fill="rgba(0,0,0,0.8)" stroke="#d4af37" stroke-width="1" />
    <text x="200" y="327" text-anchor="middle" fill="#d4af37" font-family="monospace" font-size="12" font-weight="bold">${title.slice(0, 32).toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns a themed crime scene illustration or photograph for a case.
 */
export function generateThemedCrimeScene(locationName: string, category: string, seed: number): string {
  // Use real photograph for cases 1 and 2
  if (seed === 1) return REAL_ASSETS.crimeSceneStudy;
  if (seed === 2) return REAL_ASSETS.crimeSceneWarehouse;

  const palettes: Record<string, [string, string, string]> = {
    'Mansions & Estates': ['#171216', '#2b1b22', '#d4af37'],
    'Urban Noir & Alleys': ['#0f141c', '#1e2638', '#38bdf8'],
    'Transit & Voyages': ['#191512', '#2d221c', '#f59e0b'],
    'Science & Esoteric': ['#0d1715', '#162e28', '#10b981'],
    'Art & Antiquities': ['#18141e', '#2c1e38', '#ec4899'],
    'Default': ['#111318', '#1f2430', '#e2e8f0'],
  };

  const [c1, c2, accent] = palettes[category] || palettes['Default'];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <linearGradient id="sceneGrad${seed}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="65%" stop-color="${c2}" />
        <stop offset="100%" stop-color="#0a0a0d" />
      </linearGradient>
      <radialGradient id="lightCone${seed}" cx="0.5" cy="0.1" r="0.7">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.25" />
        <stop offset="100%" stop-color="transparent" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#sceneGrad${seed})" />
    <rect width="1280" height="720" fill="url(#lightCone${seed})" />

    <!-- Architectural Background elements -->
    <path d="M 0 520 L 1280 520" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
    <path d="M 200 150 L 350 150 L 350 520 L 200 520 Z" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.05)" />
    <path d="M 500 120 L 780 120 L 780 520 L 500 520 Z" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" />
    <path d="M 930 180 L 1100 180 L 1100 520 L 930 520 Z" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.05)" />

    <!-- Rain / Fog lines -->
    <g stroke="rgba(255,255,255,0.06)" stroke-width="1.5">
      ${Array.from({ length: 24 }).map((_, i) => `<line x1="${i * 55 + 20}" y1="0" x2="${i * 55 - 40}" y2="720" stroke-dasharray="20, 45" />`).join('')}
    </g>

    <!-- Crime Scene Evidence Markers On Floor -->
    <polygon points="460,560 490,560 500,590 450,590" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
    <text x="475" y="582" font-family="monospace" font-size="18" font-weight="bold" fill="#000" text-anchor="middle">1</text>

    <polygon points="760,580 790,580 800,610 750,610" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
    <text x="775" y="602" font-family="monospace" font-size="18" font-weight="bold" fill="#000" text-anchor="middle">2</text>

    <polygon points="620,630 650,630 660,660 610,660" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
    <text x="635" y="652" font-family="monospace" font-size="18" font-weight="bold" fill="#000" text-anchor="middle">3</text>

    <!-- Chalk Outline Silhouette -->
    <path d="M 600 540 Q 620 530 640 540 Q 660 560 650 580 Q 640 600 660 620 L 670 650 M 640 600 L 610 650 M 610 560 L 580 570" stroke="#f1f5f9" stroke-width="3" stroke-dasharray="8,6" fill="none" opacity="0.45" />

    <!-- Police Tape Banner Header -->
    <g transform="translate(0, 40) rotate(-1)">
      <rect x="-20" y="0" width="1320" height="36" fill="#eab308" opacity="0.88" />
      <text x="640" y="24" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" letter-spacing="4" fill="#000000">CRIME SCENE - DO NOT CROSS - CRIME SCENE - DO NOT CROSS</text>
    </g>

    <!-- Location Name Plate -->
    <g transform="translate(50, 640)">
      <rect width="400" height="50" rx="4" fill="rgba(10,10,14,0.9)" stroke="#d4af37" stroke-width="1.5" />
      <text x="20" y="24" fill="#e2e8f0" font-family="serif" font-size="16" font-weight="bold">${locationName.toUpperCase()}</text>
      <text x="20" y="42" fill="#94a3b8" font-family="monospace" font-size="11">PRIMARY INVESTIGATION SECTOR</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
