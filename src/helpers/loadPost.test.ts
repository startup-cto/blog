import mockFs from "mock-fs";

import { loadPost } from "./loadPost";
import path from "path";

const fileContent = `---
title: Hello World
tags:
- hello
- world
---

# Hello World
`;

describe("loadPost", () => {
  describe("with a post", () => {
    const fileName = "fileName";

    beforeEach(() => {
      mockFs({
        [`./content/${fileName}.md`]: fileContent,
        node_modules: mockFs.load(
          path.resolve(__dirname, "../../node_modules")
        ),
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it("returns the front matter of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.data).toEqual({
        title: "Hello World",
        tags: ["hello", "world"],
      });
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(fileName);
      expect(post.source).toBeDefined();
    });
  });
});
