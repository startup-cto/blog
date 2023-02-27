import NextLink from "next/link";
import { Link } from "../../elements/Link/Link";
import { VisuallyHidden } from "../../helpers/VisuallyHidden/VisuallyHidden";
import { PostHeader } from "../PostHeader/PostHeader";
import { Container } from "../../elements/Container/Container";
import { PublishedPost } from "../../../data-structure/PublishedPost/PublishedPost";

export interface Props {
  post: Pick<
    PublishedPost,
    "excerpt" | "publishedAt" | "slug" | "tags" | "title"
  >;
}

export function PostSummary({
  post: { excerpt, publishedAt, slug, tags, title },
}: Props) {
  return (
    <NextLink href={slug}>
      <Container as="article">
        <PostHeader post={{ publishedAt, tags, title }} />
        <p>{excerpt}</p>
        <Link href={`/${slug}`}>
          Read the article
          <VisuallyHidden> {title}</VisuallyHidden>
        </Link>
      </Container>
    </NextLink>
  );
}
