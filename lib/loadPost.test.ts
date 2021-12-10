import mockFs from "mock-fs";

import { loadPost } from "./loadPost";

describe("loadPost", () => {
  describe("with a post", () => {
    const fileName = "fileName";

    beforeEach(() => {
      mockFs({
        [`./content/${fileName}.md`]: `---
title: Hello World
tags:
- hello
- world
---`,
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
  });
});
