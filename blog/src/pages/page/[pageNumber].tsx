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
  { pageNumber: string }
> = async ({ params }) => {
  const pageNumber = Number.parseInt(params?.pageNumber ?? "1");
  const posts = await loadPostSummaries();
  const postsOnPage = posts.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
  return {
    props: {
      posts: postsOnPage,
      currentPage: pageNumber,
      maxPage: Math.ceil(posts.length / pageSize),
    },
  };
};
