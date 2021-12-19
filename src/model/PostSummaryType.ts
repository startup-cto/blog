import { Post } from "../helpers/loadPost";

export type PostSummaryType = Pick<
  Post,
  "excerpt" | "publishedAt" | "slug" | "tags" | "title"
>;
