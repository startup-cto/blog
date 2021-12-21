import { Post as PostType } from "../../../helpers/loadPost";
import styles from "./BlogPost.module.css";
import "prismjs/themes/prism-tomorrow.css";
import { PostHeader } from "../PostHeader/PostHeader";
import { PostContent } from "../PostContent/PostContent";

interface Props {
  post: Pick<PostType, "publishedAt" | "source" | "tags" | "title">;
}

export function BlogPost({
  post: { publishedAt, source, tags, title },
}: Props) {
  return (
    <main className={styles.container}>
      <PostHeader post={{ title, publishedAt, tags }} />
      <PostContent source={source} />
    </main>
  );
}
