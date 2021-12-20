import { PostMetaData } from "../helpers/PostMetaData";

export type PostSummaryType = Pick<
  PostMetaData,
  "excerpt" | "publishedAt" | "slug" | "tags" | "title"
>;
