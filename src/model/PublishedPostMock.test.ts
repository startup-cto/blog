import { isPublishedPost } from "./PublishedPost";
import { PublishedPostMock } from "./PublishedPostMock";

describe("PublishedPostMock", () => {
  it("is a PublishedPost", () => {
    expect(isPublishedPost(new PublishedPostMock())).toBe(true);
  });

  describe("#toString", () => {
    it("returns a markdown representation of the post", () => {
      const post = new PublishedPostMock({
        content: "# Hello World",
        title: "title",
        excerpt: "excerpt\n",
        slug: "slug",
        publishedAt: new Date("2021-01-01").toISOString(),
        updatedAt: new Date("2021-01-01").toISOString(),
        tags: [],
      });
      expect(post.toString()).toBe(`---
slug: slug
tags: []
title: title
publishedAt: '2021-01-01T00:00:00.000Z'
updatedAt: '2021-01-01T00:00:00.000Z'
---
excerpt
---

# Hello World
`);
    });
  });
});
