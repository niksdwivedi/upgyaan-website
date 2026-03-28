# UpGyaan Website

The official website for [UpGyaan](https://upgyaan.com) — a global career growth community for tech professionals.

**Tagline:** Learn. Evolve. Thrive.

Built with [Astro 5](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and deployed on [Vercel](https://vercel.com).

---

## Local setup

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Install and run

```bash
npm install
npm run dev
```

The site will start at `http://localhost:4321`.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Brand assets

The following files are **not** committed to the repo and must be added manually:

| File | Description | Where to get it |
|------|-------------|-----------------|
| `public/brand/logo.png` | UpGyaan logo (300×100px) | Brand assets folder |
| `public/favicon.png` | Favicon (32×32px) | Brand assets folder |
| `public/authors/nikhil.svg` | Author avatar placeholder | Replace with real photo |

**To add a real author photo:**
1. Add the image to `/public/authors/your-name.jpg` (or `.png`)
2. Update the `avatar` field in `src/content/authors/your-name.md`

**To add blog cover images:**
1. Add images to `/public/blog/your-image.jpg`
2. Reference them in the post's frontmatter: `coverImage: /blog/your-image.jpg`

---

## Publishing a blog post

1. Copy `src/content/blog/_template.md` to a new file: `src/content/blog/your-post-slug.md`
2. Fill in the frontmatter fields (title, description, publishDate, author, tags)
3. Write your post in Markdown below the frontmatter
4. Set `draft: false` when ready to publish
5. Raise a pull request — see [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow

---

## Adding a new author

1. Create `src/content/authors/your-slug.md` (copy from the existing author file)
2. Fill in all frontmatter fields
3. Add your avatar to `/public/authors/your-slug.jpg`
4. Your author page will be live at `/blog/author/your-slug`

---

## Deploying to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Vercel will auto-detect Astro and configure the build settings
4. Set any required environment variables (see below)
5. Deploy — every push to `main` triggers a new deployment automatically

### Build settings (auto-detected)
- **Framework:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`

---

## Environment variables

Set these in Vercel under Project → Settings → Environment Variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SHEETS_ID` | No | ID of the Google Sheet for interest form submissions |
| `GOOGLE_CREDENTIALS` | No | Service account credentials JSON (stringified) |

See the [Google Sheets activation instructions](#activating-google-sheets-integration) below.

---

## Activating Google Sheets integration

The `/api/interest` endpoint logs form submissions to the console by default. To also write them to a Google Sheet:

1. Open `src/pages/api/interest.ts`
2. Follow the step-by-step instructions in the comments at the top of the file
3. Run `npm install googleapis`
4. Uncomment the Google Sheets code block
5. Add `GOOGLE_SHEETS_ID` and `GOOGLE_CREDENTIALS` to your Vercel environment variables
6. Redeploy

The commented code is complete and working — not pseudocode. You just need to uncomment it.

---

## Project structure

```
src/
├── content/
│   ├── blog/           ← Blog posts (.md files)
│   └── authors/        ← Author profiles (.md files)
├── pages/
│   ├── index.astro     ← Homepage
│   ├── about.astro
│   ├── newsletter.astro
│   ├── community.astro
│   ├── join.astro      ← Not linked in nav
│   ├── blog/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   └── author/[slug].astro
│   └── api/
│       └── interest.ts ← Serverless function
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPostLayout.astro
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── EmailCapture.astro
│   ├── BlogCard.astro
│   ├── AuthorCard.astro
│   └── EcosystemPillar.astro
└── styles/
    └── global.css      ← Design tokens, base styles
```

---

## Tech stack

- **Framework:** [Astro 5](https://astro.build) — static-first, zero JS by default
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- **Deployment:** [Vercel](https://vercel.com) via `@astrojs/vercel` adapter
- **Content:** Astro Content Collections — Markdown files, no CMS
- **Fonts:** Plus Jakarta Sans (headings) + Inter (body) from Google Fonts
