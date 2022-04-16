import { loadPost } from "../src/loading-posts/loadPost";
import { loadPostFileNames } from "../src/loading-posts/loadPostFileNames";
import { GetStaticProps } from "next";
import { Post, Props } from "../src/presentation/templates/Post/Post";
import { isPublishedPost } from "../src/data-structure/PublishedPost/PublishedPost";

export default Post;

export async function getStaticPaths() {
  const names = await loadPostFileNames();
  return {
    paths: names.map((name) => `/${name}`),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug ?? "";
  const post = await loadPost(slug);
  if (!isPublishedPost(post)) {
    return { notFound: true };
  }
  const { source, previewImage, excerpt, tags, updatedAt, title, publishedAt } =
    post;
  return {
    props: {
      post: {
        source,
        title,
        excerpt,
        slug,
        ...(previewImage && { previewImage }),
        publishedAt,
        updatedAt,
        tags: tags ?? [],
      },
    },
  };
};
