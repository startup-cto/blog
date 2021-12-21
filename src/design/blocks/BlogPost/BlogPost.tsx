import { Post as PostType } from "../../../helpers/loadPost";
import "prismjs/themes/prism-tomorrow.css";
import { PostHeader } from "../PostHeader/PostHeader";
import { PostContent } from "../PostContent/PostContent";
import { Container } from "../../elements/Container/Container";

interface Props {
  post: Pick<PostType, "publishedAt" | "source" | "tags" | "title">;
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
