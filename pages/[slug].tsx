import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { loadPost } from "../lib/loadPost";
import { loadPostFileNames } from "../lib/loadPostFileNames";

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
  const { content } = await loadPost(slug);
  const source = await serialize(content);
  return { props: { source } };
}
