import { loadPost } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { GetStaticProps } from "next";
import { Post, Props } from "../src/design/templates/Post/Post";
import { isPublishedPost } from "../src/model/PublishedPost";

export default Post;

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
