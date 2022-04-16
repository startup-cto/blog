import { publishedPostSchema } from "./PublishedPost/PublishedPost";
import { draftPostSchema } from "./DraftPost/DraftPost";
import { compile, TypeOf, v } from "suretype";
import { toPublishPostSchema } from "./ToPublishPost/ToPublishPost";

const postSchema = v.anyOf([
  toPublishPostSchema,
  publishedPostSchema,
  draftPostSchema,
]);

export type Post = TypeOf<typeof postSchema>;

export const assertPost: (data: unknown) => asserts data is Post = compile(
  postSchema,
  {
    ensure: true,
  }
);
