import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default function Post({ source }) {
  return <MDXRemote {...source} />;
}

export async function getStaticPaths() {
  return { paths: ["/test"], fallback: false };
}

export async function getStaticProps() {
  const source = await serialize("# Title");
  return { props: { source } };
}
