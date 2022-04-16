import { findUnpublishedPosts } from "./findUnpublishedPosts";
import { PublishedPostMock } from "../../src/data-structure/PublishedPost/PublishedPostMock";
import { mockPostFiles, resetPostFiles } from "../../src/test-helpers";
import { ToPublishPostMock } from "../../src/data-structure/ToPublishPost/ToPublishPostMock";

describe("findUnpublishedPosts", () => {
  describe("with a published and an unpublished post", () => {
    const publishedPost = new PublishedPostMock({ slug: "published" });
    const unpublishedPost = new ToPublishPostMock({ slug: "to-publish" });

    beforeAll(() => {
      mockPostFiles([publishedPost, unpublishedPost]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns the unpublished post", async () => {
      const unpublishedPosts = await findUnpublishedPosts();
      expect(unpublishedPosts[0]).toMatchObject(unpublishedPost);
    });

    it("does not return the published post", async () => {
      const unpublishedPosts = await findUnpublishedPosts();
      expect(unpublishedPosts.length).toBe(1);
    });
  });
});
