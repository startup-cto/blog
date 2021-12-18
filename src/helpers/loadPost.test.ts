import { loadPost } from "./loadPost";
import { MockFile } from "./MockFile";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPost", () => {
  describe("with a post", () => {
    const file = new MockFile();

    beforeAll(() => {
      mockPostFiles([file]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns the title of the post", async () => {
      const post = await loadPost(file.name);
      expect(post.title).toEqual(file.metaData.title);
    });

    it("returns the publishedAt of the post", async () => {
      const post = await loadPost(file.name);
      expect(post.publishedAt).toEqual(file.metaData.publishedAt);
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(file.name);
      expect(post.source).toBeDefined();
    });
  });
});
