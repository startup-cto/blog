import { loadPost } from "./loadPost";
import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { PublishedPostMock } from "../data-structure/PublishedPost/PublishedPostMock";

describe("loadPost", () => {
  describe("with a post", () => {
    const postFile = new PublishedPostMock();

    beforeAll(() => {
      mockPostFiles([postFile]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("returns the title of the post", async () => {
      const post = await loadPost(postFile.slug);
      expect(post.title).toEqual(postFile.title);
    });

    it("returns the publishedAt of the post", async () => {
      const post = await loadPost(postFile.slug);
      expect(post.publishedAt).toEqual(postFile.publishedAt);
    });

    it("returns the excerpt of the post", async () => {
      const post = await loadPost(postFile.slug);
      expect(post.excerpt).toEqual(postFile.excerpt);
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(postFile.slug);
      expect(post.source).toBeDefined();
    });
  });
});
