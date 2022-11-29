import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { DraftPostMock } from "../data-structure/DraftPost/DraftPostMock";
import { ToPublishPostMock } from "../data-structure/ToPublishPost/ToPublishPostMock";
import { loadToPublishPosts } from "./loadToPublishPosts";

describe("loadToPublishPosts", () => {
  describe("with one post", () => {
    const postFiles = [new ToPublishPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summary of the first post", async () => {
      const posts = await loadToPublishPosts();

      expect(posts).toContainEqual(
        expect.objectContaining({ slug: postFiles[0].slug })
      );
    });
  });

  describe("with a draft post", () => {
    const postFiles = [new DraftPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads no posts", async () => {
      const posts = await loadToPublishPosts();

      expect(posts).toEqual([]);
    });
  });
});
