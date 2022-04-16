import { compile, TypeOf, v } from "suretype";
import { never } from "../never";

export const publishedPostSchema = v.object({
  draft: never(),
  title: v.string().required(),
  slug: v.string().required(),
  publishedAt: v.string().format("date-time").required(),
  updatedAt: v.string().format("date-time").required(),
  tags: v.array(v.string()),
  excerpt: v.string().required(),
  previewImage: v.string().format("uri-reference"),
});

export type PublishedPost = TypeOf<typeof publishedPostSchema>;

export const isPublishedPost: (data: unknown) => data is PublishedPost =
  compile(publishedPostSchema, {
    simple: true,
  });
