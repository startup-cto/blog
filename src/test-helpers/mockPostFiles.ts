import type { MockPostFile } from "./MockPostFile";
import mockFs from "mock-fs";
import path from "path";

export function mockPostFiles(posts: MockPostFile[]) {
  mockFs(
    posts.reduce(
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
}
