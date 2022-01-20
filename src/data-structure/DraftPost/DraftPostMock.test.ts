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
});
