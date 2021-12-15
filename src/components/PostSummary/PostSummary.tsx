import { Post } from "../../helpers/loadPost";

export type PostSummaryType = Pick<
  Post,
  "excerpt" | "publishedAt" | "slug" | "tags" | "title"
>;

interface Props {
  post: PostSummaryType;
}

export function PostSummary({
  post: { excerpt, publishedAt, slug, tags, title },
}: Props) {
  return (
    <article>
      {publishedAt && <span>{new Date(publishedAt).toLocaleDateString()}</span>}
      {tags && <span>{tags.join(", ")}</span>}
      <a href={slug}>{title}</a>
      <p>{excerpt}</p>
    </article>
  );
}
