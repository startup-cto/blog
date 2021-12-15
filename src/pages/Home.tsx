import { Head } from "../components/Head/Head";
import { Header } from "../components/Header/Header";
import {
  PostSummary,
  PostSummaryType,
} from "../components/PostSummary/PostSummary";
import { Footer } from "../components/Footer/Footer";

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
