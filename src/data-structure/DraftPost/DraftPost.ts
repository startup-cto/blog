import { compile, TypeOf, v } from "suretype";

export const draftPostSchema = v.object({
  title: v.string(),
  draft: v.boolean().const(true).required(),
  slug: v.string(),
  publishedAt: v.string().format("date-time"),
  updatedAt: v.string().format("date-time"),
  tags: v.array(v.string()),
  excerpt: v.string(),
  previewImage: v.string().format("uri-reference"),
});

export type DraftPost = TypeOf<typeof draftPostSchema>;

export const isDraftPost: (data: unknown) => data is DraftPost = compile(
  draftPostSchema,
  {
    simple: true,
  }
);
