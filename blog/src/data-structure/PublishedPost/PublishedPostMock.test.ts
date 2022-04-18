import { isPublishedPost } from "./PublishedPost";
import { PublishedPostMock } from "./PublishedPostMock";

describe("PublishedPostMock", () => {
  it("is a PublishedPost", () => {
    expect(isPublishedPost(new PublishedPostMock())).toBe(true);
  });

  it("returns a random file name", () => {
    const post = new PublishedPostMock();

    expect(post.fileName).toMatch(/\.md$/);
  });

  describe("#toString", () => {
    it("returns a markdown representation of the post", () => {
      const post = new PublishedPostMock(
        {
          title: "title",
          excerpt: "excerpt\n",
          slug: "slug",
          publishedAt: new Date("2021-01-01").toISOString(),
          updatedAt: new Date("2021-01-01").toISOString(),
          tags: [],
        },
        "# Hello World"
      );

      expect(post.toString()).toBe(`---
excerpt: |
  excerpt
slug: slug
tags: []
title: title
publishedAt: '2021-01-01T00:00:00.000Z'
updatedAt: '2021-01-01T00:00:00.000Z'
---
# Hello World`);
    });
  });
});
