import { loadPostSummaries } from "./loadPostSummaries";
import { pageSize } from "./pageSize";

export async function loadPaginatedPostSummaries(currentPage: number) {
  const posts = await loadPostSummaries();
  const postsOnPage = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return {
    pageCount: Math.ceil(posts.length / pageSize),
    posts: postsOnPage,
  };
}
