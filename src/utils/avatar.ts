/**
 * Avatar resolution utility
 * ─────────────────────────────────────────────────────────────
 * Returns the best available avatar URL for an author in priority order:
 *   1. Explicit avatar field (if set and non-empty)
 *   2. Twitter/X handle  → unavatar.io (free, fetches from Twitter)
 *   3. LinkedIn username → unavatar.io (fetches from LinkedIn)
 *   4. DiceBear initials → generated, always works, no account needed
 *
 * This means authors don't need to upload a photo — setting their
 * Twitter or LinkedIn handle in the author frontmatter is enough.
 */

export interface AvatarParams {
  name: string;
  avatar?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Extract a Twitter/X handle from a full profile URL or bare handle.
 * e.g. "https://x.com/Niks_Dwivedi" → "Niks_Dwivedi"
 *      "@Niks_Dwivedi"               → "Niks_Dwivedi"
 */
function extractTwitterHandle(raw: string): string {
  return raw.trim()
    .replace(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\//i, '')
    .replace(/^@/, '')
    .split('/')[0]
    .split('?')[0]
    .trim();
}

/**
 * Extract a LinkedIn username from a full profile URL.
 * e.g. "https://www.linkedin.com/in/niksdwivedi/" → "niksdwivedi"
 */
function extractLinkedInUsername(raw: string): string {
  return raw.trim()
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '')
    .replace(/\/$/, '')
    .split('/')[0]
    .split('?')[0]
    .trim();
}

/**
 * Returns a DiceBear initials avatar URL — no external account required,
 * generates a coloured circle with the author's initials.
 */
function dicebearInitials(name: string): string {
  const seed = encodeURIComponent(name.trim());
  return `https://api.dicebear.com/8.x/initials/svg?seed=${seed}&backgroundColor=0d7377&textColor=ffffff&fontSize=38&fontWeight=600`;
}

export function getAvatarUrl(params: AvatarParams): string {
  const { name, avatar, twitter, linkedin } = params;

  // 1. Explicit avatar (local file or absolute URL) — author chose to set one
  if (avatar && avatar.trim()) {
    return avatar.trim();
  }

  const dicebear = dicebearInitials(name);
  const linkedinUrl = linkedin?.trim()
    ? `https://unavatar.io/linkedin/${extractLinkedInUsername(linkedin)}`
    : null;

  // 2. Twitter/X → falls back to LinkedIn if available, then DiceBear
  if (twitter && twitter.trim()) {
    const handle = extractTwitterHandle(twitter);
    if (handle) {
      const fallback = linkedinUrl ?? dicebear;
      return `https://unavatar.io/twitter/${handle}?fallback=${encodeURIComponent(fallback)}`;
    }
  }

  // 3. LinkedIn only (no Twitter set)
  if (linkedinUrl) return linkedinUrl;

  // 4. DiceBear initials — always works as a last resort
  return dicebear;
}
