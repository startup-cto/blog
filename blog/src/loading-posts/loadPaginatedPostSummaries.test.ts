import { PublishedPostMock } from "../data-structure/PublishedPost/PublishedPostMock";
import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { loadPaginatedPostSummaries } from "./loadPaginatedPostSummaries";

describe("loadPaginatedPostSummaries", () => {
  describe("with one post", () => {
    const postFiles = [new PublishedPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summary of the first post", async () => {
      const { posts } = await loadPaginatedPostSummaries();

      expect(posts).toContainEqual(
        expect.objectContaining({ slug: postFiles[0].slug })
      );
    });
  });
});
