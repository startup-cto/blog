import { GetStaticProps } from "next";
import { Home, Props } from "../src/presentation/templates/Home/Home";
import { loadPostSummaries } from "../src/loading-posts/loadPostSummaries";

export default Home;
export const getStaticProps: GetStaticProps<Props> = loadPostSummaries;
