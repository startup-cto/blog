import { GetStaticProps } from "next";
import { Home, Props } from "../presentation/templates/Home/Home";
import { loadPostSummaries } from "../loading-posts/loadPostSummaries";

export default Home;
export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { posts: await loadPostSummaries() },
});
