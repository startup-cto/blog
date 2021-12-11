import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { loadPost } from "../src/helpers/loadPost";
import { Head } from "../src/components/Head";

export default function Home({ posts }) {
  return (
    <>
      <Head
        description="Building companies with web technology"
        slug=""
        title="The Startup CTO"
        type="website"
      />

      <header>
        <h1>The Startup CTO</h1>
        <h2>Building companies with web technology</h2>
        <a href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
          Follow on Twitter
        </a>
      </header>
      <main>
        {posts.map((post) => (
          <p key={post.data.slug}>
            <a href={post.data.slug}>{post.data.title}</a>
          </p>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { source, ...data } = await loadPost(path);
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
