import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { loadPost, Post } from "../src/helpers/loadPost";
import { Head } from "../src/components/Head";
import Link from "next/link";
import { GetStaticProps } from "next";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
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
          <article key={post.slug}>
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            )}
            {post.tags && <span>{post.tags.join(", ")}</span>}
            <a href={post.slug}>{post.title}</a>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </main>
      <footer>
        <div>
          All content copyright The Startup CTO © {new Date().getFullYear()} •
          All rights reserved.
        </div>
        <ul>
          <li>
            <Link href="/imprint">Imprint</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy policy</Link>
          </li>
        </ul>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { source, ...data } = await loadPost(path);
      return {
        path,
        source,
        ...data,
      };
    })
  );
  return {
    props: {
      posts,
    },
  };
};
