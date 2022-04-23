import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { FromSchema } from "json-schema-to-ts";

const ajv = new Ajv();
addFormats(ajv);

export const toPublishPostSchema = {
  title: "toPublishPost",
  type: "object",
  properties: {
    title: { type: "string" },
    draft: { not: {} },
    slug: { type: "string" },
    publishedAt: { not: {} },
    tags: { type: "array", items: { type: "string" } },
    excerpt: { type: "string" },
    previewImage: { type: "string", format: "uri-reference" },
  },
  required: ["title", "slug", "excerpt"],
} as const;

export type ToPublishPost = FromSchema<typeof toPublishPostSchema>;

export const isToPublishPost = ajv.compile(toPublishPostSchema);
