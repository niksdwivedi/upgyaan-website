# Contributing to the UpGyaan Website

Thank you for contributing. This guide covers everything you need to write a blog post, add an author profile, and raise a pull request.

---

## Getting started

### 1. Fork and clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/upgyaan-website.git
cd upgyaan-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`. Changes to Markdown files and `.astro` components hot-reload automatically.

---

## Writing a blog post

### Step 1 — Copy the template

```bash
cp src/content/blog/_template.md src/content/blog/your-post-slug.md
```

Use a slug that is:
- Lowercase, hyphen-separated (e.g. `how-to-get-promoted-faster`)
- Descriptive of the post content
- Permanent — the slug becomes the post URL

### Step 2 — Fill in the frontmatter

Open your new file and fill in every field:

```yaml
---
title: "Your Post Title"
description: "A 1–2 sentence description shown in listings and search results."
publishDate: 2025-06-01          # ISO date: YYYY-MM-DD
author: your-author-slug         # Must match a file in src/content/authors/
tags: ["career-growth", "mentorship"]
coverImage: /blog/your-image.jpg # Optional — add image to /public/blog/
featured: false
draft: false                     # Set to true while writing, false to publish
---
```

**Common tags** (use existing ones where possible):
`career-growth` · `mentorship` · `leadership` · `visibility` · `promotion` · `productivity` · `tech-industry` · `networking` · `ai`

### Step 3 — Write your post

Write in Markdown after the frontmatter closing `---`. Use `##` and `###` headings to structure your content.

**Minimum length:** 600 words

**Structure suggestion:**
1. Opening hook (a specific scenario, observation, or surprising fact)
2. 2–4 main sections with `##` headings
3. A clear, actionable takeaway at the end

### Step 4 — Add a cover image (optional but recommended)

1. Prepare an image at 1200×630px (16:9 ratio)
2. Save it to `/public/blog/your-post-slug.jpg`
3. Add `coverImage: /blog/your-post-slug.jpg` to your frontmatter

### Step 5 — Preview locally

Set `draft: false` in your frontmatter and check `http://localhost:4321/blog` — your post should appear.

---

## Adding a new author

### Step 1 — Create your author file

```bash
cp src/content/authors/nikhil-dwivedi.md src/content/authors/your-slug.md
```

Fill in all fields:

```yaml
---
name: Your Full Name
slug: your-slug           # Must match the filename (without .md)
title: Your Role / Title
bio: One sentence describing you and your connection to tech careers.
avatar: /authors/your-slug.jpg
linkedin: https://linkedin.com/in/yourprofile
twitter: https://x.com/yourhandle   # Leave empty string "" if none
---
```

### Step 2 — Add your avatar

1. Add a square photo (minimum 200×200px, ideally 400×400px) to `/public/authors/your-slug.jpg`
2. Make sure the filename matches the `avatar` field in your author file

### Step 3 — Reference yourself in your post

Use your slug as the `author` value in your post frontmatter:

```yaml
author: your-slug
```

---

## Raising a pull request

### Branch naming

```
blog/your-post-slug          # For new blog posts
author/your-name             # For new author profiles
fix/brief-description        # For corrections
```

### Before you submit

- [ ] Post is at least 600 words
- [ ] `draft: false` in frontmatter
- [ ] All frontmatter fields are filled in
- [ ] No broken links or images
- [ ] Proofread for spelling and grammar
- [ ] Author file exists and avatar is added

### What to expect in review

- A maintainer will review within a few days
- Feedback will be given as PR comments — please respond or resolve each one
- Once approved, it will be merged and deployed automatically

---

## Writing guidelines

### Tone

**Warm, intelligent, practical.** Write as if you are explaining something important to a smart colleague who respects your time and theirs.

- Not academic, not corporate, not breathlessly enthusiastic
- Honest about complexity and trade-offs
- Specific over generic — concrete examples beat abstract principles

### What belongs on the UpGyaan blog

- Career growth strategies for tech professionals
- Mentorship — how to find it, give it, and make it work
- Visibility and professional reputation
- Career transitions (IC → manager, manager → director, etc.)
- The organisational dynamics of tech companies
- Perspectives on learning, leadership, and long-term thinking

### What doesn't belong

- Vendor endorsements or product recommendations
- Promotional content of any kind
- Content that is not directly relevant to career growth in tech
- Recycled "top 10 tips" listicles

### Minimum requirements

- **600 words** minimum
- **One clear takeaway** — the reader must leave knowing what to do differently
- **Honest** — do not oversimplify complex situations
- **Original** — your own perspective, not a summary of someone else's

---

## Questions

If you have a question about the contribution process, open a [GitHub Issue](https://github.com/upgyaan/website/issues) with the `question` label.
