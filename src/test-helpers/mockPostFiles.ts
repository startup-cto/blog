import { MockFile } from "../helpers/MockFile";
import mockFs from "mock-fs";
import path from "path";

export function mockPostFiles(posts: MockFile[]) {
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
