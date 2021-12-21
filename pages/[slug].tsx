import { loadPost } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { GetStaticProps } from "next";
import { Post, Props } from "../src/design/templates/Post/Post";

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
  const { source, ...data } = await loadPost(slug);
  return {
    props: {
      post: {
        source,
        title: data.title,
        excerpt: data.excerpt,
        slug,
        ...(data.previewImage && { previewImage: data.previewImage }),
        ...(data.publishedAt && { publishedAt: data.publishedAt }),
        ...(data.updatedAt && { updatedAt: data.updatedAt }),
        tags: data.tags ?? [],
      },
    },
  };
};
