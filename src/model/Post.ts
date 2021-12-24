import { publishedPostSchema } from "./PublishedPost";
import { draftPostSchema } from "./DraftPost";
import { compile, TypeOf, v } from "suretype";

const postSchema = v.anyOf([publishedPostSchema, draftPostSchema]);

export type Post = TypeOf<typeof postSchema>;

export const assertPost: (data: unknown) => asserts data is Post = compile(
  postSchema,
  {
    ensure: true,
  }
);
