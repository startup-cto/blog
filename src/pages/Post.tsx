import { Post as PostType } from "../helpers/loadPost";
import { Head } from "../components/Head";
import { SmallHeader } from "../components/SmallHeader";
import { BlogPost } from "../components/BlogPost";
import { AuthorInfo } from "../components/AuthorInfo";
import { Footer } from "../components/Footer";

export interface Props {
  post: PostType;
}

export function Post({ post }: Props) {
  return (
    <>
      <Head
        description={post.excerpt}
        imagePath={""}
        publishedAt={post.publishedAt ? new Date(post.publishedAt) : undefined}
        slug={post.slug}
        tags={post.tags}
        title={post.title}
        type="article"
        updatedAt={post.updatedAt ? new Date(post.updatedAt) : undefined}
      />
      <SmallHeader />
      <BlogPost post={post} />
      <AuthorInfo />
      <Footer />
    </>
  );
}
