import { loadPostSummaries } from "./loadPostSummaries";
import { MockPostFile } from "../test-helpers/MockPostFile";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPostSummaries", () => {
  describe("with one post", () => {
    const postFiles: MockPostFile[] = [new MockPostFile()];

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
    const firstPublishedAt = new Date("2020-01-01").toISOString();

    beforeAll(() => {
      mockPostFiles([
        new MockPostFile({
          metaData: { publishedAt: new Date("2021-01-01").toISOString() },
          name: "name1",
        }),
        new MockPostFile({
          metaData: { publishedAt: firstPublishedAt },
          name: "name2",
        }),
        new MockPostFile({
          metaData: { publishedAt: new Date("2022-01-01").toISOString() },
          name: "name3",
        }),
      ]);
    });

    afterAll(() => {
      resetPostFiles();
    });

    it("loads the summaries ordered by publishedAt", async () => {
      const posts = (await loadPostSummaries()).props.posts;
      expect(posts[0].publishedAt).toBe(firstPublishedAt);
    });
  });
});
