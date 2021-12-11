import { Head } from "../src/components/Head";
import { loadPost, Post as PostType } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { GetStaticProps } from "next";
import { Footer } from "../src/components/Footer";
import { SmallHeader } from "../src/components/SmallHeader";
import { AuthorInfo } from "../src/components/AuthorInfo";
import { BlogPost } from "../src/components/BlogPost";

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
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

export async function getStaticPaths() {
  const paths = await loadPostFileNames();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug ?? "";
  const { source, ...data } = await loadPost(slug);
  return {
    props: {
      post: {
        source,
        title: data.title,
        excerpt: data.excerpt ?? undefined,
        slug,
        publishedAt: data.publishedAt ?? undefined,
        updatedAt: data.updatedAt ?? undefined,
        tags: data.tags ?? [],
      },
    },
  };
};
