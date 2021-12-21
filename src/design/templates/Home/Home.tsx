import { Head } from "../../helpers/Head/Head";
import { Header } from "../../blocks/Header/Header";
import { PostSummary } from "../../blocks/PostSummary/PostSummary";
import { Footer } from "../../blocks/Footer/Footer";
import styles from "./Home.module.css";
import { PostSummaryType } from "../../../model/PostSummaryType";

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
      <main className={styles.container}>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </main>
      <Footer />
    </>
  );
}
