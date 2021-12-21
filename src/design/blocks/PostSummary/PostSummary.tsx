import NextLink from "next/link";
import styles from "./PostSummary.module.css";
import { PostSummaryType } from "../../../model/PostSummaryType";
import { Link } from "../../elements/Link/Link";
import { Heading } from "../../elements/Heading/Heading";
import { VisuallyHidden } from "../../helpers/VisuallyHidden/VisuallyHidden";
import { Block } from "../../elements/Block/Block";

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
            <Block as="time" color="accent" dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString("en-ca")}
            </Block>{" "}
          </>
        )}
        {tags && (
          <Block as="span" color="accent">
            {tags.join(", ")}
          </Block>
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
