import { Post } from "../src/helpers/loadPost";

interface Props {
  post: Post;
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
