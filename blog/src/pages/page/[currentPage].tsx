import { GetStaticProps } from "next";
import { Home, Props } from "../../presentation/templates/Home/Home";
import { loadPostFileNames } from "../../loading-posts/loadPostFileNames";
import { loadPaginatedPostSummaries } from "../../loading-posts/loadPaginatedPostSummaries";

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
  const currentPage = Number.parseInt(params?.currentPage ?? "");
  if (!Number.isInteger(currentPage)) {
    return { notFound: true };
  }
  const { posts, pageCount } = await loadPaginatedPostSummaries(currentPage);
  return {
    props: {
      posts: posts,
      currentPage,
      pageCount,
    },
  };
};