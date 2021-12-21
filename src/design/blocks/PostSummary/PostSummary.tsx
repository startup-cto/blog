import NextLink from "next/link";
import styles from "./PostSummary.module.css";
import { PostSummaryType } from "../../../model/PostSummaryType";
import { Link } from "../../elements/Link/Link";
import { VisuallyHidden } from "../../helpers/VisuallyHidden/VisuallyHidden";
import { PostHeader } from "../PostHeader/PostHeader";

interface Props {
  post: PostSummaryType;
}

export function PostSummary({
  post: { excerpt, publishedAt, slug, tags, title },
}: Props) {
  return (
    <NextLink href={slug}>
      <article className={styles.container}>
        <PostHeader post={{ publishedAt, tags, title }} />
        <p>{excerpt}</p>
        <Link href={slug}>
          Read the article
          <VisuallyHidden> {title}</VisuallyHidden>
        </Link>
      </article>
    </NextLink>
  );
}
