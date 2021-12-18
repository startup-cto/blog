import { loadPostSummaries } from "./loadPostSummaries";
import { MockFile } from "./MockFile";
import { mockPostFiles, resetPostFiles } from "../test-helpers";

describe("loadPostSummaries", () => {
  const files = [new MockFile()];

  beforeAll(() => {
    mockPostFiles(files);
  });

  afterAll(() => {
    resetPostFiles();
  });

  it("loads the summary of the first post", async () => {
    const posts = (await loadPostSummaries()).props.posts;
    expect(posts).toContainEqual(files[0].metaData);
  });
});
