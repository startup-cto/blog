import { compile, TypeOf, v } from "suretype";

export const toPublishPostSchema = v.object({
  draft: v.unknown(),
  title: v.string().required(),
  slug: v.string().required(),
  publishedAt: v.unknown(),
  updatedAt: v.unknown(),
  tags: v.array(v.string()),
  excerpt: v.string().required(),
  previewImage: v.string().format("uri-reference"),
});

export type ToPublishPost = TypeOf<typeof toPublishPostSchema>;

export const isToPublishPost: (data: unknown) => data is ToPublishPost =
  compile(toPublishPostSchema, {
    simple: true,
  });
