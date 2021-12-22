import { loadPost } from "./loadPost";
import { MockPost } from "../test-helpers/MockPost";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPost", () => {
  describe("with a post", () => {
    const postFile = new MockPost();

    beforeAll(() => {
      mockPostFiles([postFile]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns the title of the post", async () => {
      const post = await loadPost(postFile.name);
      expect(post.title).toEqual(postFile.metaData.title);
    });

    it("returns the publishedAt of the post", async () => {
      const post = await loadPost(postFile.name);
      expect(post.publishedAt).toEqual(postFile.metaData.publishedAt);
    });

    it("returns the excerpt of the post", async () => {
      const post = await loadPost(postFile.name);
      expect(post.excerpt).toEqual(postFile.metaData.excerpt);
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(postFile.name);
      expect(post.source).toBeDefined();
    });
  });
});
