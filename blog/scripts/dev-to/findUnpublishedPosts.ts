import { loadPostFileNames } from "../../src/loading-posts/loadPostFileNames";
import { loadPost } from "../../src/loading-posts/loadPost";
import { isToPublishPost } from "../../src/data-structure/ToPublishPost/ToPublishPost";

export async function findUnpublishedPosts() {
  const fileNames = await loadPostFileNames();
  const posts = await Promise.all(
    fileNames.map((fileName) => loadPost(fileName))
  );
  return posts.filter(isToPublishPost);
}
