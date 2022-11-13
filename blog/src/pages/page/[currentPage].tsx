import { GetStaticProps } from "next";
import { Home, Props } from "../../presentation/templates/Home/Home";
import { loadPostSummaries } from "../../loading-posts/loadPostSummaries";
import { loadPostFileNames } from "../../loading-posts/loadPostFileNames";

export default Home;

const pageSize = 10;

export async function getStaticPaths() {
  const names = await loadPostFileNames();
  const pages = Math.ceil(names.length / pageSize);
  return {
    paths: Array.from({ length: pages }).map(
      (_, index) => `/page/${index + 1}`
    ),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  { currentPage: string }
> = async ({ params }) => {
  const currentPage = Number.parseInt(params?.currentPage ?? "1");
  const posts = await loadPostSummaries();
  const postsOnPage = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return {
    props: {
      posts: postsOnPage,
      currentPage,
      maxPage: Math.ceil(posts.length / pageSize),
    },
  };
};
