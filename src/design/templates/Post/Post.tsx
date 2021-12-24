import { Head } from "../../helpers/Head/Head";
import { SmallHeader } from "../../blocks/SmallHeader/SmallHeader";
import { BlogPost } from "../../blocks/BlogPost/BlogPost";
import { AuthorInfo } from "../../blocks/AuthorInfo/AuthorInfo";
import { Footer } from "../../blocks/Footer/Footer";
import styles from "./Post.module.css";
import { PublishedPost } from "../../../model/PublishedPost";
import { PostSource } from "../../../model/PostSource";

export interface Props {
  post: PublishedPost & PostSource;
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
