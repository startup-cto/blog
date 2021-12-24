import { loadPostSummaries } from "./loadPostSummaries";
import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { PublishedPostMock } from "../model/PublishedPostMock";
import { DraftPostMock } from "../model/DraftPostMock";

describe("loadPostSummaries", () => {
  describe("with one post", () => {
    const postFiles = [new PublishedPostMock()];

    beforeAll(() => {
      mockPostFiles(postFiles);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summary of the first post", async () => {
      const posts = (await loadPostSummaries()).props.posts;
      expect(posts).toContainEqual(
        expect.objectContaining({ slug: postFiles[0].slug })
      );
    });
  });

  describe("with three posts not in order", () => {
    const lastPublishedAt = new Date("2022-01-01").toISOString();

    beforeAll(() => {
      mockPostFiles([
        new PublishedPostMock({
          publishedAt: new Date("2021-01-01").toISOString(),
          slug: "name1",
        }),
        new PublishedPostMock({
          publishedAt: new Date("2020-01-01").toISOString(),
          slug: "name2",
        }),
        new PublishedPostMock({
          publishedAt: lastPublishedAt,
          slug: "name3",
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
    const postFiles = [new DraftPostMock()];

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
