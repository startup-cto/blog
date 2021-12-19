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

  it("creates an RSS file", async () => {
    await createRSSFile();
    const file = await readFile("./public/rss.xml", "utf8");
    expect(typeof file).toBe("string");
  });
});
