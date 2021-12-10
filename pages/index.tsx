import Head from "next/head";
import { loadPostFileNames } from "../src/loadPostFileNames";
import { loadPost } from "../src/loadPost";

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
      const { data, source } = await loadPost(path);
      return JSON.parse(
        JSON.stringify({
          path,
          source,
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
