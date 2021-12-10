import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {posts.map((post) => (
          <p key={post.data.slug}>
            <a href={post.data.slug}>{post.data.title}</a>
          </p>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const files = await fs.promises.readdir("./content");
  const paths = files
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((path) => `/${path}`);
  const posts = await Promise.all(
    paths.map(async (path) => {
      const file = await fs.promises.readFile(`./content/${path}.md`, "utf8");
      const { data, content } = matter(file);
      return JSON.parse(
        JSON.stringify({
          path,
          source: serialize(content),
          data,
        })
      );
    })
  );
  return {
    props: {
      posts,
    },
  };
}
