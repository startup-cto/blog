import { ToPublishPostMock } from "./ToPublishPostMock";
import { isToPublishPost } from "./ToPublishPost";

describe("ToPublishPostMock", () => {
  it("is a ToPublishPost", () => {
    expect(isToPublishPost(new ToPublishPostMock())).toBe(true);
  });

  describe("#toString", () => {
    it("returns a markdown representation of the post", () => {
      const post = new ToPublishPostMock(
        {
          title: "title",
          excerpt: "excerpt\n",
          slug: "slug",
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
---
# Hello World`);
    });
  });
});
