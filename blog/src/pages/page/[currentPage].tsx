import { GetStaticProps } from "next";
import { Home, Props } from "../../presentation/templates/Home/Home";
import { loadPaginatedPostSummaries } from "../../loading-posts/loadPaginatedPostSummaries";
import { loadPageCount } from "../../loading-posts/loadPageCount";

export default Home;

export async function getStaticPaths() {
  const pages = await loadPageCount();
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

  if (currentPage === 1) {
    return { redirect: { destination: "/", permanent: true } };
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
