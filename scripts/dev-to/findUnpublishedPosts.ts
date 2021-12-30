import { loadPostFileNames } from "../../src/loading-posts/loadPostFileNames";
import { loadPost } from "../../src/loading-posts/loadPost";

export async function findUnpublishedPosts() {
  const fileNames = await loadPostFileNames();
  const posts = await Promise.all(
    fileNames.map((fileName) => loadPost(fileName))
  );
  return posts.map((post) => ({
    content: post.content,
    draft: post.draft,
  }));
}
