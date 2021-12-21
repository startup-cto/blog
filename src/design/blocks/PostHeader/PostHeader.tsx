import { Box } from "../../elements/Box/Box";
import { Heading } from "../../elements/Heading/Heading";
import { PostSummaryType } from "../../../model/PostSummaryType";

interface Props {
  post: Pick<PostSummaryType, "publishedAt" | "title" | "tags">;
}

export function PostHeader({ post }: Props) {
  return (
    <>
      {post.publishedAt && (
        <>
          <Box as="time" color="accent" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-ca")}
          </Box>{" "}
        </>
      )}
      {post.tags && (
        <Box as="span" color="accent">
          {post.tags.join(", ")}
        </Box>
      )}
      <Heading variant="h1">{post.title}</Heading>
    </>
  );
}
