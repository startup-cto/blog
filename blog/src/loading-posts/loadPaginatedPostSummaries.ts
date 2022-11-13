import { loadPostSummaries } from "./loadPostSummaries";

export async function loadPaginatedPostSummaries() {
  return { posts: await loadPostSummaries() };
}
