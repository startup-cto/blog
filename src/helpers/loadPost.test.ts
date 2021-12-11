import mockFs from "mock-fs";

import { loadPost } from "./loadPost";
import path from "path";

const fileContent = `---
slug: test-post
title: Hello World
excerpt: Hello World
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

    it("returns the title of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.title).toEqual("Hello World");
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(fileName);
      expect(post.source).toBeDefined();
    });
  });
});
