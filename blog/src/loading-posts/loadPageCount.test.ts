import { PublishedPostMock } from "../data-structure/PublishedPost/PublishedPostMock";
import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { loadPageCount } from "./loadPageCount";

describe("loadPageCount", () => {
  describe("with one post", () => {
    const postFiles = [new PublishedPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns 1", async () => {
      const pageCount = await loadPageCount();

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

    it("returns 2", async () => {
      const pageCount = await loadPageCount();

      expect(pageCount).toBe(2);
    });
  });
});
