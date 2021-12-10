import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import * as fs from "fs";
import matter from "gray-matter";

export default function Post({ source }) {
  return <MDXRemote {...source} />;
}

export async function getStaticPaths() {
  const files = await fs.promises.readdir("./content/posts");
  const paths = files
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((path) => `/${path}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const file = await fs.promises.readFile(`./content/posts/${slug}.md`, {
    encoding: "utf-8",
  });
  const { data, content } = matter(file);
  const source = await serialize(content);
  return { props: { source } };
}
