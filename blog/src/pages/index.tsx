import { GetStaticProps } from "next";
import { Home, Props } from "../presentation/templates/Home/Home";
import { loadPostSummaries } from "../loading-posts/loadPostSummaries";

const pageSize = 10;

export default Home;
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await loadPostSummaries();
  return {
    props: {
      posts,
      currentPage: 1,
      maxPage: Math.ceil(posts.length / pageSize),
    },
  };
};
