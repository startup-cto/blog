import { mockPostFiles, resetPostFiles } from "../test-helpers";
import { MockPost } from "../test-helpers/MockPost";
import { readFile } from "fs/promises";
import { createRSSFile } from "./createRSSFile";

describe("createRSSFile", () => {
  const post = new MockPost();
  beforeAll(() => {
    mockPostFiles([post]);
  });

  afterAll(() => {
    resetPostFiles();
  });

  it("creates an RSS file with the post title in it", async () => {
    await createRSSFile();
    const file = await readFile("./public/rss.xml", "utf8");
    expect(file).toContain(post.metaData.title);
  });
});
