import { loadPostSummaries } from "./loadPostSummaries";
import { MockFile } from "./MockFile";
import mockFs from "mock-fs";
import path from "path";

describe("loadPostSummaries", () => {
  const files = [new MockFile()];

  beforeAll(() => {
    mockFs(
      files.reduce(
        (obj, file) => ({
          ...obj,
          [`./content/${file.name}.md`]: file.toString(),
        }),
        {
          node_modules: mockFs.load(
            path.resolve(__dirname, "../../node_modules")
          ),
        }
      )
    );
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("loads the summary of the first post", async () => {
    const posts = (await loadPostSummaries()).props.posts;
    expect(posts).toContainEqual(files[0].metaData);
  });
});
