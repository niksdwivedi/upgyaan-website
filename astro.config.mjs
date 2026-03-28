import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://upgyaan.com',
  adapter: vercel(),
  integrations: [
    sitemap({
      // Exclude hidden pages from the public sitemap
      filter: (page) => !page.includes('/join') && !page.includes('/newsletter'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
