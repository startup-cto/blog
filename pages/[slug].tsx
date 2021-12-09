import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import * as fs from "fs";
import matter from "gray-matter";

export default function Post({ source }) {
  return <MDXRemote {...source} />;
}

export async function getStaticPaths() {
  return {
    paths: ["/10-bad-typescript-habits-to-break-this-year"],
    fallback: false,
  };
}

export async function getStaticProps() {
  const file = await fs.promises.readFile(
    "./content/10-bad-typescript-habits-to-break-this-year.md",
    { encoding: "utf-8" }
  );
  const { data, content } = matter(file);
  const source = await serialize(content);
  return { props: { source } };
}
