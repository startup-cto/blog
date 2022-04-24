import { DraftPost, isDraftPost } from "./DraftPost";

describe("DraftPost", () => {
  it("accepts a minimal DraftPost", () => {
    const draftPost: DraftPost = {
      draft: true,
    };

    expect(isDraftPost(draftPost)).toBe(true);
  });

  it("accepts a full DraftPost", () => {
    const draftPost: DraftPost = {
      draft: true,
      title: "10 bad TypeScript habits to break this year",
      slug: "10-bad-typescript-habits-to-break-this-year",
      publishedAt: "2021-01-21T21:01:02.000Z",
      previewImage: "/images/teaser/filename.png",
      tags: ["TypeScript"],
      excerpt:
        "TypeScript and JavaScript have steadily evolved over the last years, and some of the habits we built over the last decades have become obsolete. Some might never have been meaningful. Here's a list of 10 habits that we all should break.",
    };

    expect(isDraftPost(draftPost)).toBe(true);
  });
});
