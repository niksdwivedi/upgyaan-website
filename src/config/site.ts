/**
 * UpGyaan Site Configuration
 * ─────────────────────────────────────────────────────────────
 * Edit this file to update contact details, social links, and
 * other shared values. Every page on the site pulls from here.
 */

export const siteConfig = {
  name: 'UpGyaan',
  tagline: 'Learn. Evolve. Thrive.',
  url: 'https://upgyaan.com',
  description:
    'UpGyaan is a global career growth community for tech professionals — freshers, mid-career professionals, and senior leaders.',

  // ── Contact ──────────────────────────────────────────────
  contact: {
    email: 'hello@upgyaan.com',
    // Leave blank if not yet available — blank values are hidden from the UI
    phone: '',
    address: '',
  },

  // ── Social profiles ───────────────────────────────────────
  // Leave blank to hide a specific link across the site
  social: {
    linkedin: 'https://linkedin.com/company/upgyaan',
    twitter: '',
    instagram: '',
    youtube: '',
  },
} as const;
