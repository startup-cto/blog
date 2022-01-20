import { isPublishedPost, PublishedPost } from "./PublishedPost";

describe("PublishedPost", () => {
  it("accepts a PublishedPost", () => {
    const publishedPost: PublishedPost = {
      title: "10 bad TypeScript habits to break this year",
      slug: "10-bad-typescript-habits-to-break-this-year",
      publishedAt: "2021-01-21T21:01:02.000Z",
      updatedAt: "2021-02-13T10:40:00.000Z",
      tags: ["TypeScript"],
      excerpt:
        "TypeScript and JavaScript have steadily evolved over the last years, and some of the habits we built over the last decades have become obsolete. Some might never have been meaningful. Here's a list of 10 habits that we all should break.",
      previewImage: "/images/teaser/filename.png",
    };
    expect(isPublishedPost(publishedPost)).toBe(true);
  });

  it("rejects a full post with draft true", () => {
    const draftPost = {
      draft: true,
      title: "10 bad TypeScript habits to break this year",
      slug: "10-bad-typescript-habits-to-break-this-year",
      publishedAt: "2021-01-21T21:01:02.000Z",
      updatedAt: "2021-02-13T10:40:00.000Z",
      tags: ["TypeScript"],
      excerpt:
        "TypeScript and JavaScript have steadily evolved over the last years, and some of the habits we built over the last decades have become obsolete. Some might never have been meaningful. Here's a list of 10 habits that we all should break.",
      previewImage: "/images/teaser/filename.png",
    };
    expect(isPublishedPost(draftPost)).toBe(false);
  });
});
