/**
 * Auto-generate a branded SVG cover image for blog posts that don't
 * have an explicit coverImage set. Returns a base64 data URL safe for
 * use as an <img src="..."> at build time (Node.js / Astro SSG).
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Break a title into at most 3 SVG text lines, ~26 chars each. */
function wrapTitle(title: string, maxChars = 26): string[] {
  const words = title.split(' ');
  const lines: string[] = [];
  let current = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const test = current ? `${current} ${word}` : word;

    if (test.length > maxChars && current) {
      lines.push(current);
      if (lines.length >= 2) {
        const remaining = words.slice(i).join(' ');
        lines.push(remaining.length > maxChars + 6 ? remaining.slice(0, maxChars + 3) + '…' : remaining);
        return lines;
      }
      current = word;
    } else {
      current = test;
    }
  }

  if (current) lines.push(current);
  return lines;
}

/** Initials from a full name, max 2 chars. */
function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

interface CoverParams {
  title: string;
  tags?: string[];
  authorName: string;
}

const SCHEMES = [
  // 0 — navy + teal
  {
    bg1: '#061020', bg2: '#0A1628',
    accent: '#0D7377', accentLight: '#4dd6db',
    orb: '#0D7377',
    titleColor: '#ffffff', highlightColor: '#4dd6db',
    tagBg: 'rgba(13,115,119,0.18)', tagBorder: 'rgba(13,115,119,0.45)', tagText: '#4dd6db',
    divider: 'rgba(255,255,255,0.1)',
  },
  // 1 — dark navy + amber
  {
    bg1: '#0A0E1A', bg2: '#0A1628',
    accent: '#F9A825', accentLight: '#fbbf24',
    orb: '#F9A825',
    titleColor: '#ffffff', highlightColor: '#F9A825',
    tagBg: 'rgba(249,168,37,0.12)', tagBorder: 'rgba(249,168,37,0.4)', tagText: '#F9A825',
    divider: 'rgba(255,255,255,0.1)',
  },
];

export function generateCoverSvg({ title, tags = [], authorName }: CoverParams): string {
  const scheme = SCHEMES[simpleHash(title) % SCHEMES.length];
  const lines = wrapTitle(escapeXml(title));
  const tag = escapeXml((tags[0] ?? 'insight').toUpperCase());
  const authorInitials = initials(authorName);
  const authorDisplay = escapeXml(authorName);

  const fontSize = lines.length === 1 ? 56 : lines.length === 2 ? 50 : 44;
  const lineHeight = fontSize * 1.32;
  const startY = lines.length === 1 ? 230 : lines.length === 2 ? 210 : 185;

  const titleLines = lines.map((line, i) =>
    `<text x="92" y="${startY + i * lineHeight}" font-family="'Inter',sans-serif" font-size="${fontSize}" font-weight="700" fill="${scheme.titleColor}" letter-spacing="-0.02em">${line}</text>`
  ).join('\n  ');

  const afterTitle = startY + lines.length * lineHeight;
  const dividerY = afterTitle + 20;
  const descY = dividerY + 44;
  const authorY = 565;

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${scheme.bg1}"/>
      <stop offset="100%" stop-color="${scheme.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g opacity="0.055" fill="#ffffff">
    <circle cx="120" cy="120" r="2"/><circle cx="300" cy="120" r="2"/><circle cx="480" cy="120" r="2"/><circle cx="660" cy="120" r="2"/><circle cx="840" cy="120" r="2"/><circle cx="1020" cy="120" r="2"/>
    <circle cx="120" cy="300" r="2"/><circle cx="300" cy="300" r="2"/><circle cx="480" cy="300" r="2"/><circle cx="660" cy="300" r="2"/><circle cx="840" cy="300" r="2"/><circle cx="1020" cy="300" r="2"/>
    <circle cx="120" cy="480" r="2"/><circle cx="300" cy="480" r="2"/><circle cx="480" cy="480" r="2"/><circle cx="660" cy="480" r="2"/><circle cx="840" cy="480" r="2"/><circle cx="1020" cy="480" r="2"/>
  </g>
  <circle cx="1080" cy="120" r="220" fill="${scheme.orb}" opacity="0.055"/>
  <circle cx="1080" cy="120" r="130" fill="${scheme.orb}" opacity="0.055"/>
  <rect x="80" y="80" width="5" height="72" rx="3" fill="${scheme.accent}"/>
  <rect x="92" y="80" width="${Math.min(tag.length * 9 + 28, 200)}" height="30" rx="5" fill="${scheme.tagBg}" stroke="${scheme.tagBorder}" stroke-width="1"/>
  <text x="${92 + Math.min(tag.length * 9 + 28, 200) / 2}" y="99.5" font-family="'Inter',sans-serif" font-size="12" font-weight="600" fill="${scheme.tagText}" text-anchor="middle" letter-spacing="0.07em">${tag}</text>
  ${titleLines}
  <rect x="92" y="${dividerY}" width="560" height="1" fill="${scheme.divider}"/>
  <circle cx="112" cy="${authorY}" r="17" fill="${scheme.accent}"/>
  <text x="112" y="${authorY + 5.5}" font-family="'Inter',sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${authorInitials}</text>
  <text x="140" y="${authorY - 4}" font-family="'Inter',sans-serif" font-size="15" font-weight="600" fill="#ffffff" fill-opacity="0.9">${authorDisplay}</text>
</svg>`;

  // Encode as base64 data URL (Node.js Buffer, runs at build time)
  const encoded = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}
