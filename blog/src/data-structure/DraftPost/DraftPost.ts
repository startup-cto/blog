import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { FromSchema } from "json-schema-to-ts";

const ajv = new Ajv();
addFormats(ajv);

export const draftPostSchema = {
  title: "draftPost",
  type: "object",
  properties: {
    title: { type: "string" },
    draft: { const: true },
    slug: { type: "string" },
    publishedAt: { type: "string", format: "date-time" },
    tags: { type: "array", items: { type: "string" } },
    excerpt: { type: "string" },
    previewImage: { type: "string", format: "uri-reference" },
  },
  required: ["draft"],
} as const;

export type DraftPost = FromSchema<typeof draftPostSchema>;
export const isDraftPost = ajv.compile(draftPostSchema);
