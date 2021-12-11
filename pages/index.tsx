import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { loadPost, Post } from "../src/helpers/loadPost";
import { Head } from "../src/components/Head";
import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PostSummary } from "../components/PostSummary";

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

      <Header />
      <main>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </main>
      <Footer />
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
