import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { PublishedPostMock } from "../data-structure/PublishedPost/PublishedPostMock";
import { loadPostFileNames } from "./loadPostFileNames";

describe("loadPostFileNames", () => {
  describe("with one post", () => {
    const postFiles = [new PublishedPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads file name of the post", async () => {
      const posts = await loadPostFileNames();
      expect(posts).toContainEqual(postFiles[0].slug);
    });
  });
});
