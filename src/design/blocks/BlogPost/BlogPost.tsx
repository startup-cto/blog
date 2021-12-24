import "prismjs/themes/prism-tomorrow.css";
import { PostHeader } from "../PostHeader/PostHeader";
import { PostContent } from "../PostContent/PostContent";
import { Container } from "../../elements/Container/Container";
import { PublishedPost } from "../../../model/PublishedPost";
import { PostSource } from "../../../model/PostSource";

interface Props {
  post: PublishedPost & PostSource;
}

export function BlogPost({
  post: { publishedAt, source, tags, title },
}: Props) {
  return (
    <Container as="main">
      <PostHeader post={{ title, publishedAt, tags }} />
      <PostContent source={source} />
    </Container>
  );
}
