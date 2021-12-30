import { findUnpublishedPosts } from "./findUnpublishedPosts";
import { PublishedPostMock } from "../../src/data-structure/PublishedPost/PublishedPostMock";
import { mockPostFiles, resetPostFiles } from "../../src/test-helpers";
import { DraftPostMock } from "../../src/data-structure/DraftPost/DraftPostMock";

describe("findUnpublishedPosts", () => {
  describe("with a published and an unpublished post", () => {
    const publishedPost = new PublishedPostMock();
    const unpublishedPost = new DraftPostMock();

    beforeAll(() => {
      mockPostFiles([publishedPost, unpublishedPost]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns the unpublished post", async () => {
      const unpublishedPosts = await findUnpublishedPosts();
      expect(unpublishedPosts).toContainEqual(unpublishedPost);
    });

    it("does not return the published post", async () => {
      const unpublishedPosts = await findUnpublishedPosts();
      expect(unpublishedPosts.length).toBe(1);
    });
  });
});
