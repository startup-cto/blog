import { loadPostSummaries } from "./loadPostSummaries";

export async function loadPaginatedPostSummaries(currentPage: number) {
  return { pageCount: 1, posts: await loadPostSummaries() };
}
