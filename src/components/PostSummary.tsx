import { Post } from "../helpers/loadPost";

interface Props {
  post: Pick<Post, "excerpt" | "publishedAt" | "slug" | "tags" | "title">;
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
