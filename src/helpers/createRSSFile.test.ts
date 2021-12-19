import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { MockPostFile } from "../test-helpers/MockPostFile";
import { readFile } from "fs/promises";
import { createRSSFile } from "./createRSSFile";

describe("createRSSFile", () => {
  const post = new MockPostFile();
  beforeAll(() => {
    mockPostFiles([post]);
  });

  afterAll(() => {
    resetPostFiles();
  });

  it("creates an RSS file with the post title in it", async () => {
    await createRSSFile();
    const file = await readFile("./public/rss", "utf8");
    expect(file).toContain(post.metaData.title);
  });
});
