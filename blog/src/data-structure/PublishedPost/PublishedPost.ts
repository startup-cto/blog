import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { FromSchema } from "json-schema-to-ts";

const ajv = new Ajv();
addFormats(ajv);

export const publishedPostSchema = {
  title: "publishedPost",
  type: "object",
  properties: {
    title: { type: "string" },
    draft: { not: {} },
    slug: { type: "string" },
    publishedAt: { type: "string", format: "date-time" },
    tags: { type: "array", items: { type: "string" } },
    excerpt: { type: "string" },
    previewImage: { type: "string", format: "uri-reference" },
  },
  required: ["title", "slug", "excerpt", "publishedAt"],
} as const;

export type PublishedPost = FromSchema<typeof publishedPostSchema>;

export const isPublishedPost = ajv.compile(publishedPostSchema);
