import mockFs from "mock-fs";

import { loadPost } from "./loadPost";
import path from "path";
import { MockFile } from "./MockFile";

describe("loadPost", () => {
  describe("with a post", () => {
    const fileName = "fileName";
    const file = new MockFile();

    beforeAll(() => {
      mockFs({
        [`./content/${fileName}.md`]: file.toString(),
        node_modules: mockFs.load(
          path.resolve(__dirname, "../../node_modules")
        ),
      });
    });

    afterAll(() => {
      mockFs.restore();
    });

    it("returns the title of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.title).toEqual(file.metaData.title);
    });

    it("returns the publishedAt of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.publishedAt).toEqual(file.metaData.publishedAt);
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(fileName);
      expect(post.source).toBeDefined();
    });
  });
});
