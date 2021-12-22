import { compile, TypeOf, v } from "suretype";

const publishedPostSchema = v.object({
  content: v.string().required(),
  title: v.string().required(),
  slug: v.string().required(),
  publishedAt: v.string().format("date-time").required(),
  updatedAt: v.string().format("date-time").required(),
  tags: v.array(v.string()).required(),
  excerpt: v.string().required(),
  previewImage: v.string().format("uri-reference").required(),
});

export type PublishedPost = TypeOf<typeof publishedPostSchema>;

export const isPublishedPost: (data: unknown) => data is PublishedPost =
  compile(publishedPostSchema, {
    simple: true,
  });
