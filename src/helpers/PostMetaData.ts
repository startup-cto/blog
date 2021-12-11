import { z } from "zod";

const postMetaDataSchema = z.object({
  title: z.string(),
  slug: z.string(),
  publishedAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  tags: z.optional(z.array(z.string())),
  excerpt: z.string(),
});

export function assertPostMetaData(
  data: unknown
): asserts data is PostMetaData {
  postMetaDataSchema.parse(data);
}

export type PostMetaData = z.infer<typeof postMetaDataSchema>;
