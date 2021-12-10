import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { loadPostFileNames } from "../lib/loadPostFileNames";
import { loadPost } from "../lib/loadPost";

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
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { data, content } = await loadPost(path);
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
