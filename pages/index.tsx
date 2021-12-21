import { GetStaticProps } from "next";
import { Home, Props } from "../src/design/templates/Home/Home";
import { loadPostSummaries } from "../src/helpers/loadPostSummaries";

export default Home;
export const getStaticProps: GetStaticProps<Props> = loadPostSummaries;
