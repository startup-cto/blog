import { Head } from "../../helpers/Head/Head";
import { Header } from "../../blocks/Header/Header";
import {
  PostSummary,
  Props as PostSummaryProps,
} from "../../blocks/PostSummary/PostSummary";
import { Footer } from "../../blocks/Footer/Footer";
import styles from "./Home.module.css";
import { Pagination } from "../../blocks/Pagination/Pagination";

export interface Props {
  currentPage: number;
  pageCount: number;
  posts: PostSummaryProps["post"][];
}

export function Home({ currentPage, pageCount, posts }: Props) {
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
        <nav className={styles.pagination}>
          <Pagination pageCount={pageCount} currentPage={currentPage} />
        </nav>
      </main>
      <Footer />
    </>
  );
}
