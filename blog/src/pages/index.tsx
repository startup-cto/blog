import { GetStaticProps } from "next";
import { Home, Props } from "../presentation/templates/Home/Home";
import { loadPaginatedPostSummaries } from "../loading-posts/loadPaginatedPostSummaries";

export default Home;
export const getStaticProps: GetStaticProps<Props> = async () => {
  const { pageCount, posts } = await loadPaginatedPostSummaries(1);
  return {
    props: {
      posts,
      currentPage: 1,
      pageCount,
    },
  };
};
