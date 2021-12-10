import { MDXRemote } from "next-mdx-remote";
import { loadPost } from "../src/loadPost";
import { loadPostFileNames } from "../src/loadPostFileNames";

export default function Post({ source }) {
  return <MDXRemote {...source} />;
}

export async function getStaticPaths() {
  const paths = await loadPostFileNames();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { source } = await loadPost(slug);
  return { props: { source } };
}
