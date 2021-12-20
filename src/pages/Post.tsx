import { Post as PostType } from "../helpers/loadPost";
import { Head } from "../components/Head/Head";
import { SmallHeader } from "../components/SmallHeader/SmallHeader";
import { BlogPost } from "../components/BlogPost/BlogPost";
import { AuthorInfo } from "../components/AuthorInfo/AuthorInfo";
import { Footer } from "../components/Footer/Footer";
import styles from "./Post.module.css";

export interface Props {
  post: PostType;
}

export function Post({ post }: Props) {
  return (
    <>
      <Head
        description={post.excerpt}
        imagePath={post.previewImage}
        publishedAt={post.publishedAt ? new Date(post.publishedAt) : undefined}
        slug={post.slug}
        tags={post.tags}
        title={post.title}
        type="article"
        updatedAt={post.updatedAt ? new Date(post.updatedAt) : undefined}
      />
      <SmallHeader />
      <div className={styles.container}>
        <BlogPost post={post} />
        <AuthorInfo />
      </div>
      <Footer />
    </>
  );
}
