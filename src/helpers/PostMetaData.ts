import { compile, TypeOf, v } from "suretype";

const postMetaDataSchema = v.object({
  title: v.string().required(),
  draft: v.boolean(),
  slug: v.string().required(),
  publishedAt: v.string().format("date-time"),
  updatedAt: v.string().format("date-time"),
  tags: v.array(v.string()),
  excerpt: v.string().required(),
});

export const assertPostMetaData: (
  data: unknown
) => asserts data is PostMetaData = compile(postMetaDataSchema, {
  ensure: true,
});
export type PostMetaData = TypeOf<typeof postMetaDataSchema>;
