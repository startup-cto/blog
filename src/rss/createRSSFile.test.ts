import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { readFile } from "fs/promises";
import { createRSSFile } from "./createRSSFile";
import { PublishedPostMock } from "../model/PublishedPostMock";

describe("createRSSFile", () => {
  const post = new PublishedPostMock();
  beforeAll(() => {
    mockPostFiles([post]);
  });

  afterAll(() => {
    resetPostFiles();
  });

  it("creates an RSS file with the post title in it", async () => {
    await createRSSFile();
    const file = await readFile("./public/rss.xml", "utf8");
    expect(file).toContain(post.title);
  });
});
