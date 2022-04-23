import { publishedPostSchema } from "./PublishedPost/PublishedPost";
import { draftPostSchema } from "./DraftPost/DraftPost";
import { toPublishPostSchema } from "./ToPublishPost/ToPublishPost";
import { FromSchema, makeAssert } from "./validation";

const postSchema = {
  anyOf: [draftPostSchema, toPublishPostSchema, publishedPostSchema],
} as const;

export type Post = FromSchema<typeof postSchema>;

export const assertPost = makeAssert(postSchema);
