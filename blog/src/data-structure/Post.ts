import { FromSchema, makeAssertType } from "validation";

import { publishedPostSchema } from "./PublishedPost/PublishedPost";
import { draftPostSchema } from "./DraftPost/DraftPost";
import { toPublishPostSchema } from "./ToPublishPost/ToPublishPost";

const postSchema = {
  anyOf: [draftPostSchema, toPublishPostSchema, publishedPostSchema],
} as const;

export type Post = FromSchema<typeof postSchema>;

export const assertPost: (data: unknown) => asserts data is Post =
  makeAssertType(postSchema);
