import { loadPostFileNames } from "./loadPostFileNames";
import { loadPost } from "./loadPost";

export const loadPostSummaries = async () => {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const {
        draft = false,
        excerpt,
        publishedAt,
        previewImage,
        slug,
        tags,
        title,
      } = await loadPost(path);
      return {
        draft,
        excerpt,
        ...(publishedAt && { publishedAt }),
        previewImage,
        slug,
        ...(tags && { tags }),
        title,
      };
    })
  );
  return {
    props: {
      posts: posts
        .filter((post) => !post.draft)
        .sort(({ publishedAt: firstDate }, { publishedAt: secondDate }) => {
          if (firstDate === secondDate) {
            return 0;
          }
          return firstDate! > secondDate! ? -1 : 1;
        }),
    },
  };
};
