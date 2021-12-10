import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { loadPost } from "../src/helpers/loadPost";
import { Head } from "../src/components/Head";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head
        description="Building companies with web technology"
        slug=""
        title="The Startup CTO"
        type="website"
      />

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
