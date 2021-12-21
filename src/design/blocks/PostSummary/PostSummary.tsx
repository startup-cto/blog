import NextLink from "next/link";
import styles from "./PostSummary.module.css";
import { PostSummaryType } from "../../../model/PostSummaryType";
import { Link } from "../../elements/Link/Link";
import { Heading } from "../../elements/Heading/Heading";
import { VisuallyHidden } from "../../helpers/VisuallyHidden/VisuallyHidden";
import { Box } from "../../elements/Box/Box";

interface Props {
  post: PostSummaryType;
}

export function PostSummary({
  post: { excerpt, publishedAt, slug, tags, title },
}: Props) {
  return (
    <NextLink href={slug}>
      <article className={styles.container}>
        {publishedAt && (
          <>
            <Box as="time" color="accent" dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString("en-ca")}
            </Box>{" "}
          </>
        )}
        {tags && (
          <Box as="span" color="accent">
            {tags.join(", ")}
          </Box>
        )}
        <Heading variant="h1">{title}</Heading>
        <p>{excerpt}</p>
        <Link href={slug}>
          Read the article
          <VisuallyHidden> {title}</VisuallyHidden>
        </Link>
      </article>
    </NextLink>
  );
}
