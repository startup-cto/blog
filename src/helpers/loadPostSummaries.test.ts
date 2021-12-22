import { loadPostSummaries } from "./loadPostSummaries";
import { MockPost } from "../test-helpers/MockPost";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPostSummaries", () => {
  describe("with one post", () => {
    const postFiles: MockPost[] = [new MockPost()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summary of the first post", async () => {
      const posts = (await loadPostSummaries()).props.posts;
      expect(posts).toContainEqual(postFiles[0].metaData);
    });
  });

  describe("with three posts not in order", () => {
    const lastPublishedAt = new Date("2022-01-01").toISOString();

    beforeAll(() => {
      mockPostFiles([
        new MockPost({
          metaData: { publishedAt: new Date("2021-01-01").toISOString() },
          name: "name1",
        }),
        new MockPost({
          metaData: { publishedAt: new Date("2020-01-01").toISOString() },
          name: "name2",
        }),
        new MockPost({
          metaData: { publishedAt: lastPublishedAt },
          name: "name3",
        }),
      ]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summaries ordered by publishedAt", async () => {
      const posts = (await loadPostSummaries()).props.posts;
      expect(posts[0].publishedAt).toBe(lastPublishedAt);
    });
  });

  describe("with a draft post", () => {
    const postFiles: MockPost[] = [new MockPost({ metaData: { draft: true } })];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads no posts", async () => {
      const posts = (await loadPostSummaries()).props.posts;
      expect(posts).toEqual([]);
    });
  });
});
