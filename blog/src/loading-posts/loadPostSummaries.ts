import { loadPostFileNames } from "./loadPostFileNames";
import { loadPost } from "./loadPost";
import {
  isPublishedPost,
  PublishedPost,
} from "../data-structure/PublishedPost/PublishedPost";

export async function loadPostSummaries(): Promise<
  Omit<PublishedPost, "content">[]
> {
  const fileNames = await loadPostFileNames();
  const posts = await Promise.all(
    fileNames.map(async (name) => {
      const { source, content, ...post } = await loadPost(name);
      return post;
    })
  );
  return posts
    .filter(isPublishedPost)
    .map((post) => {
      const { excerpt, publishedAt, previewImage, slug, tags, title } = post;
      return {
        excerpt,
        publishedAt,
        ...(previewImage && { previewImage }),
        slug,
        tags: tags ?? [],
        title,
      };
    })
    .sort(({ publishedAt: firstDate }, { publishedAt: secondDate }) => {
      if (firstDate === secondDate) {
        return 0;
      }
      return firstDate! > secondDate! ? -1 : 1;
    });
}
