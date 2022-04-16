import { isToPublishPost, ToPublishPost } from "./ToPublishPost";

describe("ToPublishPost", () => {
  it("accepts a ToPublishPost", () => {
    const toPublishPost: ToPublishPost = {
      title: "10 bad TypeScript habits to break this year",
      slug: "10-bad-typescript-habits-to-break-this-year",
      tags: ["TypeScript"],
      excerpt:
        "TypeScript and JavaScript have steadily evolved over the last years, and some of the habits we built over the last decades have become obsolete. Some might never have been meaningful. Here's a list of 10 habits that we all should break.",
      previewImage: "/images/teaser/filename.png",
    };
    expect(isToPublishPost(toPublishPost)).toBe(true);
  });
});
