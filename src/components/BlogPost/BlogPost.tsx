import { Post as PostType } from "../../helpers/loadPost";
import { MDXRemote } from "next-mdx-remote";
import styles from "./BlogPost.module.css";
import "prismjs/themes/prism-tomorrow.css";
import Script from "next/script";

export function BlogPost({
  post: { publishedAt, source, tags, title },
}: {
  post: Pick<PostType, "publishedAt" | "source" | "tags" | "title">;
}) {
  return (
    <main className={styles.container}>
      {publishedAt && (
        <time dateTime={publishedAt} className={styles.publishDate}>
          {new Date(publishedAt).toLocaleDateString()}
        </time>
      )}
      {tags && <span className={styles.tags}>{tags.join(", ")}</span>}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <MDXRemote {...source} />
      </div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/prism.min.js"
        async
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/autoloader/prism-autoloader.min.js"
        async
      />
      <Script
        async
        id="start-prism"
      >{`setTimeout(function(){Prism.highlightAll();},100)`}</Script>
    </main>
  );
}
