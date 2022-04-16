import { mockPostFiles, resetPostFiles } from "../../src/test-helpers";
import { promises } from "fs";
import { createRSSFile } from "./createRSSFile";
import { PublishedPostMock } from "../../src/data-structure/PublishedPost/PublishedPostMock";

describe("createRSSFile", () => {
  const post = new PublishedPostMock();
  beforeAll(() => {
    mockPostFiles([post]);
  });

  afterAll(() => {
    resetPostFiles();
  });

  it("creates an RSS file with the post title in it", async () => {
    promises.writeFile = jest.fn();
    await createRSSFile();
    const firstCall = (promises.writeFile as any).mock.calls[0];
    expect(firstCall[0]).toBe("public/rss.xml");
    expect(firstCall[1]).toContain(post.title);
  });
});
