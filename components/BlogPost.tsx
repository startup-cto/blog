import { Post as PostType } from "../src/helpers/loadPost";
import { MDXRemote } from "next-mdx-remote";

export function BlogPost({
  post: { publishedAt, source, tags, title },
}: {
  post: Omit<PostType, "slug" | "excerpt">;
}) {
  return (
    <main>
      {publishedAt && <span>{new Date(publishedAt).toLocaleDateString()}</span>}
      {tags && <span>{tags.join(", ")}</span>}
      <h1>{title}</h1>
      <MDXRemote {...source} />
    </main>
  );
}
