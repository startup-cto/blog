import { toPostFile } from "../toPostFile/toPostFile";
import { PublishedPostMock } from "../../data-structure/PublishedPost/PublishedPostMock";
import { fromPostFile } from "./fromPostFile";

describe("fromPostFile", () => {
  it("parses a file created by toPostFile", () => {
    const post = new PublishedPostMock();

    expect(fromPostFile(toPostFile(post, post.content))).toEqual({
      content: post.content,
      title: post.title,
      excerpt: post.excerpt + "\n",
      publishedAt: post.publishedAt,
      slug: post.slug,
      tags: post.tags,
    });
  });
});
