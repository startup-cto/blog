import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { FromSchema } from "json-schema-to-ts";

import { publishedPostSchema } from "./PublishedPost/PublishedPost";
import { draftPostSchema } from "./DraftPost/DraftPost";
import { toPublishPostSchema } from "./ToPublishPost/ToPublishPost";
import { makeAssert } from "./validation/makeAssert";

const ajv = new Ajv();
addFormats(ajv);

const postSchema = {
  anyOf: [draftPostSchema, toPublishPostSchema, publishedPostSchema],
} as const;

export type Post = FromSchema<typeof postSchema>;

export const assertPost = makeAssert(postSchema);
