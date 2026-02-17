import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    authorImage: z.string().optional(),
    authorName: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    noindex: z.boolean().default(false),
    categories: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keyTakeaways: z.string().optional(),
    webflowItemId: z.string().optional(),
  }),
});

export const collections = { blog };
