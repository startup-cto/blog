import { GetStaticProps } from "next";
import { Home, Props } from "../src/pages/Home";
import { loadPostSummaries } from "../src/helpers/loadPostSummaries";

export default Home;
export const getStaticProps: GetStaticProps<Props> = loadPostSummaries;
