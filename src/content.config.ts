import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    title: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),   // Optional — system auto-derives from Twitter/LinkedIn if omitted
    linkedin: z.string().url(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!_*.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(), // slug matching the authors collection
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { authors, blog };
