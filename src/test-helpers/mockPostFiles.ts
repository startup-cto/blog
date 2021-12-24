import mockFs from "mock-fs";
import path from "path";
import { Post } from "../model/Post";

export function mockPostFiles(posts: Post[]) {
  mockFs(
    posts.reduce(
      (obj, file) => ({
        ...obj,
        [`./content/${file.slug}.md`]: file.toString(),
        ...(file.draft
          ? {}
          : { [`./public/images/teaser/${file.slug}.png`]: "" }),
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
