import { type FromSchema, makeIsType } from "validation";

export const toPublishPostSchema = {
  title: "toPublishPost",
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    draft: { not: {} },
    slug: { type: "string" },
    publishedAt: { not: {} },
    tags: { type: "array", items: { type: "string" } },
    excerpt: { type: "string" },
    previewImage: { type: "string", format: "uri-reference" },
  },
  required: ["title", "slug", "excerpt", "content"],
} as const;

export type ToPublishPost = FromSchema<typeof toPublishPostSchema>;

export const isToPublishPost = makeIsType<ToPublishPost>(toPublishPostSchema);

const x: unknown = {};

if (isToPublishPost(x)) {
  const y: ToPublishPost = x;
  console.log(y);
}
