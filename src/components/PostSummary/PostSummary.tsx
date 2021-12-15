import { Post } from "../../helpers/loadPost";
import styles from "./PostSummary.module.css";

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
    <article className={styles.container}>
      {publishedAt && (
        <time className={styles.publishDate} dateTime={publishedAt}>
          {new Date(publishedAt).toLocaleDateString()}
        </time>
      )}
      {tags && <span className={styles.tags}>{tags.join(", ")}</span>}
      <a href={slug}>
        <h1 className={styles.title}>{title}</h1>
      </a>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
}
