import mockFs from "mock-fs";

import { loadPost } from "./loadPost";
import path from "path";

const fileContent = `---
slug: test-post
title: Hello World
publishedAt: 2020-01-01
excerpt: Hello World
---

# Hello World
`;

describe("loadPost", () => {
  describe("with a post", () => {
    const fileName = "fileName";

    beforeAll(() => {
      mockFs({
        [`./content/${fileName}.md`]: fileContent,
        node_modules: mockFs.load(
          path.resolve(__dirname, "../../node_modules")
        ),
      });
    });

    afterAll(() => {
      mockFs.restore();
    });

    it("returns the title of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.title).toEqual("Hello World");
    });

    it("returns the publishedAt of the post", async () => {
      const post = await loadPost(fileName);
      expect(post.publishedAt).toEqual(new Date("2020-01-01"));
    });

    it("returns the source for the post", async () => {
      const post = await loadPost(fileName);
      expect(post.source).toBeDefined();
    });
  });
});
