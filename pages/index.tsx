import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { loadPost } from "../src/helpers/loadPost";
import { GetStaticProps } from "next";
import { Home, Props } from "../src/pages/Home";

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { excerpt, publishedAt, slug, tags, title } = await loadPost(path);
      return { excerpt, publishedAt, slug, tags, title };
    })
  );
  return {
    props: {
      posts,
    },
  };
};
