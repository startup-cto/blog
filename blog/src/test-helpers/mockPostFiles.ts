import { promises } from "fs";
import { join } from "path";

import { Post } from "../data-structure/Post";

export function mockPostFiles(posts: Post[]) {
  jest.mock("fs");

  const dirs = normalizePathKeys({
    content: posts.map((post) => `${post.slug}.md`),
    "public/images/teaser": posts.map((post) => `${post.slug}.png`),
  });

  promises.readdir = ((path: string) =>
    dirs[join(path)]
      ? Promise.resolve(dirs[join(path)])
      : Promise.reject(
          new Error(`No directory found at ${join(path)}`)
        )) as any;

  const files = normalizePathKeys(
    posts.reduce(
      (obj, file) => ({
        ...obj,
        [`content/${file.slug}.md`]: file.toString(),
        ...(!file.draft && { [`public/images/teaser/${file.slug}.png`]: "" }),
      }),
      {} as { [key: string]: string }
    )
  );

  promises.readFile = ((path: string) =>
    files[join(path)]
      ? Promise.resolve(files[join(path)])
      : Promise.reject(new Error(`File ${join(path)} does not exist`))) as any;
}

function normalizePathKeys<Value>(obj: { [key: string]: Value }): {
  [key: string]: Value;
} {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [join(key), value])
  );
}
