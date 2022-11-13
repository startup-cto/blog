import { loadPostSummaries } from "./loadPostSummaries";

export async function loadPaginatedPostSummaries() {
  return { pageCount: 1, posts: await loadPostSummaries() };
}
