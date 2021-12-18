import { loadPostFileNames } from "./loadPostFileNames";
import { loadPost } from "./loadPost";

export const loadPostSummaries = async () => {
  const paths = await loadPostFileNames();
  const posts = await Promise.all(
    paths.map(async (path) => {
      const { excerpt, publishedAt, slug, tags, title } = await loadPost(path);
      return {
        excerpt,
        ...(publishedAt && { publishedAt }),
        slug,
        ...(tags && { tags }),
        title,
      };
    })
  );
  return {
    props: {
      posts: posts.sort(
        ({ publishedAt: firstDate }, { publishedAt: secondDate }) => {
          if (firstDate === secondDate) {
            return 0;
          }
          return firstDate! < secondDate! ? -1 : 1;
        }
      ),
    },
  };
};
