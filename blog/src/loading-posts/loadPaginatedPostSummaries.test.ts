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
      const { posts } = await loadPaginatedPostSummaries(1);

      expect(posts).toContainEqual(
        expect.objectContaining({ slug: postFiles[0].slug })
      );
    });

    it("returns pageCount 1", async () => {
      const { pageCount } = await loadPaginatedPostSummaries(1);

      expect(pageCount).toBe(1);
    });
  });

  describe("with 11 posts", () => {
    const postFiles = Array.from({ length: 11 }).map(
      () => new PublishedPostMock()
    );

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("does not load the summary of the eleventh post", async () => {
      const { posts } = await loadPaginatedPostSummaries(1);

      expect(posts).not.toContainEqual(
        expect.objectContaining({ slug: postFiles[10].slug })
      );
    });

    it("returns pageCount 2", async () => {
      const { pageCount } = await loadPaginatedPostSummaries(1);

      expect(pageCount).toBe(2);
    });
  });
});
