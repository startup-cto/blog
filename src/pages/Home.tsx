import { Head } from "../components/Head";
import { Header } from "../components/Header";
import { PostSummary, PostSummaryType } from "../components/PostSummary";
import { Footer } from "../components/Footer";

export interface Props {
  posts: PostSummaryType[];
}

export function Home({ posts }: Props) {
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
