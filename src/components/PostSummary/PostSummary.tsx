import Link from "next/link";
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
    <Link href={slug}>
      <article className={styles.container}>
        {publishedAt && (
          <time className={styles.publishDate} dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("en-ca")}
          </time>
        )}
        {tags && <span className={styles.tags}>{tags.join(", ")}</span>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.excerpt}>{excerpt}</p>
        <a className={styles.link}>Read more</a>
      </article>
    </Link>
  );
}
