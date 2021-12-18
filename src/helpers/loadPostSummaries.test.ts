import { loadPostSummaries } from "./loadPostSummaries";
import { MockPostFile } from "./MockPostFile";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPostSummaries", () => {
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
