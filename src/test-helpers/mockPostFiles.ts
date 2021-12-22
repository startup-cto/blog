import type { MockPost } from "./MockPost";
import mockFs from "mock-fs";
import path from "path";

export function mockPostFiles(posts: MockPost[]) {
  mockFs(
    posts.reduce(
      (obj, file) => ({
        ...obj,
        [`./content/${file.name}.md`]: file.toString(),
      }),
      {
        "./public/images/teaser": {},
        node_modules: mockFs.load(
          path.resolve(__dirname, "../../node_modules")
        ),
      }
    )
  );
}
