import { loadPostFileNames } from "./loadPostFileNames";
import { loadPost } from "./loadPost";
import {
  isToPublishPost,
  ToPublishPost,
} from "../data-structure/ToPublishPost/ToPublishPost";

export async function loadToPublishPosts(): Promise<
  Omit<ToPublishPost, "content">[]
> {
  const fileNames = await loadPostFileNames();
  const posts = await Promise.all(
    fileNames.map(async (name) => {
      const { source, content, ...post } = await loadPost(name);
      return post;
    })
  );
  return posts.filter(isToPublishPost).map((post) => {
    const { excerpt, publishedAt, previewImage, slug, tags, title } = post;
    return {
      excerpt,
      publishedAt,
      ...(previewImage && { previewImage }),
      slug,
      tags: tags ?? [],
      title,
    };
  });
}
