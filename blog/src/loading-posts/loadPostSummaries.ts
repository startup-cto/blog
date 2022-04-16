import { loadPostFileNames } from "./loadPostFileNames";
import { loadPost } from "./loadPost";
import {
  isPublishedPost,
  PublishedPost
} from "../data-structure/PublishedPost/PublishedPost";

export async function loadPostSummaries(): Promise<Omit<PublishedPost, "content">[]> {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { source, content, ...post } = await loadPost(path);
      return post;
    })
  );
  return posts.filter(isPublishedPost).map((post) => {
    const {
      excerpt,
      publishedAt,
      previewImage,
      slug,
      tags,
      title,
      updatedAt
    } = post;
    return {
      excerpt,
      publishedAt,
      ...(previewImage && { previewImage }),
      slug,
      tags: tags ?? [],
      title,
      updatedAt
    };
  }).sort(({ publishedAt: firstDate }, { publishedAt: secondDate }) => {
    if (firstDate === secondDate) {
      return 0;
    }
    return firstDate! > secondDate! ? -1 : 1;
  });
}
