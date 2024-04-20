import { isDraftPost } from "./DraftPost";
import { DraftPostMock } from "./DraftPostMock";

describe("DraftPostMock", () => {
  it("is a DraftPost", () => {
    expect(isDraftPost(new DraftPostMock())).toBe(true);
  });

  it("returns a random file name", () => {
    const draftPostMock = new DraftPostMock();

    expect(draftPostMock.fileName).toMatch(/\.md$/);
  });

  describe("#toString", () => {
    it("returns a markdown representation of the post", () => {
      const post = new DraftPostMock(
        {
          title: "title",
          excerpt: "excerpt\n",
          slug: "slug",
          publishedAt: new Date("2021-01-01").toISOString(),
          tags: [],
        },
        "# Hello World"
      );

      expect(post.toString()).toBe(`---
draft: true
excerpt: |
  excerpt
publishedAt: '2021-01-01T00:00:00.000Z'
slug: slug
tags: []
title: title
---
# Hello World`);
    });
  });
});
